'use client';

import { useState, useTransition } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Users, ShoppingBag, Box, Activity, X, Pencil, Trash2, Plus, Ban, CheckCircle2, ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  adminSetUserBan,
  adminSetCommunityBan,
  adminUpdateDeliveryStatus,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from '../app/admin/actions';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

type Tab = 'overview' | 'users' | 'orders' | 'products' | 'communities';

const DELIVERY_STATUSES = ['PROCESSING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'RETURNED'];
const DELIVERY_COLORS: Record<string, string> = {
  PROCESSING: 'bg-yellow-500/20 text-yellow-400',
  DISPATCHED: 'bg-blue-500/20 text-blue-400',
  IN_TRANSIT: 'bg-purple-500/20 text-purple-400',
  DELIVERED: 'bg-green-500/20 text-green-400',
  RETURNED: 'bg-red-500/20 text-red-400',
};

type Props = {
  data: {
    users: any[];
    orders: any[];
    products: any[];
    communities: any[];
    stats: {
      totalRevenue: number;
      totalUsers: number;
      totalOrders: number;
    };
  };
};

// ─── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
}: {
  product?: any;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [uploadedImages, setUploadedImages] = useState<string[]>(product?.images ?? []);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('images', uploadedImages.join(','));
    startTransition(async () => {
      if (product) {
        await adminUpdateProduct(product.id, fd);
      } else {
        await adminCreateProduct(fd);
      }
      router.refresh();
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-display uppercase">{product ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-elevated text-text-secondary"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase text-text-secondary">Product Name</label>
              <input name="name" defaultValue={product?.name} required className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-text-secondary">Category</label>
              <input name="category" defaultValue={product?.category} required className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-text-secondary">Price (₦)</label>
              <input name="price" type="number" defaultValue={product?.price} required className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-text-secondary">Stock</label>
              <input name="stock" type="number" defaultValue={product?.stock ?? 0} required className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-text-secondary">Tags (comma-separated)</label>
              <input name="tags" defaultValue={product?.tags?.join(', ')} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase text-text-secondary">Description</label>
              <textarea name="description" defaultValue={product?.description} rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors resize-none" />
            </div>
            {/* Image Upload */}
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase text-text-secondary">Product Images</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {uploadedImages.map((url, i) => (
                  <div key={i} className="relative h-16 w-16 rounded-xl overflow-hidden border border-border group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setUploadedImages(imgs => imgs.filter((_, idx) => idx !== i))}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <CldUploadWidget uploadPreset="animewonderous_preset" onSuccess={(r: any) => setUploadedImages(imgs => [...imgs, r.info.secure_url])}>
                {({ open }) => (
                  <button type="button" onClick={() => open()} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                    <ImageIcon className="h-4 w-4" /> Upload Image
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : product ? 'Save Changes' : 'Add Product'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard({ data }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [productModal, setProductModal] = useState<{ open: boolean; product?: any }>({ open: false });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navItems = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'products', name: 'Products', icon: Box },
    { id: 'communities', name: 'Communities', icon: Users },
  ];

  function handleBanUser(userId: string, banned: boolean) {
    startTransition(async () => {
      await adminSetUserBan(userId, banned);
      router.refresh();
    });
  }

  function handleBanCommunity(communityId: string, banned: boolean) {
    startTransition(async () => {
      await adminSetCommunityBan(communityId, banned);
      router.refresh();
    });
  }

  function handleDeleteProduct(productId: string) {
    if (!confirm('Are you sure you want to permanently delete this product?')) return;
    startTransition(async () => {
      await adminDeleteProduct(productId);
      router.refresh();
    });
  }

  function handleDeliveryStatus(orderId: string, status: string) {
    startTransition(async () => {
      await adminUpdateDeliveryStatus(orderId, status);
      router.refresh();
    });
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-display uppercase tracking-tight">SuperAdmin Panel</h1>
          <p className="text-text-secondary mt-2">Manage the platform, monitor activity, and configure settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-2xl p-3 sticky top-24">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as Tab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                        activeTab === item.id
                          ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20'
                          : 'text-text-secondary hover:bg-surface-elevated hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-10">

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Revenue', value: `₦${data.stats.totalRevenue.toLocaleString()}`, color: 'text-green-400', bg: 'bg-green-500/10', icon: ShoppingBag },
                    { label: 'Registered Users', value: data.stats.totalUsers.toLocaleString(), color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Users },
                    { label: 'Total Orders', value: data.stats.totalOrders.toLocaleString(), color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Box },
                  ].map(stat => (
                    <div key={stat.label} className="bg-surface rounded-2xl border border-border p-6 flex items-start justify-between">
                      <div>
                        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-display">{stat.value}</h3>
                      </div>
                      <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-surface rounded-2xl border border-border p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider border-b border-border pb-4 mb-4 text-text-secondary">Recent Orders</h3>
                  <div className="space-y-3">
                    {data.orders.slice(0, 6).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/50">
                        <div>
                          <p className="font-bold text-sm font-mono">{order.reference}</p>
                          <p className="text-xs text-text-muted">{order.customerEmail}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={DELIVERY_COLORS[order.deliveryStatus] || 'bg-surface-elevated text-text-secondary'}>{order.deliveryStatus}</Badge>
                          <span className="font-bold text-sm">₦{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── USERS ── */}
            {activeTab === 'users' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-display uppercase tracking-widest">Users</h2>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface-elevated text-text-secondary text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                          <th className="p-4">User</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Joined</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {data.users.map((u) => (
                          <tr key={u.id} className={`hover:bg-white/[0.02] transition-colors ${u.banned ? 'opacity-60' : ''}`}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={u.image || '/images/avatars/default.webp'} alt="" className="h-8 w-8 rounded-full object-cover border border-border" />
                                <span className="font-bold">{u.username}</span>
                              </div>
                            </td>
                            <td className="p-4 text-text-secondary">{u.email || '-'}</td>
                            <td className="p-4">
                              <Badge className={u.role === 'SUPERADMIN' ? 'bg-blue-500/20 text-blue-400' : 'bg-surface-elevated text-text-secondary'}>
                                {u.role}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge className={u.banned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                                {u.banned ? 'Banned' : 'Active'}
                              </Badge>
                            </td>
                            <td className="p-4 text-text-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                              {u.role !== 'SUPERADMIN' && (
                                <Button
                                  variant={u.banned ? 'outline' : 'ghost'}
                                  size="sm"
                                  disabled={isPending}
                                  onClick={() => handleBanUser(u.id, !u.banned)}
                                  className={u.banned ? 'text-green-400 border-green-400/20 hover:bg-green-500/10' : 'text-red-400 hover:bg-red-500/10'}
                                >
                                  {u.banned ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Unban</> : <><Ban className="h-3.5 w-3.5 mr-1" />Ban</>}
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-display uppercase tracking-widest">Orders</h2>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-surface-elevated text-text-secondary text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                          <th className="p-4">Reference</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Payment</th>
                          <th className="p-4">Delivery Status</th>
                          <th className="p-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {data.orders.map((o) => (
                          <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 font-mono text-xs">{o.reference}</td>
                            <td className="p-4 text-text-secondary">{o.customerEmail}</td>
                            <td className="p-4 font-bold">₦{o.total.toLocaleString()}</td>
                            <td className="p-4">
                              <Badge className={o.status === 'PAID' ? 'bg-green-500/20 text-green-400' : o.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}>
                                {o.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <select
                                value={o.deliveryStatus}
                                disabled={isPending}
                                onChange={e => handleDeliveryStatus(o.id, e.target.value)}
                                className="bg-surface-elevated border border-border rounded-lg px-2 py-1.5 text-xs font-medium outline-none focus:border-primary/60 transition-colors cursor-pointer"
                              >
                                {DELIVERY_STATUSES.map(s => (
                                  <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                ))}
                              </select>
                            </td>
                            <td className="p-4 text-text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── PRODUCTS ── */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display uppercase tracking-widest">Products</h2>
                  <Button size="sm" className="gap-2" onClick={() => setProductModal({ open: true })}>
                    <Plus className="h-4 w-4" /> Add Product
                  </Button>
                </div>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-surface-elevated text-text-secondary text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                          <th className="p-4">Product</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Stock</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {data.products.map((p) => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={p.images[0] || '/aa.png'} alt="" className="h-10 w-10 rounded-lg object-cover border border-border" />
                                <span className="font-bold">{p.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-text-secondary">{p.category}</td>
                            <td className="p-4 font-bold">₦{p.price.toLocaleString()}</td>
                            <td className="p-4">
                              <Badge className={p.stock > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
                                {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-text-muted hover:text-primary"
                                  onClick={() => setProductModal({ open: true, product: p })}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-text-muted hover:text-red-400"
                                  disabled={isPending}
                                  onClick={() => handleDeleteProduct(p.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── COMMUNITIES ── */}
            {activeTab === 'communities' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-display uppercase tracking-widest">Communities</h2>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface-elevated text-text-secondary text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                          <th className="p-4">Community</th>
                          <th className="p-4">Members</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Created</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {data.communities.map((c) => (
                          <tr key={c.id} className={`hover:bg-white/[0.02] transition-colors ${c.banned ? 'opacity-60' : ''}`}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={c.avatar} alt="" className="h-10 w-10 rounded-xl object-cover border border-border" />
                                <div>
                                  <p className="font-bold">{c.name}</p>
                                  <p className="text-xs text-text-muted line-clamp-1 max-w-[200px]">{c.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-text-secondary">{c._count?.members || 0}</td>
                            <td className="p-4">
                              <Badge className={c.banned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                                {c.banned ? 'Banned' : 'Active'}
                              </Badge>
                            </td>
                            <td className="p-4 text-text-muted">{new Date(c.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant={c.banned ? 'outline' : 'ghost'}
                                size="sm"
                                disabled={isPending}
                                onClick={() => handleBanCommunity(c.id, !c.banned)}
                                className={c.banned ? 'text-green-400 border-green-400/20 hover:bg-green-500/10' : 'text-red-400 hover:bg-red-500/10'}
                              >
                                {c.banned ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Unban</> : <><Ban className="h-3.5 w-3.5 mr-1" />Ban</>}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Modal */}
      {productModal.open && (
        <ProductModal
          product={productModal.product}
          onClose={() => setProductModal({ open: false })}
        />
      )}

      <Footer />
    </>
  );
}
