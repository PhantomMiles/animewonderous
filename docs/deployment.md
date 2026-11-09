# Production database migrations

The Vercel build runs `prisma migrate deploy` before `next build`. The current production migration failed after adding required columns to populated tables without defaults. The corrected migration supplies timestamps, maps existing forum posts to non-login legacy author profiles, and fills in the current Prisma schema.

Prisma has already recorded the failed migration in the production database. It will not retry until that migration is resolved. Before recovery, take a provider-level database backup and confirm the production database is the intended target.

The Prisma config reads `.env.local`. Save any existing local development copy, then pull Vercel's production variables into that ignored file and resolve only this failed migration:

```sh
vercel env pull .env.local --environment=production
npx prisma migrate resolve --rolled-back 20261004121759_init_auth_and_community
npx prisma migrate deploy
```

Restore the saved development `.env.local` afterward. Review the database migration state before running these commands. Do not use rollback resolution in an environment where the migration was already applied; use a forward-only migration there.
