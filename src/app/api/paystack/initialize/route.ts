import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../lib/prisma';
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

    const requested = items as CartLine[];
    const ids = requested.map((i) => i?.id).filter((id): id is string => typeof id === 'string');

    // Price and stock are always checked against the database, never the
    // browser. This is the same lookup the webhook will use to fulfill the
    // order, so a product renamed or restocked between these two calls
    // can't desync — both read the same source of truth.
    const products = await prisma.product.findMany({ where: { id: { in: ids } } });
    const productsById = new Map(products.map((p) => [p.id, p]));

    let subtotal = 0;
    const lines: CartLine[] = [];
    for (const raw of requested) {
      const product = productsById.get(raw?.id);
      const quantity = Math.floor(Number(raw?.quantity));
      if (!product || !Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
        return NextResponse.json({ error: 'Invalid cart item' }, { status: 400 });
      }
      if (quantity > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} left of "${product.name}"` },
          { status: 400 }
        );
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
