import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import { auth } from '../../../auth';
import CommunityDetailsPage from '../../../pages/CommunityDetailsPage';

export default async function Page({ params }: { params: Promise<{ communityId: string }> }) {
  const { communityId } = await params;

  const community = await prisma.community.findUnique({
    where: { id: communityId },
    include: { 
      _count: { select: { members: true } },
      members: {
        include: { user: true },
        orderBy: { joinedAt: 'asc' }
      }
    }
  });

  if (!community) {
    notFound();
  }

  const posts = await prisma.forumPost.findMany({
    where: { communityId },
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
      _count: { select: { comments: true, likes: true } }
    }
  });

  const session = await auth();
  let userRole = null;

  if (session?.user?.id) {
    const membership = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId: communityId
        }
      }
    });
    if (membership) {
      userRole = membership.role;
    }
  }

  const mappedCommunity = {
    ...community,
    memberCount: community._count.members,
  };

  return <CommunityDetailsPage community={mappedCommunity} posts={posts} userRole={userRole} />;
}
