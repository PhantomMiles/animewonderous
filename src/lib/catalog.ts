// Database-backed equivalents of the functions and arrays in
// src/data/mockData.ts. Each page can switch over one at a time — e.g.
// ShopPage.tsx's `PRODUCTS` import becomes `await getProducts()` and the
// component becomes an async Server Component. Nothing imports this file
// yet; mockData.ts is still what's actually rendered until you wire a page
// to it.

import { prisma } from './prisma';

export function getProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: 'asc' } });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export function getEvents() {
  return prisma.event.findMany({ orderBy: { createdAt: 'asc' } });
}

export function getFeaturedEvents() {
  return prisma.event.findMany({ where: { featured: true } });
}

export function getEventsByCategory(category: string) {
  if (!category || category.toLowerCase() === 'all') {
    return getEvents();
  }
  return prisma.event.findMany({
    where: { category: { equals: category, mode: 'insensitive' } },
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: { universityHubs: true, ticketTiers: true },
  });
}

export function getTicketTiersForEvent(eventId: string) {
  return prisma.ticketTier.findMany({ where: { eventId } });
}

export function getTicketTierById(id: string) {
  return prisma.ticketTier.findUnique({ where: { id } });
}

export function getCommunities() {
  return prisma.community.findMany();
}

export function getCommunityById(id: string) {
  return prisma.community.findUnique({ where: { id } });
}

export function getForumPosts() {
  return prisma.forumPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
      _count: { select: { comments: true, likes: true } }
    }
  });
}

// --- Orders & tickets ---
// Tracked by email rather than a user id, same as the Paystack webhook —
// there's no User table yet. Once real auth exists, swap customerEmail for
// a userId lookup here; nothing else about these functions needs to change.

export function getOrdersForEmail(email: string) {
  return prisma.order.findMany({
    where: { customerEmail: email },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
}

export function getTicketsForEmail(email: string) {
  return prisma.ticket.findMany({
    where: { orderItem: { order: { customerEmail: email } } },
    include: { orderItem: { include: { event: true, ticketTier: true } } },
    orderBy: { createdAt: 'desc' },
  });
}
