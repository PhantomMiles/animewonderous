import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
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

  if (!process.env.PAYSTACK_SECRET_KEY) {
    console.error('Paystack webhook unavailable: PAYSTACK_SECRET_KEY is not configured.');
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
  }

  let validSignature = false;
  try {
    validSignature = isValidWebhookSignature(rawBody, signature);
  } catch {
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
  }
  if (!validSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }
  if (!event || typeof event !== 'object') {
    return NextResponse.json({ error: 'Invalid payment payload' }, { status: 400 });
  }

  if (event.event === 'charge.success') {
    if (!event.data || typeof event.data.reference !== 'string' || !Number.isFinite(event.data.amount)) {
      return NextResponse.json({ error: 'Invalid payment payload' }, { status: 400 });
    }
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
        const qty: number = Number(metadata?.quantity);
        const unitPrice: number = Number(metadata?.unitPrice);
        const tierName: string = metadata?.tierName ?? 'Ticket';

        if (typeof tierId !== 'string' || !tierId || !Number.isInteger(qty) || qty < 1 || qty > 20 || !Number.isFinite(unitPrice) || unitPrice < 1) {
          return NextResponse.json({ error: 'Invalid ticket purchase metadata' }, { status: 400 });
        }
        const tier = await prisma.ticketTier.findUnique({ where: { id: tierId }, include: { event: true } });
        if (!tier || tier.price !== unitPrice || tier.eventId !== eventId || amount !== unitPrice * qty * 100) {
          return NextResponse.json({ error: 'Ticket payment does not match the current ticket price' }, { status: 400 });
        }

        const tickets = await prisma.$transaction(async (tx) => {
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
                  eventId: tier.eventId,
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
                code: `TKT-${randomBytes(18).toString('hex').toUpperCase()}`,
                status: 'VALID',
              },
            })
          );
          const tickets = await Promise.all(ticketCreates);

          return tickets;
        });
        if (customer?.email) {
          sendTicketEmail({
            to: customer.email,
            tickets: tickets.map((t) => ({ code: t.code, name: tierName })),
            eventName: metadata?.eventName ?? tier.event.title,
          }).catch((err) => console.error('Failed to send ticket email', err));
        }
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
      console.error('Failed to persist order:', err);
      // Paystack retries non-2xx webhook responses. Returning 200 here could
      // permanently lose a paid order and its tickets.
      return NextResponse.json({ error: 'Could not persist payment' }, { status: 500 });
    }
  }

  // Always answer 200 quickly so Paystack doesn't retry.
  return NextResponse.json({ received: true });
}
