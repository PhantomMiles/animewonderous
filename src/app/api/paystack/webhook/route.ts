import { NextResponse } from 'next/server';
import { isValidWebhookSignature } from '../../../../lib/paystack';

// Paystack signs the RAW body, so read it as text before parsing.
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-paystack-signature');

  if (!isValidWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'charge.success') {
    const { reference, amount, customer, metadata } = event.data;
    // TODO: mark the order as paid in your database, send the confirmation
    // email, reduce stock, etc. Handle this idempotently: Paystack can
    // deliver the same event more than once.
    console.log('Payment confirmed:', { reference, amount, email: customer?.email, metadata });
  }

  // Always answer 200 quickly so Paystack doesn't retry.
  return NextResponse.json({ received: true });
}
