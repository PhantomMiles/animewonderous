'use client';

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faTiktok, 
  faDiscord 
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border bg-card/40 backdrop-blur-md">
      {/* Top subtle primary color accent line */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" 
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 lg:gap-12">
          
          {/* Brand & Social Column */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50">
                <Image 
                  src="/aa.png" 
                  alt="AnimeWonderous Emblem" 
                  width={200} 
                  height={200} 
                  className="object-cover" 
                />
              </div>
              <div className="font-display text-xl font-bold tracking-wider">
                <span className="text-primary">ANIME</span>
                <span className="text-foreground">WONDEROUS</span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              More than just fandom. Your gateway to exclusive anime merch, Call of Duty tournaments, streaming, and the biggest anime festival in Enugu.
            </p>

            {/* Social Media Links with Font Awesome */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(255,122,0,0.3)]"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(255,122,0,0.3)]"
              >
                <FontAwesomeIcon icon={faTwitter} className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(255,122,0,0.3)]"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(255,122,0,0.3)]"
              >
                <FontAwesomeIcon icon={faTiktok} className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(255,122,0,0.3)]"
              >
                <FontAwesomeIcon icon={faDiscord} className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-foreground">
              Explore
            </p>
            <ul className="flex flex-col gap-2.5 text-muted-foreground">
              <li>
                <Link href="/shop" className="transition-colors hover:text-primary">
                  Merch Shop
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition-colors hover:text-primary">
                  Anime Fests & Events
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="transition-colors hover:text-primary">
                  COD Tournaments
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-foreground">
              Community
            </p>
            <ul className="flex flex-col gap-2.5 text-muted-foreground">
              <li>
                <Link href="/forum" className="transition-colors hover:text-primary">
                  Fandom Forum
                </Link>
              </li>
              <li>
                <Link href="/shibuya-fest" className="transition-colors hover:text-primary">
                  Shibuya Fest 3.0
                </Link>
              </li>
              <li>
                <Link href="/creators" className="transition-colors hover:text-primary">
                  Cosplayers & Artists
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Legal Links */}
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-foreground">
              Support
            </p>
            <ul className="flex flex-col gap-2.5 text-muted-foreground">
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AnimeWonderous. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Enugu Anime & Gaming Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};