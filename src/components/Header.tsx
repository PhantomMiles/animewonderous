'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './ui/Button';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeProvider';
import { AuthModal } from './AuthModal';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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
          <Link href="/" className="flex items-center gap-2">
            <Image src="/aa.png" alt="Logo" width={100} height={100} className='h-12 w-auto' />
            <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-primary to-foreground bg-clip-text text-transparent">
              ANIMEWONDEROUS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === item.href ? "text-foreground" : "text-text-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search anime, items..."
              className="h-10 w-64 rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden sm:flex">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-foreground">
                  3
                </span>
              </Button>
            </Link>
            
            <div className="hidden md:flex items-center gap-2 ml-2">
              <Button size="sm" onClick={() => openAuth('signup')} className="px-6">Join Us</Button>
            </div>

            <div className="h-8 w-px bg-border mx-1 hidden sm:block md:hidden"></div>
            
            <Link href="/account" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-full bg-surface">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-background p-4 md:hidden animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-lg font-medium",
                  pathname === item.href ? "text-primary" : "text-text-secondary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="outline" onClick={() => { setIsMobileMenuOpen(false); openAuth('signin'); }}>Sign In</Button>
              <Button onClick={() => { setIsMobileMenuOpen(false); openAuth('signup'); }}>Sign Up</Button>
            </div>
            <div className="flex items-center justify-between mt-4 p-4 bg-surface rounded-xl">
               <span className="text-sm font-bold uppercase tracking-wider text-text-secondary">Toggle Theme</span>
               <Button variant="secondary" size="sm" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {theme === 'dark' ? 'Light' : 'Dark'} Mode
               </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}