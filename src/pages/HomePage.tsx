'use client';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PRODUCTS, EVENTS, FORUM_POSTS } from '../data/mockData';
import { Star, ArrowRight, Play, Heart, Share2, Calendar, MapPin, MessageSquare, ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function HomePage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-image.jpg"
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="container relative mx-auto h-full px-4 flex flex-col justify-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-6xl lg:text-8xl font-display leading-[1.1] tracking-tight">
              MORE THAN <br />
              <span className="text-primary italic">JUST ANIME</span>
            </h1>
            <p className="text-text-secondary text-lg lg:text-xl max-w-lg leading-relaxed">
              Experience the ultimate destination for anime, gaming, and youth pop-culture. Join our vibrant community of creators, gamers, and enthusiasts today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="px-12">
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Quick Stats/Links like in design */}
        <div className="absolute bottom-12 right-4 lg:right-12 hidden lg:flex gap-6">
           <Link href="/shop" className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl border border-border flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold">Shop</p>
                <p className="text-text-secondary text-sm">Exclusive merchandise</p>
              </div>
           </Link>
           <Link href="/events" className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl border border-border flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold">Events</p>
                <p className="text-text-secondary text-sm">Join world tour</p>
              </div>
           </Link>
           <Link href="/forum" className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl border border-border flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold">Forum</p>
                <p className="text-text-secondary text-sm">Community talk</p>
              </div>
           </Link>
        </div>
      </section>

      {/* Monthly Spotlight - Refactored to match design */}
      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Spotlight Background"
          />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            {/* Left Column - Title */}
            <div className="flex-1 text-center lg:text-left z-10">
              <span className="text-primary font-bold tracking-[0.5em] uppercase text-sm mb-4 block">Monthly Spotlight</span>
              <h2 className="text-7xl lg:text-9xl font-display uppercase leading-none mb-6">
                SPIRITED <br /> AWAY
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Play className="h-4 w-4 fill-current" /> Watch Trailer
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  IMDB 8.6
                </Button>
              </div>
            </div>

            {/* Middle Column - Character Image */}
            <div className="flex-1 relative lg:-mx-20 z-0 lg:z-20">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="relative aspect-square max-w-7xl mx-auto"
               >
                  <img 
                    src="/spotlight-image.png" 
                    alt="Spirited Away Character"
                    className="w-full h-full object-contain relative z-10 scale-[3] lg:scale-[2.35]"
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] -z-10"></div>
               </motion.div>
            </div>

            {/* Right Column - Plot & CTA */}
            <div className="flex-1 z-10">
               <div className="max-w-md ml-auto text-center lg:text-left">
                  <p className="text-text-secondary text-lg leading-relaxed mb-8 border-l-4 border-primary pl-6 py-2">
                    Plot: Ten-year-old Chihiro moves with her parents to another city. Wanting to shorten the way to his new home, the father of the family turns onto a forest road that leads to a mysterious place.
                  </p>
                  <div className="bg-surface border border-border p-8 rounded-3xl space-y-4">
                     <h3 className="text-xl font-display uppercase tracking-wider">Be Part of the Story</h3>
                     <p className="text-sm text-text-secondary">
                        This month's spotlight was chosen by our community. Join the discussion and vote for next month's feature!
                     </p>
                     <Link href="/community" className="block">
                        <Button variant="secondary" className="w-full group">
                           Join Discussion <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </Link>
                  </div>
                  <p className="mt-8 text-sm font-bold uppercase tracking-widest text-text-muted">Director: Hayao Miyazaki</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Exclusive Merch Section */}
      <section className="container mx-auto px-4 py-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Shop Column */}
          <div className="lg:col-span-8 space-y-10">
             <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display uppercase tracking-widest">Shop Exclusive Merch</h2>
                  <Link href="/shop" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PRODUCTS.map((product) => (
                    <Link href={`/shop/${product.id}`} key={product.id} className="bg-surface rounded-xl p-4 border border-border group block">
                      <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-background">
                         <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="text-sm font-bold line-clamp-1 mb-1">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">{product.currency}{product.price.toLocaleString()}</span>
                        <div className="flex items-center gap-1 text-[10px] text-text-muted">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-foreground">{product.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
             </div>

             {/* Upcoming Events */}
             <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display uppercase tracking-widest">Upcoming Events</h2>
                  <Link href="/events" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    View Calendar <Calendar className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EVENTS.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id} className="flex gap-4 bg-surface p-4 rounded-xl border border-border group hover:border-primary/50 transition-colors">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <Badge className="mb-2">{event.category}</Badge>
                          <h3 className="font-bold text-sm line-clamp-1">{event.title}</h3>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                           <div className="flex items-center gap-2 text-xs text-text-secondary">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                           </div>
                           <span className="text-xs font-bold text-foreground">{event.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
             </div>
          </div>

          {/* Right Sidebar - Recent News & Videos */}
          <div className="lg:col-span-4 space-y-10">
             <div>
                <h2 className="text-xl font-display uppercase tracking-widest mb-6">Recent News</h2>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="w-20 h-20 bg-surface rounded-lg shrink-0 overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=200&sig=${i}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[10px] text-primary font-bold uppercase mb-1">Update</p>
                        <h4 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors">New Season Announcement: Starlite Chronicles returns...</h4>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div>
                <h2 className="text-xl font-display uppercase tracking-widest mb-6">Recent Videos</h2>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border group cursor-pointer">
                   <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-foreground fill-current ml-1" />
                      </div>
                   </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold">Anime Expo 2026 Recap</h4>
                  <p className="text-xs text-text-muted mt-1">12k views • 2 days ago</p>
                </div>
             </div>

             {/* Community Talk */}
             <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-display text-lg mb-4">COMMUNITY TALK</h3>
                <div className="space-y-4">
                  {FORUM_POSTS.slice(0, 2).map((post) => (
                    <div key={post.id} className="space-y-2 border-b border-border pb-4 last:border-0 last:pb-0">
                       <div className="flex items-center gap-2">
                          <img src={post.author.avatar} className="w-5 h-5 rounded-full" />
                          <span className="text-xs text-text-secondary">{post.author.name}</span>
                       </div>
                       <h4 className="text-sm font-bold hover:text-primary cursor-pointer transition-colors">{post.title}</h4>
                       <div className="flex items-center gap-3 text-[10px] text-text-muted">
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {post.replies}</span>
                          <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {post.likes}</span>
                       </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">Visit Forums</Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
