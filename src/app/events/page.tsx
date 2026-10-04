import { prisma } from '../../lib/prisma';
import EventsPage from '../../pages/EventsPage';

export default async function Page() {
  const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
  return <EventsPage initialEvents={events} />;
}
