'use client';
import { User, ShieldCheck, Mail, Lock, Bell, Eye, EyeOff, Globe, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

type SettingsTab = 'general' | 'security' | 'notifications' | 'region' | 'billing';

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'general', icon: User, label: 'General Info' },
    { id: 'security', icon: ShieldCheck, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'region', icon: Globe, label: 'Language & Region' },
    { id: 'billing', icon: CreditCard, label: 'Billing Details' },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8 max-w-6xl">
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link href="/account" className="hover:text-foreground">Account</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Settings</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-display uppercase tracking-wider">ACCOUNT SETTINGS</h1>
          <p className="text-text-secondary mt-2">Manage your profile details, platform security, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Tabs Sidebar */}
          <aside className="md:col-span-4 space-y-2">
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-3 space-y-1 shadow-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-foreground font-bold shadow-lg shadow-primary/20'
                      : 'text-text-secondary hover:bg-surface-elevated hover:text-foreground'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Form Content */}
          <main className="md:col-span-8 space-y-8">
            {activeTab === 'general' && (
              <section className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl space-y-8">
                <h3 className="font-display text-xl uppercase tracking-wider">Public Profile</h3>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/60">
                  <div className="relative h-24 w-24 rounded-3xl overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/30">
                    <img src="https://i.pravatar.cc/150?u=5" className="w-full h-full object-cover" alt="Avatar" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                      <User className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-text-muted mt-2">JPG, WebP, or PNG. Maximum size 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Display Name</label>
                    <input type="text" defaultValue="Wonderous Boy" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">@</span>
                      <input type="text" defaultValue="wonderous_boy" className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Bio</label>
                  <textarea 
                    rows={4} 
                    defaultValue="Hardcore anime fan since 2012. Passionate figure collector, community builder, and convention enthusiast." 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors resize-none" 
                  />
                </div>
              </section>
            )}

            {activeTab === 'security' && (
              <section className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl space-y-8">
                <h3 className="font-display text-xl uppercase tracking-wider">Security & Password</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <input type="email" defaultValue="ansell.ok@example.com" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
                    </div>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold pt-1">
                      <ShieldCheck className="h-3 w-3" /> Email address verified
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-background border border-border rounded-xl pl-10 pr-12 py-3 text-sm focus:border-primary outline-none transition-colors" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'notifications' && (
              <section className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl space-y-6">
                <h3 className="font-display text-xl uppercase tracking-wider">Notification Preferences</h3>
                <div className="space-y-4 divide-y divide-border/60">
                  <div className="flex items-center justify-between pt-4 first:pt-0">
                    <div>
                      <p className="font-bold text-sm">Order Status Updates</p>
                      <p className="text-xs text-text-secondary">Get notified when your orders ship or are delivered.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle accent-primary h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="font-bold text-sm">Event Announcements</p>
                      <p className="text-xs text-text-secondary">Receive updates regarding conventions and meetup tickets.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle accent-primary h-5 w-5" />
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'region' && (
              <section className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl space-y-6">
                <h3 className="font-display text-xl uppercase tracking-wider">Language & Region</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Language</label>
                    <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none">
                      <option>English (US)</option>
                      <option>Japanese (日本語)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Currency</label>
                    <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none">
                      <option>NGN (₦)</option>
                      <option>USD ($)</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'billing' && (
              <section className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl space-y-6">
                <h3 className="font-display text-xl uppercase tracking-wider">Billing Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Street Address</label>
                    <input type="text" defaultValue="123 Anime Lane, Victoria Island" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" defaultValue="Lagos" className="bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                    <input type="text" defaultValue="Nigeria" className="bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                </div>
              </section>
            )}

            <div className="flex items-center justify-between pt-6">
              <button className="text-red-400 text-sm font-medium hover:underline">Deactivate Account</button>
              <div className="flex gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="px-8 shadow-lg shadow-primary/20">Save Changes</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}