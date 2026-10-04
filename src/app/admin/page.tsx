import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { prisma } from '../../lib/prisma';
import AdminDashboard from '../../pages/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/?auth=signin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!user || user.role !== 'SUPERADMIN') {
    redirect('/');
  }

  const [users, orders, products, communities, paidOrdersTotal] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.product.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.community.findMany({
      include: { _count: { select: { members: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { total: true }
    })
  ]);

  const [totalUsers, totalOrders] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
  ]);

  const data = {
    users,
    orders,
    products,
    communities,
    stats: {
      totalRevenue: paidOrdersTotal._sum.total || 0,
      totalUsers,
      totalOrders,
    },
  };

  return <AdminDashboard data={data} />;
}
