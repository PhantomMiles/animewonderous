// Loads the content currently hardcoded in src/data/mockData.ts into the
// database. Safe to re-run — every write is an upsert keyed on the same id
// mockData.ts already uses, so running this again just syncs edits you make
// in mockData.ts rather than creating duplicates.
//
// Run with: npx prisma db seed

import { PrismaClient } from '@prisma/client';
import {
  PRODUCTS,
  EVENTS,
  CODEN_ENUGU_UNIVERSITIES,
  ANIME_TICKET_TIERS,
  CODEN_TICKET_TIERS,
  COMMUNITIES,
  FORUM_POSTS,
} from '../src/data/mockData';

const prisma = new PrismaClient();

async function main() {
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        category: p.category,
        price: p.price,
        currency: p.currency,
        rating: p.rating,
        images: p.images,
        description: p.description,
        stock: p.stock,
        tags: p.tags ?? [],
      },
      create: {
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        currency: p.currency,
        rating: p.rating,
        images: p.images,
        description: p.description,
        stock: p.stock,
        tags: p.tags ?? [],
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products`);

  for (const e of EVENTS) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: {
        title: e.title,
        date: e.date,
        location: e.location,
        category: e.category,
        price: e.price,
        image: e.image,
        description: e.description,
        featured: e.featured ?? false,
        hasUniversityHubs: e.hasUniversityHubs ?? false,
      },
      create: {
        id: e.id,
        title: e.title,
        date: e.date,
        location: e.location,
        category: e.category,
        price: e.price,
        image: e.image,
        description: e.description,
        featured: e.featured ?? false,
        hasUniversityHubs: e.hasUniversityHubs ?? false,
      },
    });
  }
  console.log(`Seeded ${EVENTS.length} events`);

  // University hubs only make sense attached to CODEN today. If you add a
  // second hasUniversityHubs event later, give its hubs their own array in
  // mockData.ts and extend this loop rather than reusing this constant.
  const codenEvent = EVENTS.find((e) => e.hasUniversityHubs);
  if (codenEvent) {
    await prisma.eventUniversityHub.deleteMany({ where: { eventId: codenEvent.id } });
    await prisma.eventUniversityHub.createMany({
      data: CODEN_ENUGU_UNIVERSITIES.map((u) => ({
        eventId: codenEvent.id,
        name: u.name,
        location: u.location,
        role: u.role,
      })),
    });
    console.log(`Seeded ${CODEN_ENUGU_UNIVERSITIES.length} university hubs for ${codenEvent.id}`);
  }

  // Ticket tiers: ANIME_TICKET_TIERS belong to the Shibuya-style event(s),
  // CODEN_TICKET_TIERS to the one with hasUniversityHubs — matching the
  // if/else already in mockData.ts's getTicketTiersForEvent().
  const codenEventId = EVENTS.find((e) => e.hasUniversityHubs)?.id;
  const animeEvents = EVENTS.filter((e) => e.id !== codenEventId);

  for (const tier of CODEN_TICKET_TIERS) {
    if (!codenEventId) break;
    await prisma.ticketTier.upsert({
      where: { id: tier.id },
      update: {
        eventId: codenEventId,
        title: tier.title,
        theme: tier.theme,
        capacity: tier.capacity,
        groupSize: tier.groupSize,
        price: tier.price,
        perks: tier.perks,
      },
      create: {
        id: tier.id,
        eventId: codenEventId,
        title: tier.title,
        theme: tier.theme,
        capacity: tier.capacity,
        groupSize: tier.groupSize,
        price: tier.price,
        perks: tier.perks,
      },
    });
  }
  for (const event of animeEvents) {
    for (const tier of ANIME_TICKET_TIERS) {
      // Tier ids are shared across every anime-style event in the mock data,
      // so make them unique per event here to avoid a primary-key clash.
      const id = animeEvents.length > 1 ? `${event.id}__${tier.id}` : tier.id;
      await prisma.ticketTier.upsert({
        where: { id },
        update: {
          eventId: event.id,
          title: tier.title,
          theme: tier.theme,
          capacity: tier.capacity,
          groupSize: tier.groupSize,
          price: tier.price,
          perks: tier.perks,
        },
        create: {
          id,
          eventId: event.id,
          title: tier.title,
          theme: tier.theme,
          capacity: tier.capacity,
          groupSize: tier.groupSize,
          price: tier.price,
          perks: tier.perks,
        },
      });
    }
  }
  console.log(`Seeded ticket tiers for ${EVENTS.length} events`);

  for (const c of COMMUNITIES) {
    await prisma.community.upsert({
      where: { id: c.id },
      update: {
        name: c.name,
        avatar: c.avatar,
        banner: c.banner,
        verified: c.verified,
        memberCount: c.memberCount,
        tags: c.tags,
        description: c.description,
      },
      create: {
        id: c.id,
        name: c.name,
        avatar: c.avatar,
        banner: c.banner,
        verified: c.verified,
        memberCount: c.memberCount,
        tags: c.tags,
        description: c.description,
      },
    });
  }
  console.log(`Seeded ${COMMUNITIES.length} communities`);

  // Forum posts have no stable external id to upsert on in the mock data's
  // shape beyond their own 'post-001' style ids, so these use createMany +
  // skipDuplicates keyed loosely by title to avoid re-seeding duplicates.
  const existingTitles = new Set((await prisma.forumPost.findMany({ select: { title: true } })).map((p) => p.title));
  const newPosts = FORUM_POSTS.filter((p) => !existingTitles.has(p.title));
  if (newPosts.length) {
    await prisma.forumPost.createMany({
      data: newPosts.map((p) => ({
        title: p.title,
        body: p.body,
        category: p.category,
        authorName: p.author.name,
        authorAvatar: p.author.avatar,
        authorVerified: p.author.verified ?? false,
        replies: p.replies,
        likes: p.likes,
      })),
    });
  }
  console.log(`Seeded ${newPosts.length} new forum posts`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
