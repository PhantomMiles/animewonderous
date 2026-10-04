import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { prisma } from '../../lib/prisma';
import AccountPage from '../../pages/AccountPage';

export default async function Account() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/?auth=signin');
  }

  // Fetch the full user from the DB with their forum posts and tickets
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      forumPosts: {
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { comments: true, likes: true } } },
      },
      communities: {
        include: { community: true },
      },
    },
  });

  if (!user) {
    redirect('/?auth=signin');
  }

  // Fetch the user's tickets
  const tickets = await prisma.ticket.findMany({
    where: { orderItem: { order: { customerEmail: user.email ?? '' } } },
    include: { orderItem: { include: { event: true, ticketTier: true } } },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  // Fetch the user's orders
  const orders = await prisma.order.findMany({
    where: { customerEmail: user.email ?? '' },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  // Strip sensitive fields before passing to client component
  const safeUser = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    image: user.image,
    banner: user.banner,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    forumPosts: user.forumPosts.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    })),
    communityMemberships: user.communities,
  };

  return (
    <AccountPage 
      user={safeUser} 
      tickets={tickets} 
      orders={orders} 
    />
  );
}
