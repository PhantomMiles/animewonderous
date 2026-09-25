'use client';
import { EVENTS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Calendar as CalendarIcon, MapPin, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function EventsPage() {
  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-display">EVENTS</h1>
        <p className="text-text-secondary mt-2">Join thousands of fans at the biggest anime events worldwide.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Calendar Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
           <div className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg">OCTOBER 2026</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-text-muted mb-4">
                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      i === 13 ? 'bg-primary text-foreground shadow-lg shadow-primary/20' : 'hover:bg-surface-elevated text-text-secondary'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="font-display text-lg uppercase tracking-wider">Filters</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-border bg-surface flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary"></div>
                  </div>
                  <span className="text-sm text-text-secondary">Conferences</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="w-5 h-5 rounded border border-border bg-surface group-hover:border-primary transition-colors"></div>
                   <span className="text-sm text-text-secondary">Cosplay Parades</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="w-5 h-5 rounded border border-border bg-surface group-hover:border-primary transition-colors"></div>
                   <span className="text-sm text-text-secondary">Workshops</span>
                </label>
              </div>
           </div>
        </aside>

        {/* Events List */}
        <div className="lg:col-span-8 space-y-6">
          {EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface rounded-2xl border border-border overflow-hidden flex flex-col md:flex-row hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="primary">{event.category}</Badge>
                    <span className="text-primary font-bold">{event.price === 0 ? 'FREE' : `₦${event.price.toLocaleString()}`}</span>
                  </div>
                  <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{event.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </div>
                  <Button size="sm" className="ml-auto">Get Tickets</Button>
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
