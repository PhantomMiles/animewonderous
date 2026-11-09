import { prisma } from '../lib/prisma';

async function main() {
  try {
    await prisma.forumComment.deleteMany();
    await prisma.forumLike.deleteMany();
    await prisma.forumPost.deleteMany();
    await prisma.communityMember.deleteMany();
    await prisma.community.deleteMany();
    console.log('Successfully wiped all communities, posts, comments, and likes from the database.');
  } catch (error) {
    console.error('Error wiping database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
