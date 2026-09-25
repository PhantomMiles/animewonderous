'use client';
import { User, ShieldCheck, Mail, Lock, Bell, Eye, EyeOff, Globe, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

export default function AccountSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-display">ACCOUNT SETTINGS</h1>
          <p className="text-text-secondary mt-2">Manage your profile, security, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Tabs Sidebar */}
          <aside className="md:col-span-4 space-y-2">
            {[
              { icon: User, label: 'General Info', active: true },
              { icon: ShieldCheck, label: 'Security' },
              { icon: Bell, label: 'Notifications' },
              { icon: Globe, label: 'Language & Region' },
              { icon: CreditCard, label: 'Billing Details' },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-medium transition-all ${
                  item.active ? 'bg-surface border border-primary/20 text-primary' : 'text-text-secondary hover:bg-surface/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </aside>

          {/* Form Content */}
          <main className="md:col-span-8 space-y-10">
            <section className="bg-surface rounded-3xl border border-border p-8">
              <h3 className="font-display text-xl mb-8 uppercase tracking-wider">Public Profile</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-border">
                   <div className="relative h-24 w-24 rounded-3xl overflow-hidden border-4 border-background shadow-xl">
                      <img src="https://i.pravatar.cc/150?u=5" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                         <User className="h-6 w-6 text-foreground" />
                      </div>
                   </div>
                   <div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <p className="text-xs text-text-muted mt-2">JPG, GIF or PNG. Max size of 800K</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    defaultValue="Hardcore anime fan since 2012. I love collecting figures and attending expos." 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors resize-none" 
                  />
                </div>
              </div>
            </section>

            <section className="bg-surface rounded-3xl border border-border p-8">
              <h3 className="font-display text-xl mb-8 uppercase tracking-wider">Email Settings</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                       <input type="email" defaultValue="ansell.ok@example.com" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
                    </div>
                    <p className="text-[10px] text-green-500 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> This email is verified</p>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">New Password</label>
                    <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                       <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-background border border-border rounded-xl pl-10 pr-12 py-3 text-sm focus:border-primary outline-none transition-colors" />
                       <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                       </button>
                    </div>
                 </div>
              </div>
            </section>

            <div className="flex items-center justify-between pt-6">
               <button className="text-red-400 text-sm font-medium hover:underline">Deactivate my account</button>
               <div className="flex gap-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="px-10">Save Changes</Button>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
