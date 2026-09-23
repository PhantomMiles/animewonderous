'use client';
import { FORUM_POSTS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MessageSquare, Heart, Share2, MoreHorizontal, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { NewDiscussionModal } from '../components/NewDiscussionModal';

export function ForumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display uppercase tracking-tight">Forums</h1>
          <p className="text-text-secondary mt-2">The hearth of AnimeWonderous. Join the discussion.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input type="text" placeholder="Search discussions..." className="bg-surface border border-border rounded-full pl-10 pr-4 py-2 text-sm w-64 outline-none" />
           </div>
           <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4" /> New Discussion
           </Button>
        </div>
      </div>

      <NewDiscussionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-8">
           <div>
              <h3 className="font-display text-lg mb-4 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1">
                 {['General', 'Announcements', 'Discussions', 'Q&A', 'Art & Media', 'Off-Topic'].map(cat => (
                   <button key={cat} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface hover:text-foreground transition-all flex items-center justify-between group">
                     {cat}
                     <span className="bg-surface-elevated text-text-muted px-2 py-0.5 rounded text-[10px] group-hover:bg-primary group-hover:text-foreground transition-colors">24</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-display text-lg mb-4 uppercase tracking-wider">Statistics</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Total Threads</span>
                    <span className="font-bold">12.5k</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Active Members</span>
                    <span className="font-bold">8.4k</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Global Posts</span>
                    <span className="font-bold">150.2k</span>
                 </div>
              </div>
           </div>
        </aside>

        {/* Discussions List */}
        <div className="lg:col-span-9 space-y-6">
           <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
              <Button variant="secondary" size="sm" className="rounded-full">Latest</Button>
              <Button variant="ghost" size="sm" className="rounded-full">Top</Button>
              <Button variant="ghost" size="sm" className="rounded-full">My Posts</Button>
              <Button variant="ghost" size="icon" className="ml-auto rounded-full"><Filter className="h-4 w-4" /></Button>
           </div>

           {FORUM_POSTS.map((post, index) => (
             <motion.div
               key={post.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="bg-surface rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors group cursor-pointer"
             >
               <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <img src={post.author.avatar} className="h-10 w-10 rounded-xl" />
                     <div>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-sm">{post.author.name}</span>
                           {post.author.verified && <Badge className="bg-blue-500/10 text-blue-400 border-blue-400/20 py-0 text-[8px]">PRO</Badge>}
                        </div>
                        <span className="text-[10px] text-text-muted">{post.createdAt} • in {post.category}</span>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
               </div>
               <h3 className="text-xl font-display mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
               <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                  {post.body}
               </p>
               <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                  <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                     <MessageSquare className="h-4 w-4" /> {post.replies} Replies
                  </button>
                  <button className="flex items-center gap-2 text-text-secondary hover:text-pink-500 transition-colors text-sm font-medium">
                     <Heart className="h-4 w-4" /> {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors text-sm font-medium">
                     <Share2 className="h-4 w-4" /> Share
                  </button>
               </div>
             </motion.div>
           ))}

           <Button variant="outline" className="w-full py-8 text-text-muted">Load More Discussions</Button>
        </div>
      </div>
    </div>
  );
}
