import { prisma } from '../../lib/prisma';
import CommunityPage from '../../pages/CommunityPage';

export default async function Community() {
  const [communities, topPosts] = await Promise.all([
    prisma.community.findMany({
      include: { 
        _count: { select: { members: true, forumPosts: true } }
      },
      orderBy: { createdAt: 'desc' },
    }),
    // Trending = posts with most likes in last 7 days
    prisma.forumPost.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      },
      orderBy: { likes: { _count: 'desc' } },
      take: 4,
      select: { id: true, title: true, category: true, _count: { select: { likes: true } } }
    }),
  ]);

  const mapped = communities.map(c => ({
    ...c,
    memberCount: c._count.members,
    postCount: c._count.forumPosts,
  }));

  return (
    <CommunityPage initialCommunities={mapped} trendingPosts={topPosts} />
  );
}
