'use client';

import { User, Settings, ShoppingBag, Calendar, MessageSquare, CreditCard, LogOut, ShieldCheck, Mail, MapPin, ChevronRight, Package, Trash2, ExternalLink, Plus, Heart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { PRODUCTS, EVENTS, FORUM_POSTS } from '../data/mockData';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type AccountTab = 'overview' | 'orders' | 'events' | 'discussions' | 'billing' | 'settings';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('overview');

  const navItems = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'orders', name: 'My Orders', icon: ShoppingBag },
    { id: 'events', name: 'Events Joined', icon: Calendar },
    { id: 'discussions', name: 'Discussions', icon: MessageSquare },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-surface/80 backdrop-blur-xl rounded-3xl border border-border/60 overflow-hidden shadow-2xl relative">
              <div className="h-56 bg-gradient-to-r from-primary/30 via-purple-600/20 to-blue-600/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-primary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> VIP MEMBER
                </div>
              </div>
              <div className="p-8 pt-0 -mt-20 relative">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left w-full md:w-auto">
                    <div className="h-36 w-36 rounded-3xl border-4 border-background bg-surface overflow-hidden shadow-2xl relative group ring-2 ring-primary/40 shrink-0">
                      <img src="https://i.pravatar.cc/150?u=5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Profile" />
                      <button onClick={() => setActiveTab('settings')} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs">
                        <Settings className="h-6 w-6 text-white" />
                      </button>
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <h2 className="text-3xl font-display font-bold">Wonderous Boy</h2>
                        <ShieldCheck className="h-6 w-6 text-primary fill-primary/20" />
                      </div>
                      <p className="text-text-secondary text-sm">@wonderous_boy • Anime Collector & Cosplayer</p>
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
                    <p className="font-display font-bold text-xl">24 Active</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('events')} className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 border border-border/80 hover:border-blue-500/50 transition-all hover:translate-y-[-2px] text-left group">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Events</p>
                    <p className="font-display font-bold text-xl">08 Attending</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('discussions')} className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 border border-border/80 hover:border-purple-500/50 transition-all hover:translate-y-[-2px] text-left group">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Posts</p>
                    <p className="font-display font-bold text-xl">142 Threads</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> About Me
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Hardcore anime fan since 2012. Passionate figure collector, community builder, and convention enthusiast. Always ready to discuss upcoming seasonal anime and manga theories!
                </p>
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Mail className="h-4 w-4 text-primary" /> ansell.ok@example.com
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin className="h-4 w-4 text-primary" /> Lagos, Nigeria
                  </div>
                </div>
              </div>

              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Badges & Achievements
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="primary" className="py-2 px-4 text-xs font-semibold">Top Contributor</Badge>
                  <Badge className="py-2 px-4 text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">Cosplay Champion</Badge>
                  <Badge className="py-2 px-4 text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">Figure Collector</Badge>
                  <Badge className="py-2 px-4 text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Early Supporter</Badge>
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
              <span className="text-xs text-text-muted">Showing 3 latest orders</span>
            </div>
            <div className="divide-y divide-border/60">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="h-24 w-24 rounded-2xl bg-background border border-border overflow-hidden shrink-0">
                      <img src={PRODUCTS[i-1].images[0]} className="w-full h-full object-cover" alt={PRODUCTS[i-1].name} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-bold text-lg">{PRODUCTS[i-1].name}</h4>
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Delivered</Badge>
                      </div>
                      <p className="text-xs text-text-muted">Order #AW-{10293 + i} • Placed Sept 1{i}, 2026</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-primary font-bold text-lg">₦{PRODUCTS[i-1].price.toLocaleString()}</span>
                        <span className="text-text-secondary text-xs bg-background px-2 py-1 rounded-md">Qty: 1</span>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-initial">Track Order <Package className="h-4 w-4" /></Button>
                      <Link href={`/orders/AW-${10293 + i}`} className="flex-1 md:flex-initial">
                        <Button variant="ghost" size="sm" className="w-full">Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden shadow-xl">
            <div className="p-8 border-b border-border/60">
              <h2 className="text-2xl font-display uppercase tracking-wider">Events Joined</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {EVENTS.map((event) => (
                <div key={event.id} className="bg-background/80 border border-border/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col justify-between">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={event.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={event.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2">{event.category}</Badge>
                      <h4 className="font-bold text-white text-lg line-clamp-1">{event.title}</h4>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {event.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> {event.location}</span>
                    </div>
                    <Link href={`/events/${event.id}`}>
                      <Button variant="secondary" className="w-full gap-2">View Event Pass <ExternalLink className="h-4 w-4" /></Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'discussions':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden shadow-xl">
            <div className="p-8 border-b border-border/60">
              <h2 className="text-2xl font-display uppercase tracking-wider">My Discussions</h2>
            </div>
            <div className="divide-y divide-border/60">
              {FORUM_POSTS.map((post) => (
                <div key={post.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                    <span className="text-[10px] text-text-muted">{post.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors cursor-pointer">{post.title}</h4>
                  <div className="flex items-center gap-6 text-xs text-text-secondary">
                    <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5 text-primary" /> {post.replies} Replies</span>
                    <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-red-400" /> {post.likes} Likes</span>
                    <button className="ml-auto text-red-400/80 hover:text-red-400 transition-colors flex items-center gap-1 text-xs">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-8">
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
              <h2 className="text-2xl font-display uppercase tracking-wider mb-8">Payment Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-primary/50 bg-gradient-to-br from-primary/10 via-background to-surface rounded-2xl p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute -right-12 -top-12 h-40 w-40 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="flex justify-between items-start mb-10">
                    <div className="h-10 w-14 bg-white/10 rounded-lg backdrop-blur-md border border-white/20"></div>
                    <span className="font-mono font-bold text-lg tracking-widest text-white">VISA</span>
                  </div>
                  <p className="font-mono text-xl tracking-wider mb-6 text-foreground">•••• •••• •••• 4242</p>
                  <div className="flex justify-between text-xs uppercase tracking-widest text-text-secondary">
                    <div>
                      <p className="text-[10px]">Card Holder</p>
                      <p className="text-white font-bold">Wonderous Boy</p>
                    </div>
                    <div>
                      <p className="text-[10px]">Expires</p>
                      <p className="text-white font-bold">12/28</p>
                    </div>
                  </div>
                </div>
                <button className="border-2 border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-surface-elevated/50 transition-all p-8 group">
                  <div className="h-12 w-12 rounded-full bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-sm">Add New Card</p>
                </button>
              </div>
            </div>

            <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
              <h2 className="text-2xl font-display uppercase tracking-wider mb-6">Transaction History</h2>
              <div className="space-y-4 divide-y divide-border/40">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between pt-4 first:pt-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Merchandise Purchase</p>
                        <p className="text-[10px] text-text-muted">Sept {10+i}, 2026 • Visa *4242</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">-₦{ (15000 * i).toLocaleString() }</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">Successful</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
            <h2 className="text-2xl font-display uppercase tracking-wider mb-8">Account Settings</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Display Name</label>
                  <input type="text" defaultValue="Wonderous Boy" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Email Address</label>
                  <input type="email" defaultValue="ansell.ok@example.com" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Username</label>
                  <input type="text" defaultValue="wonderous_boy" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Location</label>
                  <input type="text" defaultValue="Lagos, Nigeria" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Bio</label>
                <textarea 
                  rows={4} 
                  defaultValue="Hardcore anime fan since 2012. Passionate figure collector, community builder, and convention enthusiast." 
                  className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-primary transition-colors text-sm resize-none" 
                />
              </div>

              <div className="pt-6 flex gap-4 border-t border-border/60">
                <Button className="px-8 shadow-lg shadow-primary/20">Save Changes</Button>
                <Button variant="outline" type="button">Reset</Button>
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
              <button className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 font-medium text-sm transition-all">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>

            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 text-center shadow-xl">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-sm mb-1">Anime Pro Plus</h4>
              <p className="text-xs text-text-secondary mb-4">Active membership until Jan 2027</p>
              <Button variant="outline" size="sm" className="w-full text-xs">Manage Subscription</Button>
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