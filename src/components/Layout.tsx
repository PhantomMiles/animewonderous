import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-primary">ANIME</span>
                <span className="font-display text-xl font-bold tracking-tight text-foreground">WONDEROUS</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                The ultimate platform for anime enthusiasts. Shop exclusive merchandise, join global events, and connect with fans worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-display text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/shop" className="hover:text-primary transition-colors">Shop</a></li>
                <li><a href="/events" className="hover:text-primary transition-colors">Events</a></li>
                <li><a href="/community" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-foreground mb-4">Newsletter</h4>
              <p className="text-text-secondary text-sm mb-4">Subscribe to get latest updates and offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-surface border border-border rounded-full px-4 py-2 text-sm outline-none w-full"
                />
                <button className="bg-primary hover:bg-primary-dark text-foreground p-2 rounded-full px-4 text-sm font-medium transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
            <p>&copy; 2026 AnimeWonderous Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Twitter</a>
              <a href="#" className="hover:text-foreground">Instagram</a>
              <a href="#" className="hover:text-foreground">Discord</a>
              <a href="#" className="hover:text-foreground">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
