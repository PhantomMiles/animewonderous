# Animewonderous

A unified anime, gaming, and youth-culture platform targeting Enugu, Nigeria. The platform features an anime merchandise e-commerce shop, event ticketing (Shibuya Fest 3.0 & CODEN esports), and a robust community hub with threaded forums.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS v4, Lucide Icons
- **Database:** PostgreSQL (via Prisma v7)
- **Authentication:** NextAuth v5 (Credentials + bcrypt)
- **Payments:** Paystack
- **Media Uploads:** Cloudinary
- **Emails:** Resend
- **Testing:** Vitest, React Testing Library

## Prerequisites
- Node.js (v22+)
- PostgreSQL instance (local or hosted)

## Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```
   *Note: See `.env.example` for details on required variables (Database URL, NextAuth secret, Paystack keys, Cloudinary keys).*

3. **Database Setup:**
   Run Prisma to push the schema to your database and generate the Prisma Client:
   ```bash
   npx prisma db push
   npm run postinstall
   ```

4. **Seed the Database:**
   Populate the shop and events with initial data:
   ```bash
   npx ts-node prisma/seed.ts
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Your app will be available at [http://localhost:3000](http://localhost:3000).

## Testing
Run the automated test suite with Vitest:
```bash
npm run test
```

## Features
- **Shop & Checkout:** Browse merchandise, add to cart (persisted locally), and securely checkout via Paystack.
- **Ticketing System:** Purchase tickets for offline events and receive dynamic QR codes via email.
- **Community Hub:** Create topic-based communities, assign admin/moderator roles, and interact via Reddit-style threaded comments and polls.
- **SuperAdmin Panel:** Manage platform users, communities, products, and incoming orders.

---
*Built for the vibrant anime and gaming culture in Enugu.*
