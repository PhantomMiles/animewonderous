import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PRODUCTS } from '../../../../data/mockData';
import { initializeTransaction } from '../../../../lib/paystack';

const SHIPPING_FEE = 5000; // NGN, matches the cart summary

interface CartLine {
  id: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email: unknown = body?.email;
    const items: unknown = body?.items;

    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Price is always computed on the server from our own catalogue.
    // Never trust an amount sent from the browser.
    let subtotal = 0;
    const lines: CartLine[] = [];
    for (const raw of items as CartLine[]) {
      const product = PRODUCTS.find((p) => p.id === raw?.id);
      const quantity = Math.floor(Number(raw?.quantity));
      if (!product || !Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
        return NextResponse.json({ error: 'Invalid cart item' }, { status: 400 });
      }
      subtotal += product.price * quantity;
      lines.push({ id: product.id, quantity });
    }

    const totalNaira = subtotal + SHIPPING_FEE;
    const amountKobo = Math.round(totalNaira * 100);
    const reference = `AW-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

    const origin = new URL(request.url).origin;

    const result = await initializeTransaction({
      email,
      amount: amountKobo,
      reference,
      callback_url: `${origin}/checkout/verify`,
      metadata: { items: lines, subtotal, shipping: SHIPPING_FEE },
    });

    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      reference: result.data.reference,
    });
  } catch (err) {
    console.error('Paystack initialize error:', err);
    return NextResponse.json({ error: 'Could not start payment' }, { status: 500 });
  }
}
