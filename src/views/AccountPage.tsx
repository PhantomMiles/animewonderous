'use client';

import { User, Settings, ShoppingBag, Calendar, MessageSquare, CreditCard, LogOut, ShieldCheck, Mail, ChevronRight, Package, Trash2, ExternalLink, Plus, Heart, Sparkles, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useState, useTransition } from 'react';
import { cn } from '../lib/utils';
import { CldUploadWidget } from 'next-cloudinary';
import { updateUserProfile } from '../app/actions';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type AccountTab = 'overview' | 'orders' | 'events' | 'discussions' | 'settings';

type Props = {
  user: {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    image: string | null;
    banner: string | null;
    role: string;
    createdAt: string;
    forumPosts: Array<{
      id: string;
      title: string;
      category: string;
      createdAt: string;
      _count: { comments: number; likes: number };
    }>;
    communityMemberships: Array<{
      role: string;
      community: {
        id: string;
        name: string;
        avatar: string;
      };
    }>;
  };
  tickets: any[];
  orders: any[];
};

export default function AccountPage({ user, tickets, orders }: Props) {
  const [activeTab, setActiveTab] = useState<AccountTab>('overview');
  const [isPending, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [displayName, setDisplayName] = useState(user.name || user.username);
  const [currentImage, setCurrentImage] = useState(user.image || '/images/avatars/default.webp');
  const [currentBanner, setCurrentBanner] = useState(user.banner || null);
  const { update } = useSession();
  const router = useRouter();

  const presetAvatars = [
    '/images/avatars/default.webp',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Felix',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Jasper',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Mia',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Ryker'
  ];

  function showSuccess() {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  function handleSelectAvatar(url: string) {
    setCurrentImage(url);
    startTransition(async () => {
      await updateUserProfile({ image: url });
      await update({ image: url });
      router.refresh();
      showSuccess();
    });
  }

  function handleUploadAvatar(secureUrl: string) {
    setCurrentImage(secureUrl);
    startTransition(async () => {
      await updateUserProfile({ image: secureUrl });
      await update({ image: secureUrl });
      router.refresh();
      showSuccess();
    });
  }

  function handleUploadBanner(secureUrl: string) {
    setCurrentBanner(secureUrl);
    startTransition(async () => {
      await updateUserProfile({ banner: secureUrl });
      router.refresh();
      showSuccess();
    });
  }

  function handleSaveName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateUserProfile({ name: fd.get('name') as string });
      showSuccess();
    });
  }

  const navItems = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'orders', name: 'My Orders', icon: ShoppingBag },
    { id: 'events', name: 'Events & Tickets', icon: Calendar },
    { id: 'discussions', name: 'Discussions', icon: MessageSquare },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-surface/80 backdrop-blur-xl rounded-3xl border border-border/60 overflow-hidden shadow-2xl relative">
              <div 
                className={`h-56 relative overflow-hidden bg-cover bg-center ${!currentBanner ? 'bg-gradient-to-r from-primary/30 via-purple-600/20 to-blue-600/30' : ''}`}
              >
                {currentBanner && <img src={currentBanner} alt="Banner" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                {user.role === 'SUPERADMIN' && (
                  <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-primary flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> SUPER ADMIN
                  </div>
                )}
              </div>
              <div className="p-8 pt-0 -mt-20 relative">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left w-full md:w-auto">
                    <div className="h-36 w-36 rounded-3xl border-4 border-background bg-surface overflow-hidden shadow-2xl relative group ring-2 ring-primary/40 shrink-0">
                      <img 
                        src={currentImage} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt="Profile" 
                      />
                      <button 
                        onClick={() => setActiveTab('settings')} 
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      >
                        <Settings className="h-6 w-6 text-white" />
                      </button>
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <h2 className="text-3xl font-display font-bold">{user.name || user.username}</h2>
                        {user.role === 'SUPERADMIN' && <ShieldCheck className="h-6 w-6 text-primary fill-primary/20" />}
                      </div>
                      <p className="text-text-secondary text-sm">@{user.username}</p>
                      {user.email && <p className="text-text-muted text-xs mt-1 flex items-center gap-1.5"><Mail className="h-3 w-3" />{user.email}</p>}
                    </div>
                  </div>
                  <div className="pb-2 w-full md:w-auto flex justify-center">
                    <Button className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40" onClick={() => setActiveTab('settings')}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setActiveTab('orders')} className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 border border-border/80 hover:border-primary/50 transition-all hover:translate-y-[-2px] text-left group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Orders</p>
                    <p className="font-display font-bold text-xl">{orders.length} Total</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('events')} className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 border border-border/80 hover:border-blue-500/50 transition-all hover:translate-y-[-2px] text-left group">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Tickets</p>
                    <p className="font-display font-bold text-xl">{tickets.length} Purchased</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('discussions')} className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 border border-border/80 hover:border-purple-500/50 transition-all hover:translate-y-[-2px] text-left group">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Posts</p>
                    <p className="font-display font-bold text-xl">{user.forumPosts.length} Threads</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Community Memberships */}
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> My Communities
                </h3>
                {user.communityMemberships.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-text-muted text-sm">You haven't joined any communities yet.</p>
                    <Link href="/community">
                      <Button variant="outline" size="sm" className="mt-4">Browse Communities</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.communityMemberships.map(m => (
                      <Link key={m.community.id} href={`/community/${m.community.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-background/60 transition-colors group">
                        <img src={m.community.avatar} className="h-10 w-10 rounded-xl object-cover" alt={m.community.name} />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{m.community.name}</p>
                          <p className="text-[10px] text-text-muted uppercase tracking-wider">{m.role}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Info */}
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Account Info
                </h3>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-sm border-b border-border/40 pb-3">
                    <span className="text-text-secondary">Member Since</span>
                    <span className="font-semibold">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-border/40 pb-3">
                    <span className="text-text-secondary">Account Role</span>
                    <Badge variant={user.role === 'SUPERADMIN' ? 'primary' : 'outline'} className="text-[10px]">{user.role}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Username</span>
                    <span className="font-mono font-semibold text-primary">@{user.username}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden shadow-xl">
            <div className="p-8 border-b border-border/60 flex items-center justify-between">
              <h2 className="text-2xl font-display uppercase tracking-wider">My Orders</h2>
              <span className="text-xs text-text-muted">{orders.length} orders total</span>
            </div>
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingBag className="h-12 w-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary font-semibold">No orders yet</p>
                <Link href="/shop"><Button className="mt-4">Browse Shop</Button></Link>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {orders.map((order: any) => (
                  <div key={order.id} className="p-6 hover:bg-white/[0.02] transition-colors">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-bold">Order #{order.id.slice(-8).toUpperCase()}</h4>
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{order.status || 'Processing'}</Badge>
                        </div>
                        <p className="text-xs text-text-muted">{order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString()}</p>
                        <span className="text-primary font-bold text-lg">₦{order.totalAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-initial">Track <Package className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'events':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden shadow-xl">
            <div className="p-8 border-b border-border/60">
              <h2 className="text-2xl font-display uppercase tracking-wider">My Tickets</h2>
            </div>
            {tickets.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="h-12 w-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary font-semibold">No tickets purchased yet</p>
                <Link href="/events"><Button className="mt-4">Browse Events</Button></Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {tickets.map((ticket: any) => {
                  const event = ticket.orderItem?.event;
                  return (
                    <div key={ticket.id} className="bg-background/80 border border-border/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col justify-between">
                      {event?.image && (
                        <div className="aspect-video relative overflow-hidden">
                          <img src={event.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={event.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge className="mb-2">{ticket.orderItem?.ticketTier?.name}</Badge>
                            <h4 className="font-bold text-white text-lg line-clamp-1">{event.title}</h4>
                          </div>
                        </div>
                      )}
                      <div className="p-5 space-y-4">
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {event?.date}</span>
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Valid</Badge>
                        </div>
                        <p className="text-[10px] font-mono text-text-muted">Ticket: {ticket.uniqueCode}</p>
                        <Link href={`/events/${event?.id}`}>
                          <Button variant="secondary" className="w-full gap-2">View Event <ExternalLink className="h-4 w-4" /></Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'discussions':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden shadow-xl">
            <div className="p-8 border-b border-border/60">
              <h2 className="text-2xl font-display uppercase tracking-wider">My Discussions</h2>
            </div>
            {user.forumPosts.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary font-semibold">No posts yet</p>
                <Link href="/forum"><Button className="mt-4">Start a Discussion</Button></Link>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {user.forumPosts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                      <span className="text-[10px] text-text-muted">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors cursor-pointer">{post.title}</h4>
                    <div className="flex items-center gap-6 text-xs text-text-secondary">
                      <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5 text-primary" /> {post._count.comments} Replies</span>
                      <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-red-400" /> {post._count.likes} Likes</span>
                      <button className="ml-auto text-red-400/80 hover:text-red-400 transition-colors flex items-center gap-1 text-xs">
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
            <h2 className="text-2xl font-display uppercase tracking-wider mb-8">Account Settings</h2>
            {saveSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">Profile updated successfully!</div>
            )}
            <form className="space-y-6" onSubmit={handleSaveName}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Display Name</label>
                  <input name="name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Email Address</label>
                  <input type="email" defaultValue={user.email ?? ''} className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Username</label>
                  <input type="text" defaultValue={user.username} disabled className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none text-sm opacity-60 cursor-not-allowed" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/60">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Profile Picture</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {presetAvatars.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => handleSelectAvatar(url)}
                        className={`relative w-11 h-11 rounded-xl overflow-hidden transition-all duration-200 ${currentImage === url ? 'ring-2 ring-primary scale-110' : 'ring-1 ring-border opacity-70 hover:opacity-100'}`}
                      >
                        <img src={url} alt="Avatar" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <CldUploadWidget 
                    uploadPreset="animewonderous_preset"
                    onSuccess={(result: any) => handleUploadAvatar(result.info.secure_url)}
                  >
                    {({ open }) => (
                      <Button type="button" variant="outline" className="w-full" onClick={() => open()}>
                        Upload Custom Avatar
                      </Button>
                    )}
                  </CldUploadWidget>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Profile Banner</label>
                  <p className="text-xs text-text-muted">Add a custom banner to your profile page.</p>
                  <CldUploadWidget 
                    uploadPreset="animewonderous_preset"
                    onSuccess={(result: any) => handleUploadBanner(result.info.secure_url)}
                  >
                    {({ open }) => (
                      <Button type="button" variant="outline" className="w-full" onClick={() => open()}>
                        Upload Banner Image
                      </Button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              <div className="pt-6 flex gap-4 border-t border-border/60">
                <Button type="submit" className="px-8 shadow-lg shadow-primary/20" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
                <Button variant="outline" type="reset">Reset</Button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-surface/80 backdrop-blur-md rounded-3xl border border-border/60 p-4 space-y-1.5 shadow-xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AccountTab)}
                  className={cn(
                    "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all",
                    activeTab === item.id 
                      ? "bg-primary text-foreground font-bold shadow-lg shadow-primary/20" 
                      : "text-text-secondary hover:bg-surface-elevated hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.name}
                </button>
              ))}
              <div className="h-px bg-border/60 my-3"></div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 font-medium text-sm transition-all"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>

            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 text-center shadow-xl">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-sm mb-1">{user.role === 'SUPERADMIN' ? 'Super Admin' : 'Member'}</h4>
              <p className="text-xs text-text-secondary mb-4">Since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {renderContent()}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}