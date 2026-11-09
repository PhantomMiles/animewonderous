# Production database migrations

Vercel's build runs `npm run build`, which only builds the Next.js app. Database migrations run separately with `npm run db:migrate`, so preview and production builds never mutate a database.

The current production migration failed after adding required fields to populated tables without defaults. The corrected migration supplies timestamps, maps old forum posts to non-login legacy author profiles, and adds the fields and tables expected by the current Prisma schema.

Prisma has already recorded the failed migration in the target database. It will not retry until the failed migration is resolved. Before recovery, take a provider-level database backup and confirm the production database is the intended target.

From this branch, save any existing local `.env.local`, then pull Vercel's production variables into that ignored file and resolve only this failed migration:

```sh
vercel env pull .env.local --environment=production
npx prisma migrate resolve --rolled-back 20261004121759_init_auth_and_community
npm run db:migrate
```

Restore the saved development `.env.local` afterward. Review the migration state before running these commands. Do not use rollback resolution in an environment where this migration was already applied; use a forward-only migration there. Apply the production migration before promoting the new application build.
