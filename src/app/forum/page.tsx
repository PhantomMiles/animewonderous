import { prisma } from '../../lib/prisma';
import ForumPage from '../../pages/ForumPage';

export default async function Forum() {
  const [posts, totalPosts, totalUsers, totalComments, categories] = await Promise.all([
    prisma.forumPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        _count: { select: { comments: true, likes: true } }
      }
    }),
    prisma.forumPost.count(),
    prisma.user.count(),
    prisma.forumComment.count(),
    // Get distinct categories + their post counts
    prisma.forumPost.groupBy({
      by: ['category'],
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    }),
  ]);

  const stats = {
    totalThreads: totalPosts,
    totalMembers: totalUsers,
    totalPosts: totalPosts + totalComments,
  };

  const categoryData = categories.map(c => ({
    name: c.category,
    count: c._count.category,
  }));

  return (
    <ForumPage initialPosts={posts} stats={stats} categories={categoryData} />
  );
}
