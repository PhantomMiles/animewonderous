'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EVENTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar, MapPin, Share2, Heart, Users, ShieldCheck, ChevronRight, Clock, Info } from 'lucide-react';

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>() || {};
  const event = EVENTS.find(e => e.id === eventId) || EVENTS[0];

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/events" className="hover:text-foreground">Events</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{event.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                 <Badge variant="primary" className="py-2 px-4 text-sm">{event.category}</Badge>
              </div>
           </div>

           <div>
              <h1 className="text-5xl font-display mb-6">{event.title}</h1>
              <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-border">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center text-primary">
                       <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-[10px] text-text-muted uppercase font-bold">Date</p>
                       <p className="text-sm font-bold">{event.date}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center text-primary">
                       <Clock className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-[10px] text-text-muted uppercase font-bold">Time</p>
                       <p className="text-sm font-bold">10:00 AM - 08:00 PM</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center text-primary">
                       <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-[10px] text-text-muted uppercase font-bold">Location</p>
                       <p className="text-sm font-bold">{event.location}</p>
                    </div>
                 </div>
              </div>

              <div className="prose prose-invert max-w-none">
                 <h3 className="font-display text-2xl mb-4">About This Event</h3>
                 <p className="text-text-secondary leading-relaxed text-lg">
                    {event.description} This event brings together thousands of enthusiasts from around the world to celebrate the best of anime culture. Experience exclusive screenings, meet your favorite voice actors, and explore a massive dealer's room filled with rare merchandise.
                 </p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 list-none p-0">
                    <li className="flex items-center gap-3 bg-surface p-4 rounded-2xl border border-border">
                       <ShieldCheck className="h-5 w-5 text-green-500" />
                       <span className="text-sm">Official Merchandise Shop</span>
                    </li>
                    <li className="flex items-center gap-3 bg-surface p-4 rounded-2xl border border-border">
                       <ShieldCheck className="h-5 w-5 text-green-500" />
                       <span className="text-sm">Cosplay Competition</span>
                    </li>
                    <li className="flex items-center gap-3 bg-surface p-4 rounded-2xl border border-border">
                       <ShieldCheck className="h-5 w-5 text-green-500" />
                       <span className="text-sm">Guest Q&A Panels</span>
                    </li>
                    <li className="flex items-center gap-3 bg-surface p-4 rounded-2xl border border-border">
                       <ShieldCheck className="h-5 w-5 text-green-500" />
                       <span className="text-sm">Exclusive Preview Screenings</span>
                    </li>
                 </ul>
              </div>
           </div>

           {/* Location Map Placeholder */}
           <div className="bg-surface rounded-3xl border border-border p-8">
              <h3 className="font-display text-xl mb-6">Location & Directions</h3>
              <div className="aspect-[21/9] bg-background rounded-2xl relative overflow-hidden mb-6">
                 <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200" className="w-full h-full object-cover opacity-30" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary animate-bounce" />
                 </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                 <div>
                    <p className="font-bold mb-1">{event.location}</p>
                    <p className="text-sm text-text-secondary">Tokyo Big Sight, Ariake, Koto City, Tokyo 135-0063, Japan</p>
                 </div>
                 <Button variant="outline">Open in Maps</Button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-surface rounded-3xl border border-border p-8 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                 <span className="text-sm text-text-secondary font-bold">TICKET PRICE</span>
                 <span className="text-3xl font-display text-primary">₦{event.price.toLocaleString()}</span>
              </div>
              <div className="space-y-4 mb-8">
                 <div className="p-4 rounded-xl bg-background border border-border flex items-center justify-between">
                    <span className="text-sm">General Admission</span>
                    <span className="font-bold">x1</span>
                 </div>
              </div>
              <Button className="w-full py-6 text-lg mb-4">Book Now</Button>
              <div className="flex gap-2">
                 <Button variant="outline" className="flex-1 gap-2"><Heart className="h-4 w-4" /> Save</Button>
                 <Button variant="outline" className="flex-1 gap-2"><Share2 className="h-4 w-4" /> Share</Button>
              </div>
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                 <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Users className="h-5 w-5 text-primary" />
                    <span>8.2k people are attending</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Info className="h-5 w-5 text-primary" />
                    <span>Refunds available up to 7 days before</span>
                 </div>
              </div>
           </div>

           <div className="bg-surface rounded-3xl border border-border p-8">
              <h3 className="font-display text-lg mb-6">ORGANIZED BY</h3>
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-foreground font-bold">AV</div>
                 <div>
                    <p className="font-bold">AnimeVibe Official</p>
                    <p className="text-xs text-text-secondary">Verified Organizer</p>
                 </div>
                 <Button variant="ghost" size="sm" className="ml-auto">Follow</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
