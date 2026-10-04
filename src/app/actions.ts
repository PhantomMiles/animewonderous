'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

import bcrypt from 'bcryptjs';
import { auth } from '../auth';

export async function createCommunity(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  
  const id = `comm-${Date.now()}`;
  
  const tagsString = formData.get('tags') as string;
  const tags = tagsString 
    ? tagsString.split(',').map(t => t.trim()).filter(Boolean) 
    : ['General', 'New'];

  const avatarUrl = formData.get('avatarUrl') as string | null;
  const bannerUrl = formData.get('bannerUrl') as string | null;

  await prisma.community.create({
    data: {
      id,
      name: name || 'Unnamed Community',
      description: description || 'No description provided.',
      avatar: avatarUrl || 'https://api.dicebear.com/9.x/notionists/svg?seed=' + id,
      banner: bannerUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200',
      tags,
      members: {
        create: {
          userId: session.user.id,
          role: 'ADMIN',
        }
      }
    }
  });

  revalidatePath('/community');
  return { success: true, id };
}

export async function joinCommunity(communityId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  await prisma.communityMember.create({
    data: {
      userId: session.user.id,
      communityId,
      role: 'MEMBER'
    }
  });

  revalidatePath(`/community/${communityId}`);
  revalidatePath('/account');
  return { success: true };
}

export async function leaveCommunity(communityId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  await prisma.communityMember.delete({
    where: {
      userId_communityId: {
        userId: session.user.id,
        communityId
      }
    }
  });

  revalidatePath(`/community/${communityId}`);
  revalidatePath('/account');
  return { success: true };
}

export async function createForumPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const body = formData.get('body') as string;
  const communityId = formData.get('communityId') as string | null;
  const type = (formData.get('type') as 'TEXT' | 'POLL') || 'TEXT';
  const pollOptionsRaw = formData.get('pollOptions') as string | null;
  const image = formData.get('image') as string | null;
  
  let pollOptionsData = [];
  if (type === 'POLL' && pollOptionsRaw) {
    const parsed = JSON.parse(pollOptionsRaw);
    pollOptionsData = parsed.map((text: string) => ({ text }));
  }

  await prisma.forumPost.create({
    data: {
      type,
      title: title || 'Untitled Post',
      category: category || 'General Discussion',
      body: body || '',
      image: image || null,
      authorId: session.user.id,
      communityId: communityId || null,
      pollOptions: type === 'POLL' ? { create: pollOptionsData } : undefined
    }
  });

  if (communityId) {
    revalidatePath(`/community/${communityId}`);
  }
  revalidatePath('/forum');
  return { success: true };
}

export async function deleteForumPost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  if (!post) return { success: false };

  // Note: Add proper authorization check here (is author, or is community admin/moderator, or superadmin)
  await prisma.forumPost.delete({ where: { id: postId } });
  
  if (post.communityId) revalidatePath(`/community/${post.communityId}`);
  revalidatePath('/forum');
  return { success: true };
}

export async function editForumPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const postId = formData.get('postId') as string;
  const body = formData.get('body') as string;

  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Not found');

  // Note: Add proper authorization check here
  await prisma.forumPost.update({
    where: { id: postId },
    data: { body }
  });

  if (post.communityId) revalidatePath(`/community/${post.communityId}`);
  revalidatePath('/forum');
  return { success: true };
}

export async function changeMemberRole(communityId: string, userId: string, newRole: 'ADMIN' | 'MODERATOR' | 'MEMBER') {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const currentUserMembership = await prisma.communityMember.findUnique({
    where: { userId_communityId: { userId: session.user.id, communityId } }
  });

  if (currentUserMembership?.role !== 'ADMIN') {
    throw new Error('Only admins can change roles');
  }

  await prisma.communityMember.update({
    where: { userId_communityId: { userId, communityId } },
    data: { role: newRole }
  });

  revalidatePath(`/community/${communityId}`);
  return { success: true };
}

export async function signUpUser(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const email = formData.get('email') as string | null;
  const avatar = formData.get('avatar') as string | null;

  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email: email || null,
      image: avatar || '/images/avatars/default.webp',
      name: username,
    }
  });

  return { success: true, userId: user.id };
}

