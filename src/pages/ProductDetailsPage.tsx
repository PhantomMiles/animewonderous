'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function ProductDetailsPage() {
  const { productId } = useParams();
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Images */}
        <div className="lg:col-span-7 space-y-4">
           <div className="aspect-square rounded-3xl overflow-hidden bg-surface border border-border">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
           </div>
           <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
           </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-8">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <Badge variant="primary">{product.category}</Badge>
                 <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-bold text-foreground">{product.rating}</span>
                    <span className="text-text-muted text-xs ml-1">(120 Reviews)</span>
                 </div>
              </div>
              <h1 className="text-4xl font-display mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-4 mb-6">
                 <span className="text-3xl font-bold text-primary">{product.currency}{product.price.toLocaleString()}</span>
                 <span className="text-text-muted line-through">{product.currency}{(product.price * 1.2).toLocaleString()}</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                 {product.description}
              </p>
           </div>

           <div className="space-y-6">
              <div>
                 <p className="text-sm font-bold mb-3 uppercase tracking-wider text-text-muted">Quantity</p>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 bg-surface border border-border rounded-full p-1 w-32 justify-between">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors">-</button>
                       <span className="font-bold">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors">+</button>
                    </div>
                    <p className="text-xs text-text-muted">{product.stock} items left in stock</p>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                 <Button size="lg" className="flex-1 gap-2 py-6">
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                 </Button>
                 <Button variant="outline" size="lg" className="px-6">
                    <Heart className="h-5 w-5" />
                 </Button>
                 <Button variant="outline" size="lg" className="px-6">
                    <Share2 className="h-5 w-5" />
                 </Button>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                 <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center text-primary">
                    <Truck className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="font-bold text-foreground">Fast Delivery</p>
                    <p className="text-xs">Nationwide shipping</p>
                 </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                 <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center text-primary">
                    <RotateCcw className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="font-bold text-foreground">7-Day Returns</p>
                    <p className="text-xs">Easy and hassle-free</p>
                 </div>
              </div>
           </div>

           <div className="bg-surface/50 border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 text-primary font-bold mb-2">
                 <ShieldCheck className="h-5 w-5" /> Authenticity Guaranteed
              </div>
              <p className="text-xs text-text-secondary">Every item in our shop is 100% official and sourced directly from licensed manufacturers.</p>
           </div>
        </div>
      </div>

      {/* Related Items */}
      <section className="mt-24">
         <h2 className="text-2xl font-display mb-8 uppercase tracking-widest">Related Items</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <Link href={`/shop/${p.id}`} key={p.id} className="bg-surface rounded-2xl border border-border overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="aspect-square bg-background overflow-hidden">
                  <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm mb-1 line-clamp-1">{p.name}</h4>
                  <p className="text-primary font-bold text-sm">{p.currency}{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
         </div>
      </section>
    </div>
  );
}
