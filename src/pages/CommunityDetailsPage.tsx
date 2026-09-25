'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { COMMUNITIES, FORUM_POSTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Users, ShieldCheck, MessageSquare, Heart, Share2, Plus, Info, ChevronRight, Globe, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CommunityDetailsPage() {
  const { communityId } = useParams<{ communityId: string }>() || {};
  const community = COMMUNITIES.find(c => c.id === communityId) || COMMUNITIES[0];

  return (
    <>
    <Header />
    <div className="pb-20">
      {/* Banner */}  
      <div className="h-64 md:h-80 relative overflow-hidden">
        <img src={community.banner} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative -mt-20 flex flex-col md:flex-row items-end justify-between gap-6 pb-12 border-b border-border">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="h-40 w-40 rounded-3xl border-4 border-background bg-surface overflow-hidden shadow-2xl relative group">
              <img src={community.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-display">{community.name}</h1>
                {community.verified && <ShieldCheck className="h-6 w-6 text-primary fill-current" />}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {community.memberCount.toLocaleString()} Members</span>
                <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> Public Community</span>
                <div className="flex gap-2">
                  {community.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] py-0 px-2">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pb-2">
            <Button className="gap-2 px-8"><Plus className="h-4 w-4" /> Join Community</Button>
            <Button variant="outline" size="icon"><Share2 className="h-5 w-5" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12">
          {/* Main Content - Feed */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex gap-4">
                <img src="https://i.pravatar.cc/150?u=5" className="h-10 w-10 rounded-xl" />
                <button className="flex-1 bg-background border border-border rounded-xl px-4 text-left text-text-muted text-sm hover:border-primary/50 transition-colors">
                  Post something in {community.name}...
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl uppercase tracking-wider">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Sort: Newest</Button>
            </div>

            <div className="space-y-6">
              {FORUM_POSTS.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={post.author.avatar} className="h-10 w-10 rounded-xl" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{post.author.name}</span>
                      </div>
                      <span className="text-[10px] text-text-muted">{post.createdAt}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                    {post.body}
                  </p>
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                    <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                      <MessageSquare className="h-4 w-4" /> {post.replies}
                    </button>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-pink-500 transition-colors text-sm font-medium">
                      <Heart className="h-4 w-4" /> {post.likes}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h3 className="font-display text-lg mb-4 uppercase tracking-wider">About Community</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {community.description} Welcome to our dedicated space for all things {community.name}. Connect with fellow fans, share your creations, and stay updated with the latest news.
              </p>
              <div className="space-y-4 pt-6 border-t border-border">
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Founded</span>
                    <span className="text-foreground">Jan 2024</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Category</span>
                    <span className="text-foreground">Anime Series</span>
                 </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-8">
               <h3 className="font-display text-lg mb-6 uppercase tracking-wider">Rules</h3>
               <div className="space-y-4">
                  {[
                    "Be respectful to all members",
                    "No spoilers without tags",
                    "Keep discussions relevant",
                    "No self-promotion/spam"
                  ].map((rule, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                       <span className="text-primary font-bold">{i+1}.</span>
                       <span className="text-text-secondary">{rule}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
              <h3 className="font-bold text-primary mb-2">Want to lead?</h3>
              <p className="text-xs text-text-secondary mb-6">Apply to become a moderator and help shape the future of this community.</p>
              <Button size="sm" className="w-full">Apply Now</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
