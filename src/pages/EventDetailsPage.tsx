'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Calendar,
  MapPin,
  Share2,
  Heart,
  Users,
  ShieldCheck,
  ChevronRight,
  Clock,
  GraduationCap,
  CheckCircle2,
  Ticket,
  Loader2,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type TicketTier = {
  id: string;
  title: string;
  theme: string;
  capacity: string;
  groupSize: number;
  price: number;
  perks: string[];
};

type UniversityHub = {
  id: string;
  name: string;
  location: string;
  role: string;
};

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  description: string;
  hasUniversityHubs: boolean;
  ticketTiers: TicketTier[];
  universityHubs: UniversityHub[];
};

type Props = { event: Event };

export default function EventDetailsPage({ event }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const isCoden = event.hasUniversityHubs;
  const ticketTiers = event.ticketTiers;

  const [selectedTierId, setSelectedTierId] = useState(ticketTiers[0]?.id ?? '');
  const [ticketQty, setTicketQty] = useState(1);

  const selectedTier = ticketTiers.find((t) => t.id === selectedTierId) ?? ticketTiers[0];
  const totalAmount = (selectedTier?.price ?? 0) * ticketQty;

  function handleBookClick() {
    if (!showEmailInput) {
      setShowEmailInput(true);
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch('/api/paystack/initialize-ticket', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            tierId: selectedTier.id,
            quantity: ticketQty,
            eventId: event.id,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? 'Could not start payment.');
          return;
        }
        router.push(data.authorization_url);
      } catch {
        setError('Network error. Please try again.');
      }
    });
  }

  return (
    <>
      <Header />
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
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/80 shadow-2xl group">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <Badge
                  variant="primary"
                  className="py-2 px-4 text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-primary/90"
                >
                  {event.category}
                </Badge>
              </div>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-display mb-6 uppercase tracking-wide leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-surface/80 border border-border flex items-center justify-center text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase font-bold">Date</p>
                    <p className="text-sm font-bold">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-surface/80 border border-border flex items-center justify-center text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase font-bold">Time</p>
                    <p className="text-sm font-bold">10:00 AM - 08:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-surface/80 border border-border flex items-center justify-center text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase font-bold">Location</p>
                    <p className="text-sm font-bold">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none space-y-6">
                <h3 className="font-display text-2xl uppercase tracking-wider">About This Event</h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  {event.description} Experience stage competitions, esports battles, voice acting
                  panels, cosplay showcases, and exclusive pop-culture merchandise booths in Enugu.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 bg-surface/80 p-4 rounded-2xl border border-border/60">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold">Official Merchandise Booths</span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface/80 p-4 rounded-2xl border border-border/60">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold">
                      {isCoden ? 'Esports Tournament Stage' : 'Cosplay Grand Prix Showcase'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface/80 p-4 rounded-2xl border border-border/60">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold">
                      {isCoden ? 'Console & PC Free-Play LAN' : 'Voice Acting & Guest Panels'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface/80 p-4 rounded-2xl border border-border/60">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold">
                      {isCoden ? 'Inter-University Championship' : 'Community Gaming Free-Play'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Participating Enugu Universities Section - only for events with university hubs */}
            {isCoden && event.universityHubs.length > 0 && (
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl uppercase tracking-wider">
                    Participating Universities in Enugu
                  </h3>
                </div>
                <p className="text-xs text-text-secondary mb-6">
                  CODEN August 2027 will take place across these major tertiary campus venues in Enugu State:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.universityHubs.map((uni) => (
                    <div
                      key={uni.id}
                      className="p-4 rounded-2xl bg-background/80 border border-border/60 flex flex-col justify-between space-y-2"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {uni.role}
                        </span>
                        <h4 className="font-bold text-sm text-foreground mt-1">{uni.name}</h4>
                      </div>
                      <p className="text-xs text-text-secondary flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        {uni.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ticket Tier Selection Section */}
            {ticketTiers.length > 0 && (
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <Ticket className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl uppercase tracking-wider">
                    {isCoden
                      ? 'COD Operator Pass Options (Solo to Squad of 10)'
                      : 'Anime-Themed Pass Options (Solo to Group of 10)'}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary">
                  {isCoden
                    ? 'Select your Call of Duty loadout pass tier, from a lone recruit ticket up to a 10-person command pass.'
                    : 'Select your power level pass tier, from a lone adventurer ticket up to a full 10-person guild legion pass.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ticketTiers.map((tier) => {
                    const isSelected = selectedTierId === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-primary/10 border-primary shadow-lg ring-1 ring-primary'
                            : 'bg-background/80 border-border/60 hover:border-border'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/20 px-2 py-0.5 rounded uppercase">
                              {tier.theme}
                            </span>
                            <span className="text-base font-display font-bold text-foreground">
                              ₦{tier.price.toLocaleString()}
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-foreground mb-1">{tier.title}</h4>
                          <p className="text-xs text-text-muted mb-3 font-medium">
                            Capacity: {tier.capacity}
                          </p>

                          <ul className="space-y-1.5 border-t border-border/40 pt-3">
                            {tier.perks.map((perk, i) => (
                              <li key={i} className="text-xs text-text-secondary flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Ticket Checkout Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 sticky top-24 shadow-2xl">
              <span className="text-xs text-text-secondary font-bold uppercase tracking-wider block mb-1">
                Selected Pass Summary
              </span>
              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                {selectedTier?.title}
              </h3>
              <p className="text-xs text-primary font-semibold mb-6">
                Theme: {selectedTier?.theme} ({selectedTier?.capacity})
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-background/80 border border-border/60 flex items-center justify-between">
                  <span className="text-xs font-semibold">Pass Price</span>
                  <span className="font-bold text-sm text-foreground">
                    ₦{(selectedTier?.price ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-background/80 border border-border/60 flex items-center justify-between">
                  <span className="text-xs font-semibold">Pass Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTicketQty(Math.max(1, ticketQty - 1))}
                      className="h-6 w-6 rounded bg-surface border border-border font-bold text-xs flex items-center justify-center hover:bg-surface-elevated"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold">{ticketQty}</span>
                    <button
                      onClick={() => setTicketQty(ticketQty + 1)}
                      className="h-6 w-6 rounded bg-surface border border-border font-bold text-xs flex items-center justify-center hover:bg-surface-elevated"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Total Amount</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    ₦{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Email input — shown after first click */}
              {showEmailInput && (
                <div className="mb-4 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Email for ticket delivery
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 bg-background border border-border rounded-xl px-4 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              )}

              {error && (
                <p className="text-red-400 text-xs mb-3 font-medium">{error}</p>
              )}

              <Button
                className="w-full py-6 text-base font-bold shadow-lg shadow-primary/20 mb-4"
                onClick={handleBookClick}
                disabled={isPending || !selectedTier}
              >
                {isPending ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Processing...</span>
                ) : showEmailInput ? (
                  `Pay ₦${totalAmount.toLocaleString()}`
                ) : (
                  `Book ${selectedTier?.title ?? 'Pass'}`
                )}
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Heart className="h-4 w-4" /> Save
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border/60 space-y-4">
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    {isCoden
                      ? 'Enugu esports delegates and campus squads attending'
                      : 'Enugu anime and cosplay delegates attending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}