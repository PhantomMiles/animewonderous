import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import TicketScanner from './TicketScanner';

export const dynamic = 'force-dynamic';

export default async function TicketScanPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/?auth=signin');
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (user?.role !== 'SUPERADMIN') redirect('/');
  return <TicketScanner />;
}
