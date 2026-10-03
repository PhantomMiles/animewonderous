import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// The Prisma CLI only auto-loads a plain `.env` by default. This project's
// real values live in `.env.local` (written by `vercel env pull`, same file
// Next.js itself reads) — so load both explicitly, with `.env.local`
// overriding, matching Next.js's own precedence.
loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
