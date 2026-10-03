import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Prisma 7 requires a driver adapter — `new PrismaClient()` alone now throws.
// This uses the plain node-postgres driver against DATABASE_URL, the same
// connection string prisma.config.ts uses for migrations. (If this ever
// hits Vercel serverless connection-pool limits, Prisma Postgres also
// offers an Accelerate-backed adapter — @prisma/adapter-ppg — as a drop-in
// swap here; not needed at this project's current scale.)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Standard Next.js pattern: reuse one PrismaClient across hot-reloads in dev
// so we don't open a new database connection pool on every file save.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
