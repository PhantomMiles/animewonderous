'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './ui/Button';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeProvider';
import { AuthModal } from './AuthModal';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Events', href: '/events' },
    { name: 'Community', href: '/community' },
    { name: 'Forum', href: '/forum' },
  ];

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50">
              <Image 
                src="/aa.png" 
                alt="Animewonderous Emblem" 
                width={64} 
                height={64} 
                className="object-cover" 
                priority
              />
            </div>
            <div className="font-display text-xl font-bold tracking-wider">
              <span className="text-primary">ANIME</span>
              <span className="text-foreground">WONDEROUS</span>
            </div>
          </Link>

          {/* Nav Links with Animated Underline */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative py-1 text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}
                >
                  {item.name}

                  {/* Underline Highlight */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-primary transition-all duration-300 ease-out origin-left",
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anime, items..."
              className="h-10 w-64 rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label="Toggle theme" 
              className="hidden sm:flex"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="h-5 w-5 text-primary transition-transform duration-300 -rotate-12" />
              )}
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  3
                </span>
              </Button>
            </Link>
            
            <div className="hidden md:flex items-center gap-2 ml-2">
              <Button size="sm" onClick={() => openAuth('signup')} className="px-6">
                Join Us
              </Button>
            </div>

            <div className="h-8 w-px bg-border mx-1 hidden sm:block md:hidden" />
            
            <Link href="/account" className="hidden sm:block">
              <Button variant="ghost" size="icon" aria-label="User Account" className="rounded-full bg-card border border-border">
                <User className="h-5 w-5 text-foreground" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-background p-4 md:hidden animate-in slide-in-from-top duration-200 shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors",
                  pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button variant="outline" onClick={() => { setIsMobileMenuOpen(false); openAuth('signin'); }}>
                Sign In
              </Button>
              <Button onClick={() => { setIsMobileMenuOpen(false); openAuth('signup'); }}>
                Sign Up
              </Button>
            </div>

            <div className="flex items-center justify-between mt-2 p-3 bg-card rounded-xl border border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Appearance
              </span>
              <Button variant="secondary" size="sm" onClick={toggleTheme}>
                {mounted && theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4 mr-2 text-amber-400" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2 text-primary" /> Dark Mode
                  </>
                )}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}