export async function createComment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const postId = formData.get('postId') as string;
  const body = formData.get('content') as string;

  await prisma.forumComment.create({
    data: {
      body,
      postId,
      authorId: session.user.id,
    }
  });

  revalidatePath(`/forum/${postId}`);
  return { success: true };
}

export async function editComment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const commentId = formData.get('commentId') as string;
  const body = formData.get('content') as string;

  const comment = await prisma.forumComment.findUnique({ where: { id: commentId } });
  if (comment?.authorId !== session.user.id) throw new Error('Not authorized');

  await prisma.forumComment.update({
    where: { id: commentId },
    data: { body }
  });

  revalidatePath(`/forum/${comment.postId}`);
  return { success: true };
}

export async function deleteComment(commentId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const comment = await prisma.forumComment.findUnique({ where: { id: commentId } });
  if (comment?.authorId !== session.user.id) throw new Error('Not authorized');

  await prisma.forumComment.delete({ where: { id: commentId } });
  revalidatePath(`/forum/${comment.postId}`);
  return { success: true };
}

export async function toggleLike(postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const existing = await prisma.forumLike.findUnique({
    where: { postId_userId: { postId, userId: session.user.id } }
  });

  if (existing) {
    await prisma.forumLike.delete({
      where: { postId_userId: { postId, userId: session.user.id } }
    });
  } else {
    await prisma.forumLike.create({
      data: { userId: session.user.id, postId }
    });
  }

  revalidatePath(`/forum/${postId}`);
  return { success: true };
}

export async function createReply(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const postId = formData.get('postId') as string;
  const parentId = formData.get('parentId') as string;
  const body = formData.get('body') as string;

  await prisma.forumComment.create({
    data: {
      body,
      postId,
      parentId,
      authorId: session.user.id,
    }
  });

  revalidatePath(`/forum/${postId}`);
  return { success: true };
}

export async function toggleCommentLike(commentId: string, postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const existing = await prisma.commentLike.findUnique({
    where: { commentId_userId: { commentId, userId: session.user.id } }
  });

  if (existing) {
    await prisma.commentLike.delete({
      where: { commentId_userId: { commentId, userId: session.user.id } }
    });
  } else {
    await prisma.commentLike.create({
      data: { commentId, userId: session.user.id }
    });
  }

  revalidatePath(`/forum/${postId}`);
  return { success: true };
}

export async function voteOnPoll(optionId: string, postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  // Check if user already voted on this poll
  // A poll belongs to a post. User can only vote once per post.
  const existingVote = await prisma.pollVote.findFirst({
    where: {
      userId: session.user.id,
      option: { postId }
    }
  });

  if (existingVote) {
    // Optional: allow changing vote
    await prisma.pollVote.delete({ where: { id: existingVote.id } });
  }

  await prisma.pollVote.create({
    data: {
      optionId,
      userId: session.user.id
    }
  });

  revalidatePath(`/forum/${postId}`);
  if (postId) revalidatePath('/forum'); // To update preview
  return { success: true };
}

export async function updateUserProfile(data: { image?: string; banner?: string; name?: string; username?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  await prisma.user.update({
    where: { id: session.user.id },
    data
  });

  revalidatePath('/account');
  return { success: true };
}

export async function updateCommunity(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const communityId = formData.get('communityId') as string;

  // Verify the caller is the ADMIN of this community
  const membership = await prisma.communityMember.findUnique({
    where: { userId_communityId: { userId: session.user.id, communityId } }
  });
  if (!membership || membership.role !== 'ADMIN') throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const tagsString = formData.get('tags') as string;
  const rulesString = formData.get('rules') as string;
  const avatarUrl = formData.get('avatarUrl') as string | null;
  const bannerUrl = formData.get('bannerUrl') as string | null;

  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : undefined;
  const rules = rulesString ? JSON.parse(rulesString) : undefined;

  await prisma.community.update({
    where: { id: communityId },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(tags && { tags }),
      ...(rules !== undefined && { rules }),
      ...(avatarUrl && { avatar: avatarUrl }),
      ...(bannerUrl && { banner: bannerUrl }),
    }
  });

  revalidatePath(`/community/${communityId}`);
  revalidatePath('/community');
  return { success: true };
}

