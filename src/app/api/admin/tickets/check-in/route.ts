import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function isSuperAdmin() {
  const session = await auth();
  if (!session?.user?.id) return false;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  return user?.role === 'SUPERADMIN';
}

function getTicketCode(input: unknown, requestUrl: string): string | null {
  if (typeof input !== 'string') return null;
  const value = input.trim();
  let code = value;
  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      const allowedOrigins = [
        requestUrl,
        process.env.NEXTAUTH_URL,
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
        'https://animewonderous.vercel.app',
      ].flatMap((origin) => {
        if (!origin) return [];
        try { return [new URL(origin).origin]; } catch { return []; }
      });
      if (!allowedOrigins.includes(url.origin)) return null;
      const match = url.pathname.match(/^\/tickets\/verify\/([^/]+)\/?$/);
      if (!match) return null;
      code = decodeURIComponent(match[1]);
    } catch {
      return null;
    }
  }
  return /^[A-Za-z0-9_-]{6,180}$/.test(code) ? code : null;
}

export async function POST(request: Request) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }
  const code = getTicketCode((body as { code?: unknown })?.code, request.url);
  if (!code) return NextResponse.json({ error: 'Enter a valid ticket code or verification QR.' }, { status: 400 });

  const ticket = await prisma.ticket.findUnique({
    where: { code },
    select: { id: true, code: true, status: true, orderItem: { select: { order: { select: { status: true } } } } },
  });
  if (!ticket || ticket.orderItem.order.status !== 'PAID') {
    return NextResponse.json({ state: 'INVALID', message: 'Ticket not found or its payment is not valid.' }, { status: 404 });
  }
  if (ticket.status === 'USED') {
    return NextResponse.json({ state: 'USED', message: 'This ticket was already checked in.' });
  }
  if (ticket.status !== 'VALID') {
    return NextResponse.json({ state: 'INVALID', message: 'This ticket is expired or revoked.' });
  }

  const redeemed = await prisma.ticket.updateMany({ where: { id: ticket.id, status: 'VALID' }, data: { status: 'USED' } });
  if (redeemed.count === 1) return NextResponse.json({ state: 'ACCEPTED', message: 'Ticket verified. Entry approved.', code: ticket.code });

  const currentTicket = await prisma.ticket.findUnique({ where: { id: ticket.id }, select: { status: true } });
  if (!currentTicket || currentTicket.status === 'EXPIRED') {
    return NextResponse.json({ state: 'INVALID', message: 'This ticket is expired or revoked.' });
  }
  return NextResponse.json({ state: 'USED', message: 'This ticket was already checked in.' });
}
