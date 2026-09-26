'use client';
import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Star, Filter, ChevronDown, ShoppingCart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Figures', 'Apparel', 'Media', 'Statues', 'Accessories'];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-display uppercase tracking-wider">STORE & CATALOG</h1>
            <p className="text-text-secondary mt-2">Discover premium authentic figures, apparel, and anime collectibles.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              Sort By <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 hidden lg:block space-y-8">
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl">
              <h3 className="font-display text-base mb-4 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeCategory === cat ? 'bg-primary text-foreground font-bold shadow-md shadow-primary/20' : 'text-text-secondary hover:bg-surface-elevated'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl space-y-4">
              <h3 className="font-display text-base uppercase tracking-wider">Max Price</h3>
              <input type="range" className="w-full accent-primary" min="0" max="500000" />
              <div className="flex justify-between text-xs text-text-muted">
                <span>₦0</span>
                <span>₦500,000+</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 via-surface to-background border border-primary/20 rounded-3xl p-6 shadow-xl">
              <h4 className="font-bold text-primary text-sm mb-1">VIP Membership Discount</h4>
              <p className="text-xs text-text-secondary mb-4">Get up to 15% off official figure pre-orders.</p>
              <Button size="sm" className="w-full shadow-md shadow-primary/20">Join Pro Membership</Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden group hover:border-primary/50 transition-all flex flex-col shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-background">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      {product.tags?.[0] && (
                        <Badge variant="primary" className="text-[10px] font-bold uppercase">{product.tags[0]}</Badge>
                      )}
                    </div>
                    <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-foreground transition-all shadow-md">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-bold text-foreground">{product.rating}</span>
                        <span className="text-text-muted text-[10px] ml-1">(120)</span>
                      </div>
                      <h3 className="font-display text-base mb-2 group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-wider">{product.name}</h3>
                      <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-foreground font-display">{product.currency}{product.price.toLocaleString()}</span>
                      <Link href={`/shop/${product.id}`}>
                        <Button size="sm" variant="outline">Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center items-center gap-2">
              <Button variant="secondary" size="icon" className="w-9 h-9 font-bold">1</Button>
              <Button variant="ghost" size="icon" className="w-9 h-9">2</Button>
              <Button variant="ghost" size="icon" className="w-9 h-9">3</Button>
              <span className="px-2 text-text-muted text-xs">...</span>
              <Button variant="ghost" size="icon" className="w-9 h-9">10</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}