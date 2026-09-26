'use client';

import Link from 'next/link';
import { EVENTS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function EventsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-display uppercase tracking-wider">EVENTS & MEETUPS</h1>
          <p className="text-text-secondary mt-2">
            Join thousands of anime & gaming enthusiasts at premier gatherings in Enugu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-base uppercase tracking-wider">OCTOBER 2026</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-text-muted mb-3">
                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      i === 13
                        ? 'bg-primary text-foreground font-bold shadow-lg shadow-primary/30'
                        : 'hover:bg-surface-elevated text-text-secondary'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl space-y-6">
              <h3 className="font-display text-base uppercase tracking-wider">Filter Events</h3>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search events by title..."
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-md border border-border bg-background flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-2.5 h-2.5 rounded-xs bg-primary"></div>
                  </div>
                  <span className="text-xs text-text-secondary font-medium">Anime Conventions</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-md border border-border bg-background group-hover:border-primary transition-colors"></div>
                  <span className="text-xs text-text-secondary font-medium">Esports & Inter-Varsity</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Events List */}
          <div className="lg:col-span-8 space-y-6">
            {EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden flex flex-col md:flex-row hover:border-primary/50 transition-all shadow-xl group"
              >
                <div className="md:w-64 h-52 md:h-auto overflow-hidden shrink-0 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 md:hidden">
                    <Badge variant="primary">{event.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="hidden md:flex items-center justify-between mb-3">
                      <Badge variant="primary">{event.category}</Badge>
                      <span className="text-primary font-bold font-display text-lg">
                        From ₦{event.price.toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-display group-hover:text-primary transition-colors mb-2 uppercase tracking-wide">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-text-secondary">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {event.location}
                      </span>
                    </div>
                    <Link href={`/events/${event.id}`}>
                      <Button size="sm" className="gap-2 shadow-md shadow-primary/20">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}