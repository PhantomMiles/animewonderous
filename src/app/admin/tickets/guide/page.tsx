import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import TicketGuide from './TicketGuide';

export const dynamic = 'force-dynamic';

export default async function TicketGuidePage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/?auth=signin');
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (user?.role !== 'SUPERADMIN') redirect('/');
  return <TicketGuide />;
}
