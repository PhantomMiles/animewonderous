import { prisma } from '../lib/prisma';

async function main() {
  try {
    const users = await prisma.user.findMany({ 
      select: { id: true, username: true, email: true, role: true, createdAt: true } 
    });
    console.log('=== USERS IN DB ===');
    console.log(JSON.stringify(users, null, 2));
    console.log(`Total: ${users.length} users`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
