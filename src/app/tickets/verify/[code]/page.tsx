import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ticket verification | Animewonderous', robots: { index: false, follow: false } };

export default async function VerifyTicketPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const ticket = await prisma.ticket.findUnique({
    where: { code },
    select: {
      code: true,
      status: true,
      orderItem: {
        select: {
          name: true,
          event: { select: { title: true, date: true, location: true } },
          ticketTier: { select: { title: true } },
          order: { select: { status: true } },
        },
      },
    },
  });

  if (!ticket) notFound();
  const valid = ticket.status === 'VALID' && ticket.orderItem.order.status === 'PAID';

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Animewonderous ticket check</p>
        <div className={`mx-auto mt-6 grid h-20 w-20 place-items-center rounded-full text-4xl font-black ${valid ? 'bg-emerald-500/15 text-emerald-500' : ticket.status === 'USED' && ticket.orderItem.order.status === 'PAID' ? 'bg-amber-500/15 text-amber-500' : 'bg-red-500/15 text-red-500'}`}>
          {valid ? '✓' : ticket.status === 'USED' ? '!' : '×'}
        </div>
        <h1 className="mt-5 text-3xl font-bold">{valid ? 'Valid ticket' : ticket.status === 'USED' && ticket.orderItem.order.status === 'PAID' ? 'Already checked in' : 'Ticket not valid'}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{valid ? 'This ticket is paid and has not been used.' : ticket.status === 'USED' ? 'This ticket has already been redeemed at the venue.' : 'This ticket is not eligible for entry.'}</p>
        <dl className="mt-8 space-y-4 border-t border-border pt-6 text-left text-sm">
          <div><dt className="text-muted-foreground">Event</dt><dd className="mt-1 font-semibold">{ticket.orderItem.event?.title ?? 'Animewonderous Event'}</dd></div>
          <div><dt className="text-muted-foreground">Date and venue</dt><dd className="mt-1 font-semibold">{ticket.orderItem.event?.date ?? 'To be announced'} · {ticket.orderItem.event?.location ?? 'To be announced'}</dd></div>
          <div><dt className="text-muted-foreground">Ticket type</dt><dd className="mt-1 font-semibold">{ticket.orderItem.ticketTier?.title ?? ticket.orderItem.name}</dd></div>
          <div><dt className="text-muted-foreground">Ticket code</dt><dd className="mt-1 break-all font-mono font-bold">{ticket.code}</dd></div>
        </dl>
        <p className="mt-7 text-xs text-muted-foreground">Entry staff must complete check-in from the secured admin scanner.</p>
      </section>
    </main>
  );
}
