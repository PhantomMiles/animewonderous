import { NextResponse } from 'next/server';
import { verifyTransaction } from '../../../../lib/paystack';

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
  }

  try {
    const result = await verifyTransaction(reference);
    const { status, amount, currency, paid_at } = result.data;

    return NextResponse.json({
      status, // 'success' | 'failed' | 'abandoned' | ...
      reference: result.data.reference,
      amount: amount / 100, // back to naira
      currency,
      paidAt: paid_at,
    });
  } catch (err) {
    console.error('Paystack verify error:', err);
    return NextResponse.json({ error: 'Could not verify payment' }, { status: 500 });
  }
}
