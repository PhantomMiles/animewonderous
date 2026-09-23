import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F12B2B]/20 bg-[#050608]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(241,43,43,0.1)]">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
          <Image src="/aa.png" alt="Animewonderous" width={100} height={100} />
            <div className="hidden flex-col md:flex">
              <span className="text-lg font-bold leading-none tracking-tight text-white">
                ANIMEWONDEROUS
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#AAB4C0]">
                ANIME • GAMING • COMMUNITY
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <Link href="/" className="text-[#F12B2B] underline decoration-2 underline-offset-8">
            Home
          </Link>
          <Link href="/shop" className="text-[#F5F7FA] transition-colors hover:text-[#FF7A00]">
            Shop
          </Link>
          <Link href="/watch" className="text-[#F5F7FA] transition-colors hover:text-[#1687FF]">
            Watch
          </Link>
          <Link href="/coden" className="text-[#F5F7FA] transition-colors hover:text-[#F12B2B]">
            CODEN
          </Link>
          <Link href="/shibuya" className="text-[#F5F7FA] transition-colors hover:text-[#FF7A00]">
            Shibuya Fest
          </Link>
          <Link href="/community" className="text-[#F5F7FA] transition-colors hover:text-[#18C978]">
            Community
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-[#F5F7FA] transition-colors hover:text-[#FF7A00]">
            <Search className="h-5 w-5" />
          </button>
          
          <button aria-label="Cart" className="relative text-[#F5F7FA] transition-colors hover:text-[#FF7A00]">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#18C978] text-[10px] font-bold text-[#050608]">
              3
            </span>
          </button>
          
          <button aria-label="Account" className="hidden text-[#F5F7FA] transition-colors hover:text-[#FF7A00] sm:block">
            <User className="h-5 w-5" />
          </button>

          <Link
            href="/auth/join"
            className="hidden items-center justify-center rounded-md bg-[#18C978] px-4 py-2 text-sm font-semibold text-[#050608] transition-colors hover:bg-[#0F9F5B] sm:inline-flex"
          >
            Join / Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
