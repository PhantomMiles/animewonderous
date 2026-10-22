import 'server-only';
// Prisma 7's `prisma-client` generator writes to src/generated/prisma (see
// schema.prisma). `@prisma/client` no longer contains your models.
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Prisma 7 requires a driver adapter — `new PrismaClient()` alone now throws.
// This uses the plain node-postgres driver against DATABASE_URL, the same
// connection string prisma.config.ts uses for migrations. (If this ever
// hits Vercel serverless connection-pool limits, Prisma Postgres also
// offers an Accelerate-backed adapter — @prisma/adapter-ppg — as a drop-in
// swap here; not needed at this project's current scale.)
// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set.');
}

// Create a new PostgreSQL pool
const pool = new Pool({ connectionString });

// Create a Prisma adapter using the pool
const adapter = new PrismaPg(pool);

// Standard Next.js pattern: reuse one PrismaClient across hot-reloads in dev
// so we don't open a new database connection pool on every file save.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
