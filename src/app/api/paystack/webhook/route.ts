import { NextResponse } from 'next/server';
import { isValidWebhookSignature } from '../../../../lib/paystack';
import { prisma } from '../../../../lib/prisma';
import { sendTicketEmail } from '../../../../lib/email';

interface WebhookCartLine {
  id: string;
  quantity: number;
}

// Paystack signs the RAW body, so read it as text before parsing.
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-paystack-signature');

  if (!isValidWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'charge.success') {
    const { reference, amount, customer, metadata, paid_at } = event.data;
    const kind: string = metadata?.kind ?? 'PRODUCT';

    try {
      const existing = await prisma.order.findUnique({ where: { reference } });

      if (existing) {
        // Idempotency: only flip status on retry, never re-create items.
        await prisma.order.update({
          where: { reference },
          data: { status: 'PAID', paidAt: paid_at ? new Date(paid_at) : new Date() },
        });
      } else if (kind === 'TICKET') {
        // ---------------------------------------------------------------
        // Ticket purchase flow
        // ---------------------------------------------------------------
        const tierId: string = metadata?.tierId;
        const eventId: string = metadata?.eventId;
        const qty: number = Number(metadata?.quantity) || 1;
        const unitPrice: number = Number(metadata?.unitPrice) || 0;
        const tierName: string = metadata?.tierName ?? 'Ticket';

        const tier = await prisma.ticketTier.findUnique({ where: { id: tierId } });

        await prisma.$transaction(async (tx) => {
          const order = await tx.order.create({
            data: {
              reference,
              status: 'PAID',
              customerEmail: customer?.email ?? 'unknown@animewonderous.com',
              subtotal: unitPrice * qty,
              shipping: 0,
              total: amount / 100,
              paidAt: paid_at ? new Date(paid_at) : new Date(),
              items: {
                create: {
                  kind: 'TICKET',
                  name: tierName,
                  unitPrice,
                  quantity: qty,
                  eventId: tier?.eventId ?? eventId,
                  ticketTierId: tierId,
                },
              },
            },
            include: { items: true },
          });

          // Issue one Ticket record per unit purchased.
          const orderItem = order.items[0];
          const ticketCreates = Array.from({ length: qty }, () =>
            tx.ticket.create({
              data: {
                orderItemId: orderItem.id,
                code: `TKT-${reference}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
                status: 'VALID',
              },
            })
          );
          const tickets = await Promise.all(ticketCreates);

          // Send email in the background
          if (customer?.email) {
            sendTicketEmail({
              to: customer.email,
              tickets: tickets.map((t) => ({ code: t.code, name: tierName })),
              eventName: metadata?.eventName ?? 'Animewonderous Event',
            }).catch((err) => console.error('Failed to send email inside webhook', err));
          }
        });
      } else {
        // ---------------------------------------------------------------
        // Product purchase flow (existing logic)
        // ---------------------------------------------------------------
        const lines: WebhookCartLine[] = Array.isArray(metadata?.items) ? metadata.items : [];
        const products = await prisma.product.findMany({
          where: { id: { in: lines.map((l) => l.id) } },
        });
        const productsById = new Map(products.map((p) => [p.id, p]));

        // One transaction: create order + items, decrement stock.
        await prisma.$transaction([
          prisma.order.create({
            data: {
              reference,
              status: 'PAID',
              customerEmail: customer?.email ?? 'unknown@animewonderous.com',
              subtotal: Number(metadata?.subtotal) || 0,
              shipping: Number(metadata?.shipping) || 0,
              total: amount / 100,
              paidAt: paid_at ? new Date(paid_at) : new Date(),
              items: {
                create: lines.map((line) => {
                  const product = productsById.get(line.id);
                  return {
                    kind: 'PRODUCT',
                    name: product?.name ?? line.id,
                    unitPrice: product?.price ?? 0,
                    quantity: line.quantity,
                    productId: product?.id,
                  };
                }),
              },
            },
          }),
          ...lines
            .filter((line) => productsById.has(line.id))
            .map((line) =>
              prisma.product.update({
                where: { id: line.id },
                data: { stock: { decrement: line.quantity } },
              })
            ),
        ]);
      }
    } catch (err) {
      // Payment already succeeded on Paystack's side — don't fail the webhook
      // response over a DB hiccup, just log it for follow-up.
      console.error('Failed to persist order:', err);
    }
  }

  // Always answer 200 quickly so Paystack doesn't retry.
  return NextResponse.json({ received: true });
}
