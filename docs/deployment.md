# Production database migrations

The Vercel build runs `prisma migrate deploy` before `next build`. The current production migration failed after adding a required timestamp column to populated tables without a default. The corrected migration backfills timestamps and preserves historical forum author data in non-login legacy profiles.

The failed migration is already recorded in the target database, so Vercel cannot simply retry it. Before recovery, take a database backup and confirm the production database is the intended target. Pull the Vercel production environment variables into a local ignored file, then resolve only this failed migration and retry deploy:

```sh
vercel env pull .env.production.local --environment=production
npx dotenv -e .env.production.local -- prisma migrate resolve --rolled-back 20261004121759_init_auth_and_community
npx dotenv -e .env.production.local -- prisma migrate deploy
```

Review the failed migration state and the backup before running these commands. Do not use this rollback resolution in an environment where the migration was already applied; use a forward-only migration there.
