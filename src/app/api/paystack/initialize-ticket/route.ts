import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../lib/prisma';
import { initializeTransaction } from '../../../../lib/paystack';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email: unknown = body?.email;
    const tierId: unknown = body?.tierId;
    const quantity: unknown = body?.quantity;
    const eventId: unknown = body?.eventId;

    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (typeof tierId !== 'string' || !tierId) {
      return NextResponse.json({ error: 'A valid ticket tier is required' }, { status: 400 });
    }
    if (typeof eventId !== 'string' || !eventId) {
      return NextResponse.json({ error: 'A valid event ID is required' }, { status: 400 });
    }

    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty) || qty < 1 || qty > 20) {
      return NextResponse.json({ error: 'Quantity must be between 1 and 20' }, { status: 400 });
    }

    // Always verify price against DB — never trust the client.
    const tier = await prisma.ticketTier.findUnique({
      where: { id: tierId },
    });
    if (!tier || tier.eventId !== eventId) {
      return NextResponse.json({ error: 'Ticket tier not found for this event' }, { status: 400 });
    }

    const totalNaira = tier.price * qty;
    const amountKobo = Math.round(totalNaira * 100);
    const reference = `AWT-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

    const origin = new URL(request.url).origin;

    const result = await initializeTransaction({
      email,
      amount: amountKobo,
      reference,
      callback_url: `${origin}/checkout/verify`,
      metadata: {
        kind: 'TICKET',
        tierId: tier.id,
        eventId: tier.eventId,
        tierName: tier.title,
        quantity: qty,
        unitPrice: tier.price,
      },
    });

    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      reference: result.data.reference,
    });
  } catch (err) {
    console.error('Paystack ticket initialize error:', err);
    return NextResponse.json({ error: 'Could not start payment' }, { status: 500 });
  }
}
