import { PrismaClient } from '../generated/prisma';

async function main() {
  const p = new PrismaClient();
  try {
    const users = await p.user.findMany({ 
      select: { id: true, username: true, email: true, role: true, createdAt: true } 
    });
    console.log('=== USERS IN DB ===');
    console.log(JSON.stringify(users, null, 2));
    console.log(`Total: ${users.length} users`);
  } finally {
    await p.$disconnect();
  }
}

main().catch(console.error);
