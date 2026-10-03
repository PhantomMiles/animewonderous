import { config } from "dotenv";
// Next.js loads .env.local on top of .env; replicate that here so `prisma migrate dev` works locally.
config({ path: ".env" });
config({ path: ".env.local", override: true });
import { defineConfig } from "prisma/config";

// The datasource URL itself stays in prisma/schema.prisma (the classic,
// version-stable location) — this file just tells the Prisma CLI where
// to find the schema and migrations.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
});
