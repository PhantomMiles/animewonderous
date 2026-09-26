'use client';
import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(
    PRODUCTS.slice(0, 3).map(p => ({ ...p, quantity: 1 }))
  );

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8 max-w-6xl">
        <h1 className="text-4xl font-display uppercase tracking-wider mb-8">SHOPPING CART</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-surface/80 rounded-3xl border border-border/60 shadow-2xl">
            <ShoppingBag className="h-16 w-16 text-text-muted mx-auto mb-4 opacity-30" />
            <h2 className="text-2xl font-display mb-2 uppercase tracking-wider">Your Cart is Empty</h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">Explore our official shop catalog and pick up your favorite anime figures and collectibles.</p>
            <Link href="/shop">
              <Button size="lg" className="shadow-lg shadow-primary/20">Return to Store</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-surface/80 rounded-3xl border border-border/60 p-5 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-background border border-border/60 shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h3 className="font-bold text-base line-clamp-1">{item.name}</h3>
                    <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-background border border-border rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors text-text-secondary"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors text-text-secondary"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-right sm:w-28">
                    <p className="font-bold text-base text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[10px] text-text-muted">₦{item.price.toLocaleString()} each</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 sticky top-24 shadow-2xl space-y-6">
                <h3 className="font-display text-lg uppercase tracking-wider">Order Summary</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span className="text-foreground font-semibold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Estimated Shipping</span>
                    <span className="text-foreground font-semibold">₦{shipping.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-border/60 my-2"></div>
                  <div className="flex justify-between text-lg font-display">
                    <span>TOTAL</span>
                    <span className="text-primary font-bold">₦{total.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full py-6 text-base font-bold shadow-lg shadow-primary/20 gap-2">
                  Proceed to Checkout <ArrowRight className="h-5 w-5" />
                </Button>
                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-text-muted">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Secure SSL Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}