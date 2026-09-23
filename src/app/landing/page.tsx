import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Play, Trophy, Ticket, Heart, Calendar, MapPin, User } from "lucide-react";
import { featuredMerch } from "@/lib/merch";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 md:pt-32 min-h-[700px] flex items-center bg-[#050608]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at top right, #F12B2B33 0%, transparent 600px), 
                  radial-gradient(circle at bottom left, #FF7A001A 0%, transparent 600px),
                  linear-gradient(to bottom, #050608E6, #050608E6),
                  url('/slider.jpg')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', 
                backgroundBlendMode: 'screen, screen, normal, normal' 
              }}
            >
              <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="max-w-3xl">
                  <h1 className="text-5xl font-black italic tracking-tighter text-white sm:text-7xl md:text-8xl">
                    MORE THAN<br />JUST <span className="text-[#F12B2B]">FANDOM.</span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg text-[#F5F7FA] sm:text-xl">
                    Anime merch. COD tournaments. Anime streaming. And the biggest anime fest in Enugu.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link 
                href="/shop" 
                className="group flex h-14 items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-8 text-base font-bold text-[#050608] transition-all hover:bg-[#D95F00]"
              >
                Explore Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="flex h-14 items-center justify-center gap-2 rounded-lg border border-[#26303A] bg-[#0B0F14]/50 px-8 text-base font-bold text-white transition-all hover:bg-[#26303A]">
                <Play className="h-5 w-5" />
                Watch Trailer
              </button>
            </div>
            
            {/* Quick Action Tiles */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link href="/shop" className="flex items-center gap-3 rounded-xl border border-[#26303A] bg-[#0B0F14] p-4 transition-colors hover:border-[#18C978] hover:bg-[#111820]">
                <ShoppingCart className="h-5 w-5 text-[#18C978]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#AAB4C0]">SHOP</span>
                  <span className="text-sm font-semibold text-white">Anime Merch</span>
                </div>
              </Link>
              <Link href="/watch" className="flex items-center gap-3 rounded-xl border border-[#26303A] bg-[#0B0F14] p-4 transition-colors hover:border-[#1687FF] hover:bg-[#111820]">
                <Play className="h-5 w-5 text-[#1687FF]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#AAB4C0]">WATCH</span>
                  <span className="text-sm font-semibold text-white">Anime Online</span>
                </div>
              </Link>
              <Link href="/coden" className="flex items-center gap-3 rounded-xl border border-[#26303A] bg-[#0B0F14] p-4 transition-colors hover:border-[#F12B2B] hover:bg-[#111820]">
                <Trophy className="h-5 w-5 text-[#F12B2B]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#AAB4C0]">COMPETE</span>
                  <span className="text-sm font-semibold text-white">CODEN</span>
                </div>
              </Link>
              <Link href="/shibuya" className="flex items-center gap-3 rounded-xl border border-[#26303A] bg-[#0B0F14] p-4 transition-colors hover:border-[#FF7A00] hover:bg-[#111820]">
                <Ticket className="h-5 w-5 text-[#FF7A00]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#AAB4C0]">JOIN</span>
                  <span className="text-sm font-semibold text-white">Shibuya Fest</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Merch Card */}
          <div 
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#18C978]/40 bg-[#0B0F14] p-6 transition-all duration-300 hover:border-[#18C978] hover:shadow-[0_0_25px_rgba(24,201,120,0.2)]"
            style={{
              backgroundImage: `linear-gradient(to top, #0B0F14 25%, rgba(11, 15, 20, 0.65) 60%, rgba(11, 15, 20, 0.2)), url('/merch-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <ShoppingCart className="h-7 w-7 text-[#18C978]" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide text-white">Anime Merch</h3>
                <p className="mt-2 text-sm text-[#AAB4C0]">Figures, apparel, accessories and more from your favourite anime worlds.</p>
              </div>
            </div>
            <Link href="/shop" className="relative z-10 mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#18C978] px-6 text-sm font-bold text-[#050608] transition-colors hover:bg-[#15b069]">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Streaming Card */}
          <div 
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#1687FF]/40 bg-[#0B0F14] p-6 transition-all duration-300 hover:border-[#1687FF] hover:shadow-[0_0_25px_rgba(22,135,255,0.2)]"
            style={{
              backgroundImage: `linear-gradient(to top, #0B0F14 25%, rgba(11, 15, 20, 0.65) 60%, rgba(11, 15, 20, 0.2)), url('/watch-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <Play className="h-7 w-7 text-[#1687FF]" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide text-white">Anime Streaming</h3>
                <p className="mt-2 text-sm text-[#AAB4C0]">Watch your favourite anime anytime, anywhere. No limits.</p>
              </div>
            </div>
            <Link href="/watch" className="relative z-10 mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-[#1687FF] bg-transparent px-6 text-sm font-bold text-[#1687FF] transition-colors hover:bg-[#1687FF]/10">
              Start Watching <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* CODEN Card */}
          <div 
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#F12B2B]/40 bg-[#0B0F14] p-6 transition-all duration-300 hover:border-[#F12B2B] hover:shadow-[0_0_25px_rgba(241,43,43,0.2)]"
            style={{
              backgroundImage: `linear-gradient(to top, #0B0F14 25%, rgba(11, 15, 20, 0.65) 60%, rgba(11, 15, 20, 0.2)), url('/coden-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <Trophy className="h-7 w-7 text-[#F12B2B]" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide text-white">CODEN</h3>
                <span className="text-[10px] font-bold tracking-widest text-[#F12B2B]">CALL OF DUTY ENUGU</span>
                <p className="mt-2 text-sm text-[#AAB4C0]">Battle. Compete. Win. The ultimate COD tournament in Enugu.</p>
              </div>
            </div>
            <Link href="/coden" className="relative z-10 mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#F12B2B] px-6 text-sm font-bold text-white transition-colors hover:bg-[#D02222]">
              Register Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Shibuya Fest Card */}
          <div 
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#FF7A00]/40 bg-[#0B0F14] p-6 transition-all duration-300 hover:border-[#FF7A00] hover:shadow-[0_0_25px_rgba(255,122,0,0.2)]"
            style={{
              backgroundImage: `linear-gradient(to top, #0B0F14 25%, rgba(11, 15, 20, 0.65) 60%, rgba(11, 15, 20, 0.2)), url('/shibuya-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <Ticket className="h-7 w-7 text-[#FF7A00]" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide text-white">Shibuya Fest</h3>
                <p className="mt-2 text-sm text-[#AAB4C0]">Enugu&apos;s ultimate anime, gaming, cosplay & youth pop-culture festival.</p>
              </div>
            </div>
            <Link href="/shibuya" className="relative z-10 mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-6 text-sm font-bold text-[#050608] transition-colors hover:bg-[#D95F00]">
              Get Tickets <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between border-l-4 border-[#18C978] pl-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Anime Merch</h2>
            <p className="text-sm text-[#AAB4C0]">Authentic. Exclusive. For Real Fans.</p>
          </div>
          <Link href="/shop" className="hidden items-center gap-2 text-sm font-bold text-[#18C978] hover:underline sm:flex">
            View All Merch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {featuredMerch.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[#26303A] bg-[#0B0F14] transition-colors hover:border-[#18C978]/50"
            >
              <button 
                type="button" 
                className="absolute right-3 top-3 z-10 rounded-full bg-[#050608]/50 p-2 text-[#AAB4C0] backdrop-blur-sm transition-colors hover:text-[#F12B2B]"
              >
                <Heart className="h-4 w-4" />
              </button>

              <div className="relative aspect-square w-full overflow-hidden bg-[#111820]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="mt-1 text-lg font-bold text-[#18C978]">{item.price}</p>
                </div>
                <button 
                  type="button" 
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF7A00] py-2 text-sm font-bold text-[#050608] opacity-100 transition-colors hover:bg-[#D95F00] lg:opacity-0 lg:group-hover:opacity-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* CODEN Countdown */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#F12B2B]/30 bg-[#0B0F14] p-6 lg:col-span-1">
            <div className="relative z-10">
              <h3 className="text-2xl font-black italic tracking-wide text-white">CODEN</h3>
              <span className="text-[10px] font-bold tracking-widest text-[#F12B2B]">CALL OF DUTY ENUGU</span>
              
              <div className="mt-8">
                <p className="text-sm font-bold text-[#AAB4C0]">Next Tournament</p>
                <div className="mt-2 flex gap-4 text-center">
                  <div className="flex flex-col rounded-lg bg-[#111820] p-3">
                    <span className="text-2xl font-bold text-white">12</span>
                    <span className="text-[10px] text-[#AAB4C0]">Days</span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-[#111820] p-3">
                    <span className="text-2xl font-bold text-white">08</span>
                    <span className="text-[10px] text-[#AAB4C0]">Hours</span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-[#111820] p-3">
                    <span className="text-2xl font-bold text-white">34</span>
                    <span className="text-[10px] text-[#AAB4C0]">Minutes</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <Link href="/coden/register" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-6 text-sm font-bold text-[#050608] hover:bg-[#D95F00]">
                Register Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/coden" className="text-sm text-[#AAB4C0] hover:text-white underline underline-offset-4">
                View Details
              </Link>
            </div>
          </div>

          {/* Shibuya Fest */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#FF7A00]/30 bg-[#0B0F14] p-6 lg:col-span-1">
            <div className="relative z-10 border-l-4 border-[#FF7A00] pl-4">
              <h3 className="text-2xl font-bold tracking-wide text-white">SHIBUYA FEST 3.0</h3>
              <span className="text-[10px] font-bold tracking-widest text-[#FF7A00]">ANIME • GAMING • COSPLAY • MUSIC</span>
            </div>
            
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-white">
                <Calendar className="h-5 w-5 text-[#18C978]" />
                <span className="font-semibold">15 NOV 2026</span>
              </div>
              <div className="flex items-center gap-3 text-[#AAB4C0]">
                <MapPin className="h-5 w-5" />
                <span>Enugu, Nigeria</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/shibuya/tickets" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-6 text-sm font-bold text-[#050608] hover:bg-[#D95F00]">
                Get Tickets <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/shibuya" className="text-sm text-[#AAB4C0] hover:text-white underline underline-offset-4">
                View Event Details
              </Link>
            </div>
          </div>

          {/* Watch Anime */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1687FF]/30 bg-[#0B0F14] p-6 lg:col-span-1">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-wide text-white">WATCH ANIME</h3>
              <p className="mt-2 text-sm text-[#AAB4C0]">Thousands of episodes. Endless worlds.</p>
            </div>
            
            <div className="mt-8">
              <Link href="/watch" className="flex w-fit h-12 items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-6 text-sm font-bold text-[#050608] hover:bg-[#D95F00]">
                Start Watching <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* Community Banner */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#26303A] bg-[#0B0F14] p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#18C978]/5 to-transparent" />
          
          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-md border-l-4 border-[#18C978] pl-4">
              <h3 className="text-2xl font-bold text-white">Join the Animewonderous Community</h3>
              <p className="mt-2 text-sm text-[#AAB4C0]">Get the latest updates, exclusive drops, event news, and be part of something bigger.</p>
              
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="h-12 w-full rounded-lg border border-[#26303A] bg-[#050608] px-4 text-sm text-white placeholder:text-[#687482] focus:border-[#FF7A00] focus:outline-none"
                />
                <button className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#FF7A00] px-6 text-sm font-bold text-[#050608] hover:bg-[#D95F00]">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 text-sm text-[#AAB4C0]">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-[#18C978]" />
                <span>Exclusive Drops</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#18C978]" />
                <span>Event Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#18C978]" />
                <span>Community Access</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-[#18C978]" />
                <span>Special Offers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
