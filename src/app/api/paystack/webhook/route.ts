import { NextResponse } from 'next/server';
import { isValidWebhookSignature } from '../../../../lib/paystack';
import { prisma } from '../../../../lib/prisma';

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
    const lines: WebhookCartLine[] = Array.isArray(metadata?.items) ? metadata.items : [];

    try {
      // Was this order already recorded (a Paystack webhook retry)? If so,
      // just flip its status — never re-create items or decrement stock
      // twice for the same payment.
      const existing = await prisma.order.findUnique({ where: { reference } });

      if (existing) {
        await prisma.order.update({
          where: { reference },
          data: { status: 'PAID', paidAt: paid_at ? new Date(paid_at) : new Date() },
        });
      } else {
        const products = await prisma.product.findMany({
          where: { id: { in: lines.map((l) => l.id) } },
        });
        const productsById = new Map(products.map((p) => [p.id, p]));

        // One transaction: create the order + items, and decrement stock
        // for each, so a crash partway through never leaves stock wrong.
        await prisma.$transaction([
          prisma.order.create({
            data: {
              reference,
              status: 'PAID',
              customerEmail: customer?.email ?? 'unknown@animewonderous.com',
              subtotal: Number(metadata?.subtotal) || 0,
              shipping: Number(metadata?.shipping) || 0,
              total: amount / 100, // Paystack sends kobo
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
      // The payment already succeeded on Paystack's side — don't fail the
      // webhook response over a DB hiccup, just log it for follow-up.
      console.error('Failed to persist order:', err);
    }
  }

  // Always answer 200 quickly so Paystack doesn't retry.
  return NextResponse.json({ received: true });
}
