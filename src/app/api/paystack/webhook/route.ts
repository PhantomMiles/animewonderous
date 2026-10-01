import { NextResponse } from 'next/server';
import { isValidWebhookSignature } from '../../../../lib/paystack';
import { prisma } from '../../../../lib/prisma';
import { PRODUCTS } from '../../../../data/mockData';

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
      // upsert on the unique `reference` makes this idempotent — Paystack
      // can and does redeliver the same webhook event more than once.
      await prisma.order.upsert({
        where: { reference },
        update: {
          status: 'PAID',
          paidAt: paid_at ? new Date(paid_at) : new Date(),
        },
        create: {
          reference,
          status: 'PAID',
          customerEmail: customer?.email ?? 'unknown@animewonderous.com',
          subtotal: Number(metadata?.subtotal) || 0,
          shipping: Number(metadata?.shipping) || 0,
          total: amount / 100, // Paystack sends kobo
          paidAt: paid_at ? new Date(paid_at) : new Date(),
          items: {
            create: lines.map((line) => {
              const product = PRODUCTS.find((p) => p.id === line.id);
              return {
                productId: line.id,
                productName: product?.name ?? line.id,
                unitPrice: product?.price ?? 0,
                quantity: line.quantity,
              };
            }),
          },
        },
      });
    } catch (err) {
      // The payment already succeeded on Paystack's side — don't fail the
      // webhook response over a DB hiccup, just log it for follow-up.
      console.error('Failed to persist order:', err);
    }
  }

  // Always answer 200 quickly so Paystack doesn't retry.
  return NextResponse.json({ received: true });
}
