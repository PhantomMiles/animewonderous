import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import PostDetailsPage from '../../../pages/PostDetailsPage';
import { auth } from '../../../auth';

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const session = await auth();

  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    include: {
      author: true,
      // Only fetch top-level comments (no parentId)
      comments: {
        where: { parentId: null },
        include: {
          author: true,
          likes: true,
          replies: {
            include: {
              author: true,
              likes: true,
              // One more level deep
              replies: {
                include: {
                  author: true,
                  likes: true,
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
          },
          votes: {
            select: { userId: true }
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
      where: { userId: session.user.id }
    });
    likedCommentIds = commentLikes.map(cl => cl.commentId);
  }

  // Pre-calculate poll stats
  const totalPollVotes = post.pollOptions?.reduce((sum: number, opt: any) => sum + opt._count.votes, 0) || 0;
  let userVotedOptionId: string | null = null;
  
  if (session?.user?.id && post.type === 'POLL') {
    for (const opt of post.pollOptions) {
      if (opt.votes.some((v: any) => v.userId === session.user.id)) {
        userVotedOptionId = opt.id;
        break;
      }
    }
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
