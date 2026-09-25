'use client';
import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Star, Filter, ChevronDown, ShoppingCart } from 'lucide-react';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Figures', 'Apparel', 'Media', 'Statues', 'Accessories'];

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-display">SHOP</h1>
          <p className="text-text-secondary mt-2">Discover exclusive anime merchandise and collectibles.</p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="secondary" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
           </Button>
           <Button variant="secondary" className="gap-2">
              Sort By <ChevronDown className="h-4 w-4" />
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 hidden lg:block space-y-8">
          <div>
            <h3 className="font-display text-lg mb-4 uppercase tracking-wider">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat ? 'bg-primary text-foreground' : 'text-text-secondary hover:bg-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4 uppercase tracking-wider">Price Range</h3>
            <input type="range" className="w-full accent-primary" min="0" max="500" />
            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>₦0</span>
              <span>₦500k+</span>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
            <h4 className="font-bold text-primary mb-2">Member Discount!</h4>
            <p className="text-xs text-text-secondary mb-4">Get up to 20% off on your first purchase as a member.</p>
            <Button size="sm" className="w-full">Sign Up Now</Button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-surface rounded-2xl border border-border overflow-hidden group hover:border-primary/50 transition-all flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-background">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    {product.tags?.[0] && (
                      <Badge variant="primary">{product.tags[0]}</Badge>
                    )}
                  </div>
                  <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-bold text-foreground">{product.rating}</span>
                    <span className="text-text-muted text-[10px] ml-1">(120 reviews)</span>
                  </div>
                  <h3 className="font-display text-lg mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-foreground">{product.currency}{product.price.toLocaleString()}</span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-2">
             <Button variant="secondary" size="icon" className="w-10 h-10">1</Button>
             <Button variant="ghost" size="icon" className="w-10 h-10">2</Button>
             <Button variant="ghost" size="icon" className="w-10 h-10">3</Button>
             <div className="flex items-center px-2 text-text-muted">...</div>
             <Button variant="ghost" size="icon" className="w-10 h-10">10</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
