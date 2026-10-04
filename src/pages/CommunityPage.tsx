'use client';

import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShieldCheck, TrendingUp, Plus, ChevronRight, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CreateCommunityModal } from '../components/CreateCommunityModal';

type Props = {
  initialCommunities: any[];
  trendingPosts: any[];
};

export default function CommunityPage({ initialCommunities, trendingPosts }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the most popular community as featured if available
  const featured = initialCommunities[0];

  return (
    <>
    <Header />
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
           {/* Featured Community */}
           {featured && (
             <Link href={`/community/${featured.id}`} className="block">
               <div className="relative rounded-3xl overflow-hidden aspect-[21/9] group cursor-pointer">
                 <div className={`w-full h-full bg-gradient-to-r from-primary/50 via-purple-600/30 to-blue-600/40`} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-white/20 bg-surface">
                       <img src={featured.avatar} className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <div className="flex items-center gap-2">
                         <h2 className="text-2xl font-display text-white uppercase">{featured.name}</h2>
                         {featured.verified && <ShieldCheck className="h-5 w-5 text-blue-400 fill-current" />}
                       </div>
                       <p className="text-gray-300 text-sm">{featured.memberCount.toLocaleString()} Members</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <Button className="px-10 group-hover:bg-primary/90">View Community</Button>
                   </div>
                 </div>
               </div>
             </Link>
           )}

           {/* Discovery Grid */}
           <div>
              <h2 className="text-2xl font-display mb-8 uppercase tracking-widest">Discover Communities</h2>
              {initialCommunities.length === 0 ? (
                <div className="text-center py-16 text-text-muted bg-surface rounded-2xl border border-border">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="mb-6">No communities yet. Be the first to create one!</p>
                  <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Create Community
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {initialCommunities.map((comm) => (
                    <Link href={`/community/${comm.id}`} key={comm.id} className="bg-surface rounded-2xl border border-border overflow-hidden group hover:border-primary/50 transition-colors block">
                       <div className="h-24 bg-gradient-to-r from-primary/30 via-purple-600/20 to-blue-600/30 relative">
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
                          </div>
                          <p className="text-sm text-text-secondary line-clamp-2 mb-6">
                             {comm.description}
                          </p>
                          <div className="flex items-center justify-between">
                             <div className="flex gap-2 flex-wrap">
                                {comm.tags.slice(0, 2).map((tag: string) => (
                                  <Badge key={tag} className="text-[10px]">{tag}</Badge>
                                ))}
                             </div>
                             <Button size="sm" variant="outline">Join</Button>
                          </div>
                       </div>
                    </Link>
                  ))}
                </div>
              )}
           </div>
        </main>

        <aside className="lg:col-span-4 space-y-10">
           {/* Trending Posts */}
           <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-display uppercase tracking-wider">Trending Now</h3>
              </div>
              {trendingPosts.length > 0 ? (
                <div className="space-y-6">
                  {trendingPosts.map((post, i) => (
                    <Link href={`/forum/${post.id}`} key={post.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="text-text-muted font-bold text-lg italic w-4">#{i + 1}</div>
                         <div>
                            <p className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{post.title}</p>
                            <p className="text-[10px] text-text-muted">{post._count?.likes || 0} likes · {post.category}</p>
                         </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-sm text-center py-4">No trending posts yet</p>
              )}
           </div>

           {/* Community Stats */}
           <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-display uppercase tracking-wider mb-6">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Communities</span>
                  <span className="font-bold">{initialCommunities.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Active Discussions</span>
                  <span className="font-bold">{trendingPosts.length > 0 ? '🔥 Live' : 'Quiet'}</span>
                </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
    <Footer />
    </>
  );
}
