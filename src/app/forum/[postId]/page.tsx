import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import PostDetailsPage from '../../../views/PostDetailsPage';
import { auth } from '../../../auth';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const session = await auth();

  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    include: {
      author: { select: { username: true, image: true } },
      // Only fetch top-level comments (no parentId)
      comments: {
        where: { parentId: null },
        include: {
          author: { select: { username: true, image: true } },
          _count: { select: { likes: true } },
          replies: {
            include: {
              author: { select: { username: true, image: true } },
              _count: { select: { likes: true } },
              // One more level deep
              replies: {
                include: {
                  author: { select: { username: true, image: true } },
                  _count: { select: { likes: true } },
                }
              }
            },
            orderBy: { createdAt: 'asc' }
          },
        },
        orderBy: { createdAt: 'desc' }
      },
      pollOptions: {
        include: {
          _count: {
            select: { votes: true }
          }
        }
      },
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    }
  });

  if (!post) {
    notFound();
  }

  // Check if current user has liked the post
  let hasLiked = false;
  let likedCommentIds: string[] = [];

  if (session?.user?.id) {
    const like = await prisma.forumLike.findUnique({
      where: {
        postId_userId: {
          postId: post.id,
          userId: session.user.id
        }
      }
    });
    hasLiked = !!like;

    // Fetch all comment likes by this user for this post's comments
    const commentLikes = await prisma.commentLike.findMany({
      where: { userId: session.user.id, comment: { postId: post.id } },
      select: { commentId: true },
    });
    likedCommentIds = commentLikes.map(cl => cl.commentId);
  }

  // Pre-calculate poll stats
  const totalPollVotes = post.pollOptions?.reduce((sum: number, opt: any) => sum + opt._count.votes, 0) || 0;
  let userVotedOptionId: string | null = null;
  
  if (session?.user?.id && post.type === 'POLL') {
    const vote = await prisma.pollVote.findFirst({
      where: { userId: session.user.id, option: { postId: post.id } },
      select: { optionId: true },
    });
    userVotedOptionId = vote?.optionId ?? null;
  }

  return <PostDetailsPage 
    post={post} 
    hasLiked={hasLiked} 
    likedCommentIds={likedCommentIds} 
    currentUser={session?.user}
    totalPollVotes={totalPollVotes}
    userVotedOptionId={userVotedOptionId}
  />;
}
