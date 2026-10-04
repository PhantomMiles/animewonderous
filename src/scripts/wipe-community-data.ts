import { PrismaClient } from '../generated/prisma';

async function main() {
  const p = new PrismaClient();
  try {
    // Cascade delete handles comments/likes implicitly if set up correctly, 
    // but just to be safe we delete all:
    await p.forumComment.deleteMany();
    await p.forumLike.deleteMany();
    await p.forumPost.deleteMany();
    await p.communityMember.deleteMany();
    await p.community.deleteMany();
    console.log('Successfully wiped all communities, posts, comments, and likes from the database.');
  } catch (error) {
    console.error('Error wiping database:', error);
  } finally {
    await p.$disconnect();
  }
}

main();
