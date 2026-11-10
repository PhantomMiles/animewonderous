'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '../../auth';
import { PRODUCTS } from '../../data/mockData';

async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (!user || user.role !== 'SUPERADMIN') throw new Error('Unauthorized');
  return session.user.id;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function adminSetUserBan(userId: string, banned: boolean) {
  await requireSuperAdmin();
  await prisma.user.update({ where: { id: userId }, data: { banned } });
  revalidatePath('/admin');
}

// ─── Communities ──────────────────────────────────────────────────────────────

export async function adminSetCommunityBan(communityId: string, banned: boolean) {
  await requireSuperAdmin();
  await prisma.community.update({ where: { id: communityId }, data: { banned } });
  revalidatePath('/admin');
  revalidatePath('/community');
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function adminUpdateDeliveryStatus(orderId: string, deliveryStatus: string) {
  await requireSuperAdmin();
  await prisma.order.update({
    where: { id: orderId },
    data: { deliveryStatus: deliveryStatus as any }
  });
  revalidatePath('/admin');
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function adminCreateProduct(formData: FormData) {
  await requireSuperAdmin();

  const id = `prod-${Date.now()}`;
  const imagesRaw = formData.get('images') as string;
  const tagsRaw = formData.get('tags') as string;
  const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  const tags = tagsRaw ? tagsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  await prisma.product.create({
    data: {
      id,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: parseInt(formData.get('price') as string, 10),
      description: formData.get('description') as string,
      stock: parseInt(formData.get('stock') as string, 10),
      images,
      tags,
    }
  });

  revalidatePath('/admin');
  revalidatePath('/shop');
}

export async function adminUpdateProduct(productId: string, formData: FormData) {
  await requireSuperAdmin();

  const imagesRaw = formData.get('images') as string;
  const tagsRaw = formData.get('tags') as string;
  const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : undefined;
  const tags = tagsRaw ? tagsRaw.split(',').map(s => s.trim()).filter(Boolean) : undefined;

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: parseInt(formData.get('price') as string, 10),
      description: formData.get('description') as string,
      stock: parseInt(formData.get('stock') as string, 10),
      ...(images && { images }),
      ...(tags && { tags }),
    }
  });

  revalidatePath('/admin');
  revalidatePath('/shop');
}

export async function adminSetProductPublished(productId: string, isPublished: boolean) {
  await requireSuperAdmin();

  if (isPublished) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    if (product.price <= 0 || product.stock <= 0 || product.images.length === 0) {
      throw new Error('Add a price, available stock, and at least one product image before publishing.');
    }
  }

  await prisma.product.update({ where: { id: productId }, data: { isPublished } });
  revalidatePath('/admin');
  revalidatePath('/shop');
}

export async function adminImportDraftMerch() {
  await requireSuperAdmin();
  const drafts = PRODUCTS.filter((product) => product.isPublished === false);

  const result = await prisma.product.createMany({
    data: drafts.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      currency: product.currency,
      rating: product.rating,
      images: product.images,
      description: product.description,
      stock: product.stock,
      tags: product.tags ?? [],
      isPublished: false,
    })),
    skipDuplicates: true,
  });

  revalidatePath('/admin');
  revalidatePath('/shop');
  return result.count;
}

export async function adminDeleteProduct(productId: string) {
  await requireSuperAdmin();
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath('/admin');
  revalidatePath('/shop');
}

