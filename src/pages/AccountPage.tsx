'use client';

import { User, Settings, ShoppingBag, Calendar, MessageSquare, CreditCard, LogOut, ShieldCheck, Mail, MapPin, ChevronRight, Package, Trash2, ExternalLink, Plus, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { PRODUCTS, EVENTS, FORUM_POSTS } from '../data/mockData';
import Link from 'next/link';

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
          <>
            <div className="bg-surface rounded-2xl border border-border overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="p-8 pt-0 -mt-16 relative">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-end gap-6">
                    <div className="h-32 w-32 rounded-3xl border-4 border-background bg-surface overflow-hidden shadow-2xl relative group">
                      <img src="https://i.pravatar.cc/150?u=5" className="w-full h-full object-cover" alt="Profile" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-3xl font-display">Wonderous Boy</h2>
                        <ShieldCheck className="h-6 w-6 text-blue-400 fill-current" />
                      </div>
                      <p className="text-text-secondary text-sm">@wonderous_boy • Anime Enthusiast & Collector</p>
                    </div>
                  </div>
                  <div className="pb-2">
                    <Button className="gap-2" onClick={() => setActiveTab('settings')}>Edit Profile</Button>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => setActiveTab('orders')} className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors text-left">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Orders</p>
                    <p className="font-bold">24</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('events')} className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors text-left">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Events</p>
                    <p className="font-bold">08</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('discussions')} className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors text-left">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Posts</p>
                    <p className="font-bold">142</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface rounded-2xl border border-border p-8">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider">About Me</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Hardcore anime fan since 2012. I love collecting figures and attending expos. Currently watching the latest season of Starlite Chronicles. Always down for a discussion about subs vs dubs!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Mail className="h-4 w-4 text-primary" /> ansell.ok@example.com
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin className="h-4 w-4 text-primary" /> Lagos, Nigeria
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-2xl border border-border p-8">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider">Achievements</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="primary" className="py-1 px-3">Top Contributor</Badge>
                  <Badge className="py-1 px-3">Cosplay King</Badge>
                  <Badge className="py-1 px-3">Figure Hunter</Badge>
                  <Badge className="py-1 px-3">Early Adopter</Badge>
                </div>
              </div>
            </div>
          </>
        );
      case 'orders':
        return (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="p-8 border-b border-border">
              <h2 className="text-2xl font-display uppercase tracking-wider">My Orders</h2>
            </div>
            <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-24 w-24 rounded-xl bg-background border border-border overflow-hidden shrink-0">
                      <img src={PRODUCTS[i-1].images[0]} className="w-full h-full object-cover" alt={PRODUCTS[i-1].name} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg">{PRODUCTS[i-1].name}</h4>
                        <Badge className="bg-green-500/10 text-green-400 border-green-400/20">Delivered</Badge>
                      </div>
                      <p className="text-xs text-text-muted">Order #AW-{10293 + i} • Placed on Sept 1{i}, 2026</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-primary font-bold">₦{PRODUCTS[i-1].price.toLocaleString()}</span>
                        <span className="text-text-secondary text-xs">Qty: 1</span>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2">
                      <Button variant="outline" size="sm" className="gap-2">Track Order <Package className="h-4 w-4" /></Button>
                      <Link href={`/orders/AW-${10293 + i}`}>
                        <Button variant="ghost" size="sm">Details</Button>
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
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="p-8 border-b border-border">
              <h2 className="text-2xl font-display uppercase tracking-wider">Events Joined</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {EVENTS.map((event) => (
                <div key={event.id} className="bg-background border border-border rounded-2xl overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={event.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={event.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2">{event.category}</Badge>
                      <h4 className="font-bold text-white">{event.title}</h4>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                    </div>
                    <Button variant="secondary" className="w-full gap-2">View Ticket <ExternalLink className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'discussions':
        return (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="p-8 border-b border-border">
              <h2 className="text-2xl font-display uppercase tracking-wider">My Discussions</h2>
            </div>
            <div className="divide-y divide-border">
              {FORUM_POSTS.map((post) => (
                <div key={post.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                    <span className="text-[10px] text-text-muted">{post.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer">{post.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {post.replies} Replies</span>
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {post.likes} Likes</span>
                    <button className="ml-auto text-red-400 hover:text-red-300 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-8">
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-display uppercase tracking-wider mb-8">Payment Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-primary bg-primary/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 h-40 w-40 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="flex justify-between items-start mb-12">
                    <div className="h-10 w-14 bg-white/10 rounded-md backdrop-blur-md"></div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa Logo" />
                  </div>
                  <p className="font-mono text-xl mb-4">**** **** **** 4242</p>
                  <div className="flex justify-between text-xs uppercase tracking-widest text-text-secondary">
                    <div>
                      <p>Card Holder</p>
                      <p className="text-white font-bold">Wonderous Boy</p>
                    </div>
                    <div>
                      <p>Expires</p>
                      <p className="text-white font-bold">12/28</p>
                    </div>
                  </div>
                </div>
                <button className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-surface-elevated transition-all p-8">
                  <div className="h-12 w-12 rounded-full bg-surface-elevated flex items-center justify-center">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-sm">Add New Card</p>
                </button>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-display uppercase tracking-wider mb-8">Transaction History</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-text-secondary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Merchandise Purchase</p>
                        <p className="text-[10px] text-text-muted">Sept {10+i}, 2026 • Visa *4242</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">-₦{ (5000 * i).toLocaleString() }</p>
                      <p className="text-[10px] text-green-400">Success</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-surface rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-display uppercase tracking-wider mb-8">Account Settings</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                  <input type="text" defaultValue="Wonderous Boy" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
                  <input type="email" defaultValue="ansell.ok@example.com" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Username</label>
                  <input type="text" defaultValue="wonderous_boy" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Location</label>
                  <input type="text" defaultValue="Lagos, Nigeria" className="w-full h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Bio</label>
                <textarea 
                  rows={4} 
                  defaultValue="Hardcore anime fan since 2012. I love collecting figures and attending expos." 
                  className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-primary/50 transition-colors resize-none" 
                />
              </div>

              <div className="pt-4 flex gap-4 border-t border-border">
                <Button className="px-8">Save Changes</Button>
                <Button variant="outline" type="button">Reset</Button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-surface rounded-2xl border border-border p-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AccountTab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
                  activeTab === item.id 
                    ? "bg-primary text-white" 
                    : "text-text-secondary hover:bg-surface-elevated hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" /> {item.name}
              </button>
            ))}
            <div className="h-px bg-border my-4"></div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 font-medium text-sm transition-all">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-bold mb-2">Anime Pro Plus</h4>
            <p className="text-xs text-text-secondary mb-4">You have active subscription until Jan 2027</p>
            <Button variant="outline" size="sm" className="w-full">Manage Plan</Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
