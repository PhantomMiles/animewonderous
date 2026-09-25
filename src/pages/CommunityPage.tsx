'use client';
import { COMMUNITIES } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Users, ShieldCheck, TrendingUp, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateCommunityModal } from '../components/CreateCommunityModal';

export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display uppercase tracking-tight">Communities</h1>
          <p className="text-text-secondary mt-2">Find your tribe and connect with like-minded fans.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" /> Create Community
        </Button>
      </div>

      <CreateCommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 space-y-10">
           {/* Featured Section */}
           <div className="relative rounded-3xl overflow-hidden aspect-[21/9]">
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-2xl">CK</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-display text-white">COSMOS KNIGHTS</h2>
                      <ShieldCheck className="h-5 w-5 text-blue-400 fill-current" />
                    </div>
                    <p className="text-text-secondary text-sm">Official Community • 2.4M Members</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="px-10">Join Community</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
           </div>

           {/* Discovery Grid */}
           <div>
              <h2 className="text-2xl font-display mb-8 uppercase tracking-widest">Discover Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COMMUNITIES.map((comm) => (
                  <Link href={`/community/${comm.id}`} key={comm.id} className="bg-surface rounded-2xl border border-border overflow-hidden group hover:border-primary/50 transition-colors block">
                     <div className="h-24 bg-surface-elevated relative">
                        <img src={comm.banner} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute -bottom-6 left-6 h-12 w-12 rounded-xl bg-background border-2 border-border overflow-hidden">
                           <img src={comm.avatar} className="w-full h-full object-cover" />
                        </div>
                     </div>
                     <div className="p-6 pt-10">
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-2">
                              <h3 className="font-bold">{comm.name}</h3>
                              {comm.verified && <ShieldCheck className="h-4 w-4 text-blue-400" />}
                           </div>
                           <span className="text-xs text-text-muted flex items-center gap-1">
                              <Users className="h-3 w-3" /> {(comm.memberCount / 1000).toFixed(1)}k
                           </span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-6">
                           {comm.description}
                        </p>
                        <div className="flex items-center justify-between">
                           <div className="flex gap-2">
                              {comm.tags.map(tag => (
                                <Badge key={tag} className="text-[10px]">{tag}</Badge>
                              ))}
                           </div>
                           <Button size="sm" variant="outline">Join</Button>
                        </div>
                     </div>
                  </Link>
                ))}
              </div>
           </div>
        </main>

        <aside className="lg:col-span-4 space-y-10">
           <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-display uppercase tracking-wider">Trending Now</h3>
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="text-text-muted font-bold text-lg italic w-4">#0{i}</div>
                       <div>
                          <p className="font-bold text-sm group-hover:text-primary transition-colors">AnimeExpo2026</p>
                          <p className="text-[10px] text-text-muted">12.5k posts today</p>
                       </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-sm">See Full Leaderboard</Button>
           </div>

           <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-display uppercase tracking-wider mb-6">Top Moderators</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-10 h-10 rounded-xl" />
                    <div>
                      <p className="font-bold text-sm">ModName_0{i}</p>
                      <p className="text-[10px] text-text-secondary">Community Guard • Level {10-i}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
