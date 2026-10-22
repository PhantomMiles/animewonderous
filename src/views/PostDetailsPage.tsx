'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Heart, Share2, MoreHorizontal, ArrowLeft, Trash2, Edit, CornerDownRight } from 'lucide-react';
import { EditPostModal } from '../components/EditPostModal';
import Link from 'next/link';
import { useTransition, useState } from 'react';
import { toggleLike, createComment, deleteComment, editComment, deleteForumPost, createReply, toggleCommentLike, voteOnPoll } from '../app/actions';
import { useRouter } from 'next/navigation';

type Props = {
  post: any;
  hasLiked: boolean;
  likedCommentIds: string[];
  currentUser: any;
  totalPollVotes?: number;
  userVotedOptionId?: string | null;
};

// Recursive comment component
function CommentThread({ comment, postId, currentUser, likedCommentIds, depth = 0 }: {
  comment: any;
  postId: string;
  currentUser: any;
  likedCommentIds: string[];
  depth?: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const isLiked = likedCommentIds.includes(comment.id);
  const likeCount = comment.likes?.length || 0;

  const handleLike = () => {
    startTransition(async () => {
      await toggleCommentLike(comment.id, postId);
    });
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.append('postId', postId);
      fd.append('parentId', comment.id);
      fd.append('body', replyBody);
      await createReply(fd);
      setReplyBody('');
      setIsReplying(false);
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBody.trim()) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.append('commentId', comment.id);
      fd.append('content', editBody);
      await editComment(fd);
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    if (confirm('Delete this comment?')) {
      startTransition(async () => {
        await deleteComment(comment.id);
      });
    }
  };

  return (
    <div className={`flex gap-3 ${depth > 0 ? 'mt-4' : ''}`}>
      {depth > 0 && (
        <div className="flex flex-col items-center gap-1 shrink-0 w-4">
          <div className="w-px flex-1 bg-border min-h-4" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex gap-3">
          <img
            src={comment.author?.image || 'https://i.pravatar.cc/150'}
            className="h-8 w-8 rounded-xl shrink-0"
          />
          <div className="flex-1 min-w-0 bg-surface border border-border rounded-2xl rounded-tl-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{comment.author?.username}</span>
                <span className="text-[10px] text-text-muted">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              {currentUser?.id === comment.authorId && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setIsEditing(!isEditing); setEditBody(comment.body); }}
                    className="text-text-muted hover:text-primary p-1 rounded transition-colors"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-text-muted hover:text-red-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Body / Edit form */}
            {isEditing ? (
              <form onSubmit={handleEditSubmit}>
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-sm outline-none focus:border-primary/50 transition-colors mb-2 resize-none min-h-[80px]"
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button type="submit" size="sm" disabled={isPending || !editBody.trim()}>Save</Button>
                </div>
              </form>
            ) : (
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{comment.body}</p>
            )}

            {/* Actions */}
            {!isEditing && (
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                <button
                  onClick={handleLike}
                  disabled={isPending}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isLiked ? 'text-pink-500' : 'text-text-muted hover:text-pink-500'}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  {likeCount}
                </button>
                {depth < 3 && currentUser && (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-primary transition-colors"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" /> Reply
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reply form */}
        {isReplying && (
          <div className="mt-3 ml-11">
            <form onSubmit={handleReplySubmit} className="space-y-2">
              <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder={`Reply to ${comment.author?.username}...`}
                className="w-full bg-surface border border-border rounded-xl p-3 text-sm outline-none focus:border-primary/50 transition-colors min-h-[80px] resize-none"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => { setIsReplying(false); setReplyBody(''); }}>Cancel</Button>
                <Button type="submit" size="sm" disabled={isPending || !replyBody.trim()}>Reply</Button>
              </div>
            </form>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-3 ml-4 space-y-3">
            {comment.replies.map((reply: any) => (
              <CommentThread
                key={reply.id}
                comment={reply}
                postId={postId}
                currentUser={currentUser}
                likedCommentIds={likedCommentIds}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PostDetailsPage({ post, hasLiked, likedCommentIds, currentUser, totalPollVotes = 0, userVotedOptionId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const handleLike = () => {
    if (!currentUser) return router.push('/api/auth/signin');
    startTransition(async () => {
      await toggleLike(post.id);
    });
  };

  const handleVote = (optionId: string) => {
    if (!currentUser) return router.push('/api/auth/signin');
    startTransition(async () => {
      await voteOnPoll(optionId, post.id);
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return router.push('/api/auth/signin');
    if (!commentBody.trim()) return;

    startTransition(async () => {
      const fd = new FormData();
      fd.append('postId', post.id);
      fd.append('content', commentBody);
      await createComment(fd);
      setCommentBody('');
      setIsCommenting(false);
    });
  };

  const handleDeletePost = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      startTransition(async () => {
        await deleteForumPost(post.id);
        router.push(post.communityId ? `/community/${post.communityId}` : '/forum');
      });
    }
  };

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-12 lg:px-8 max-w-3xl">
      <Link href={post.communityId ? `/community/${post.communityId}` : '/forum'} className="flex items-center gap-2 text-text-muted hover:text-foreground transition-colors mb-8 w-fit text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      {/* Post card */}
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-8">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
               <img src={post.author?.image || 'https://i.pravatar.cc/150'} className="h-12 w-12 rounded-2xl" />
               <div>
                  <span className="font-bold">{post.author?.username}</span>
                  <p className="text-xs text-text-muted">{new Date(post.createdAt).toLocaleDateString()} · {post.category}</p>
               </div>
            </div>
            <div className="flex items-center gap-1">
              {currentUser?.id === post.authorId && (
                <>
                  <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(true)} className="text-text-muted hover:text-primary h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleDeletePost} disabled={isPending} className="text-text-muted hover:text-red-400 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>

          <h1 className="text-3xl font-display mb-4">{post.title}</h1>
          {post.image && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-border">
              <img src={post.image} alt={post.title} className="w-full max-h-[500px] object-cover" />
            </div>
          )}
          <div className="text-text-secondary leading-relaxed whitespace-pre-wrap mb-8">
            {post.body}
          </div>

          {post.type === 'POLL' && post.pollOptions && (
            <div className="mb-8 space-y-3 p-6 bg-background border border-border rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Poll</h3>
              {post.pollOptions.map((opt: any) => {
                const votes = opt._count?.votes || 0;
                const percentage = totalPollVotes > 0 ? Math.round((votes / totalPollVotes) * 100) : 0;
                const isSelected = userVotedOptionId === opt.id;
                
                return (
                  <div key={opt.id} className="relative overflow-hidden rounded-xl border border-border group cursor-pointer" onClick={() => !isPending && handleVote(opt.id)}>
                    <div 
                      className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${isSelected ? 'bg-primary/20' : 'bg-surface'}`}
                      style={{ width: `${userVotedOptionId ? percentage : 0}%` }}
                    />
                    <div className="relative flex items-center justify-between p-4 z-10">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary' : 'border-text-muted group-hover:border-primary/50'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>{opt.text}</span>
                      </div>
                      {userVotedOptionId && (
                        <span className="text-sm font-bold text-text-muted">{percentage}%</span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="text-right text-xs text-text-muted mt-2">
                {totalPollVotes} total votes
              </div>
            </div>
          )}

          <div className="flex items-center gap-6 pt-6 border-t border-border">
            <button
              onClick={handleLike}
              disabled={isPending}
              className={`flex items-center gap-2 transition-colors text-sm font-medium ${hasLiked ? 'text-pink-500' : 'text-text-secondary hover:text-pink-500'}`}
            >
               <Heart className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} />
               {post._count?.likes || 0} Likes
            </button>
            <button
              onClick={() => { if (!currentUser) return router.push('/api/auth/signin'); setIsCommenting(true); }}
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium"
            >
               <MessageSquare className="h-5 w-5" />
               {post._count?.comments || 0} Comments
            </button>
            <button className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors text-sm font-medium ml-auto">
               <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comment composer */}
      {(isCommenting || post.comments.length === 0) && currentUser && (
        <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <div className="flex gap-3">
              <img src={currentUser?.image || 'https://i.pravatar.cc/150'} className="h-9 w-9 rounded-xl shrink-0" />
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-background border border-border rounded-xl p-3 text-sm outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-none"
                autoFocus={isCommenting}
              />
            </div>
            <div className="flex justify-end gap-2">
              {isCommenting && (
                <Button type="button" variant="ghost" size="sm" onClick={() => { setIsCommenting(false); setCommentBody(''); }}>
                  Cancel
                </Button>
              )}
              <Button type="submit" size="sm" disabled={isPending || !commentBody.trim()}>
                Post Comment
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Comments thread */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg uppercase tracking-wider">
            Comments ({post._count?.comments || 0})
          </h3>
          {!isCommenting && currentUser && (
            <Button variant="outline" size="sm" onClick={() => setIsCommenting(true)} className="gap-2">
              <MessageSquare className="h-4 w-4" /> Comment
            </Button>
          )}
        </div>

        {post.comments.length === 0 ? (
          <div className="text-center py-12 text-text-muted bg-surface border border-border rounded-2xl">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No comments yet. Be the first to reply!</p>
          </div>
        ) : (
          post.comments.map((comment: any) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              postId={post.id}
              currentUser={currentUser}
              likedCommentIds={likedCommentIds}
              depth={0}
            />
          ))
        )}
      </div>
    </div>

    <EditPostModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} post={post} />
    <Footer />
    </>
  );
}
