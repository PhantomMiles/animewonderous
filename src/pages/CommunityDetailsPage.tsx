'use client';

import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Users, ShieldCheck, MessageSquare, Heart, Share2, Plus, Globe, Filter, BarChart2, Pencil } from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NewDiscussionModal } from '../components/NewDiscussionModal';
import { ManageMembersModal } from '../components/ManageMembersModal';
import { EditCommunityModal } from '../components/EditCommunityModal';
import { useState, useTransition } from 'react';
import { joinCommunity, leaveCommunity } from '../app/actions';

type Props = {
  community: any;
  posts: any[];
  userRole: string | null;
};

const ROLE_LABELS: Record<string, { label: string; className: string }> = {
  ADMIN: { label: 'Admin', className: 'bg-primary/20 text-primary border-primary/30' },
  MODERATOR: { label: 'Mod', className: 'bg-blue-500/20 text-blue-400 border-blue-400/30' },
  MEMBER: { label: 'Member', className: 'bg-surface-elevated text-text-secondary border-border' },
};

export default function CommunityDetailsPage({ community, posts, userRole }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleJoin = () => {
    startTransition(async () => {
      await joinCommunity(community.id);
    });
  };

  const handleLeave = () => {
    if (confirm('Are you sure you want to leave this community?')) {
      startTransition(async () => {
        await leaveCommunity(community.id);
      });
    }
  };

  const hasBanner = community.banner && !community.banner.startsWith('https://images.unsplash');

  return (
    <>
    <Header />
    <div className="pb-20">
      {/* Banner */}
      <div className={`h-64 md:h-80 relative overflow-hidden ${hasBanner ? '' : 'bg-gradient-to-r from-primary/30 via-purple-600/20 to-blue-600/30'}`}>
        {hasBanner && <img src={community.banner} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative -mt-20 flex flex-col md:flex-row items-end justify-between gap-6 pb-12 border-b border-border">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="h-40 w-40 rounded-3xl border-4 border-background bg-surface overflow-hidden shadow-2xl relative group">
              <img src={community.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-display">{community.name}</h1>
                {community.verified && <ShieldCheck className="h-6 w-6 text-primary fill-current" />}
                {userRole === 'ADMIN' && (
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="p-2 rounded-full bg-surface border border-border hover:border-primary/50 text-text-secondary hover:text-primary transition-all"
                    title="Edit Community"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {community.memberCount.toLocaleString()} Members</span>
                <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> Public Community</span>
                <div className="flex gap-2">
                  {community.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] py-0 px-2">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pb-2">
            {!userRole ? (
              <Button onClick={handleJoin} disabled={isPending} className="gap-2 px-8">
                <Plus className="h-4 w-4" /> {isPending ? 'Joining...' : 'Join Community'}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleLeave} 
                disabled={isPending || userRole === 'ADMIN'}
                className="gap-2 px-8 group hover:border-red-500 hover:text-red-500 transition-colors"
              >
                <span className="group-hover:hidden">Joined ({userRole})</span>
                <span className="hidden group-hover:block">{userRole === 'ADMIN' ? 'Owner Cannot Leave' : 'Leave Community'}</span>
              </Button>
            )}
            <Button variant="outline" size="icon"><Share2 className="h-5 w-5" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-8">
            {userRole && (
              <div className="bg-surface rounded-2xl border border-border p-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 bg-background border border-border rounded-xl px-4 text-left text-text-muted text-sm hover:border-primary/50 transition-colors"
                  >
                    Post something in {community.name}...
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl uppercase tracking-wider">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Sort: Newest</Button>
            </div>

            <div className="space-y-6">
              {posts.map((post: any, index: number) => (
                <Link key={post.id} href={`/forum/${post.id}`} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img src={post.author?.image || "https://i.pravatar.cc/150"} className="h-10 w-10 rounded-xl" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{post.author?.username}</span>
                        </div>
                        <span className="text-[10px] text-text-muted">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-display mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                      {post.type === 'POLL' && <BarChart2 className="h-5 w-5 text-primary" />}
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                      {post.body}
                    </p>
                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                      <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                        <MessageSquare className="h-4 w-4" /> {post._count?.comments || 0}
                      </button>
                      <button className="flex items-center gap-2 text-text-secondary hover:text-pink-500 transition-colors text-sm font-medium">
                        <Heart className="h-4 w-4" /> {post._count?.likes || 0}
                      </button>
                      <button className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors text-sm font-medium">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </Link>
              ))}
              {posts.length === 0 && (
                <div className="text-center py-16 text-text-muted">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No posts yet. Be the first to post!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* About */}
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h3 className="font-display text-lg mb-4 uppercase tracking-wider">About Community</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {community.description}
              </p>
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Founded</span>
                  <span className="text-foreground">{new Date(community.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Members</span>
                  <span className="text-foreground">{community.memberCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Rules */}
            {community.rules?.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-8">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider">Rules</h3>
                <div className="space-y-4">
                  {community.rules.map((rule: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                      <span className="text-text-secondary">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members */}
            {community.members?.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-8">
                <h3 className="font-display text-lg mb-6 uppercase tracking-wider">Members</h3>
                <div className="space-y-4">
                  {community.members.slice(0, 6).map((m: any) => {
                    const roleInfo = ROLE_LABELS[m.role] || ROLE_LABELS.MEMBER;
                    return (
                      <div key={m.id} className="flex items-center gap-3">
                        <img 
                          src={m.user?.image || '/images/avatars/default.webp'} 
                          className="w-9 h-9 rounded-xl object-cover" 
                          alt={m.user?.username}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{m.user?.username}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleInfo.className}`}>
                          {roleInfo.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Admin Tools */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
              {userRole === 'ADMIN' ? (
                <>
                  <h3 className="font-bold text-primary mb-2">Admin Tools</h3>
                  <p className="text-xs text-text-secondary mb-6">Manage roles and members in your community.</p>
                  <div className="space-y-3">
                    <Button size="sm" className="w-full" onClick={() => setIsManageMembersOpen(true)}>Manage Members</Button>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => setIsEditOpen(true)}>Edit Community</Button>
                  </div>
                </>
              ) : userRole === 'MODERATOR' ? (
                <>
                  <h3 className="font-bold text-primary mb-2">Mod Tools</h3>
                  <p className="text-xs text-text-secondary mb-6">You have moderator privileges in this community.</p>
                  <Button size="sm" className="w-full" onClick={() => setIsManageMembersOpen(true)}>Manage Members</Button>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-primary mb-2">Want to lead?</h3>
                  <p className="text-xs text-text-secondary mb-6">Apply to become a moderator and help shape the future of this community.</p>
                  <Button size="sm" className="w-full">Apply Now</Button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
    <NewDiscussionModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      communityId={community.id}
    />
    <ManageMembersModal 
      isOpen={isManageMembersOpen}
      onClose={() => setIsManageMembersOpen(false)}
      communityId={community.id}
      members={community.members || []}
    />
    <EditCommunityModal
      isOpen={isEditOpen}
      onClose={() => setIsEditOpen(false)}
      community={community}
    />
    <Footer />
    </>
  );
}
