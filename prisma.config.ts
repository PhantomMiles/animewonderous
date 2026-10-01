import "dotenv/config";
import { defineConfig } from "prisma/config";

// The datasource URL itself stays in prisma/schema.prisma (the classic,
// version-stable location) — this file just tells the Prisma CLI where
// to find the schema and migrations.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});
