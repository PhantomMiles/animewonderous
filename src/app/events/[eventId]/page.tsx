import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import EventDetailsPage from '../../../pages/EventDetailsPage';

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      ticketTiers: true,
      universityHubs: true,
    },
  });

  if (!event) notFound();

  return <EventDetailsPage event={event} />;
}
