'use client';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '../lib/CartContext';

type Props = {
  product: any;
  relatedProducts: any[];
};

export default function ProductDetailsPage({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <>
      <Header />
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
            <div className="aspect-square rounded-3xl overflow-hidden bg-surface/80 border border-border/60 shadow-2xl">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary ring-2 ring-primary/20' : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="primary">{product.category}</Badge>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-bold text-foreground">{product.rating}</span>
                  <span className="text-text-muted text-xs ml-1">(120 Reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wide mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-primary font-display">{product.currency}{product.price.toLocaleString()}</span>
                <span className="text-text-muted line-through text-sm">{product.currency}{(product.price * 1.2).toLocaleString()}</span>
              </div>
              <p className="text-text-secondary leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold mb-3 uppercase tracking-wider text-text-muted">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4 bg-background border border-border/80 rounded-full p-1.5 w-32 justify-between">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors text-sm font-bold">-</button>
                    <span className="font-bold text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors text-sm font-bold">+</button>
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold">{product.stock} items remaining in stock</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 gap-2 py-6 font-bold shadow-lg shadow-primary/20"
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="px-5">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-5">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-b border-border/60">
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="h-10 w-10 rounded-xl bg-surface/80 border border-border flex items-center justify-center text-primary shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Express Delivery</p>
                  <p className="text-[10px]">Nationwide trackable shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="h-10 w-10 rounded-xl bg-surface/80 border border-border flex items-center justify-center text-primary shrink-0">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground">7-Day Guarantee</p>
                  <p className="text-[10px]">Hassle-free return policy</p>
                </div>
              </div>
            </div>

            <div className="bg-surface/80 border border-border/60 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <ShieldCheck className="h-5 w-5" /> 100% Authentic Product
              </div>
              <p className="text-xs text-text-secondary">Directly licensed merchandise guaranteed authentic from verified Japanese manufacturers.</p>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <section className="mt-20">
          <h2 className="text-2xl font-display mb-8 uppercase tracking-wider">Related Collectibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <Link href={`/shop/${p.id}`} key={p.id} className="bg-surface/80 rounded-2xl border border-border/60 overflow-hidden group hover:border-primary/50 transition-all shadow-lg">
                <div className="aspect-square bg-background overflow-hidden">
                  <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-xs mb-1 line-clamp-1">{p.name}</h4>
                  <p className="text-primary font-bold text-sm">{p.currency}{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}