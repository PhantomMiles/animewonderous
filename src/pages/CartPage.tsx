'use client';

import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  // Cart starts empty by default
  const [cartItems, setCartItems] = useState<
    Array<(typeof PRODUCTS)[0] & { quantity: number }>
  >([]);

  const [email, setEmail] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setError(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address for your receipt.');
      return;
    }

    setIsPaying(true);
    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: cartItems.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.authorization_url) {
        throw new Error(data.error || 'Could not start payment');
      }

      window.location.href = data.authorization_url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      );
      setIsPaying(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8 min-h-[60vh]">
        <h1 className="text-4xl font-display uppercase tracking-wider mb-10">
          YOUR CART
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-surface/80 rounded-3xl border border-border/60 max-w-2xl mx-auto shadow-xl space-y-4">
            <div className="h-20 w-20 rounded-full bg-background border border-border/80 flex items-center justify-center mx-auto text-text-muted">
              <ShoppingBag className="h-10 w-10 opacity-40" />
            </div>
            <h2 className="text-2xl font-display uppercase tracking-wider">
              Your cart is empty
            </h2>
            <p className="text-text-secondary text-xs max-w-md mx-auto">
              Looks like you haven&apos;t added any anime apparel, figures, or COD passes to your cart yet.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button className="px-8 shadow-lg shadow-primary/20">Go to Shop</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const name = item.name;
                const image = item.images?.[0]

                return (
                  <div
                    key={item.id}
                    className="bg-surface/80 rounded-2xl border border-border/60 p-4 flex flex-col sm:flex-row items-center gap-6 shadow-md"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-background shrink-0">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-base line-clamp-1">{name}</h3>
                      <p className="text-text-secondary text-xs uppercase">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-background border border-border/80 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-surface transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-surface transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-right sm:w-32">
                      <p className="font-bold text-base">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-text-muted">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-text-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 sticky top-24 shadow-2xl">
                <h3 className="font-display text-xl mb-6 uppercase tracking-wider">
                  Summary
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-text-secondary text-xs">
                    <span>Subtotal</span>
                    <span className="text-foreground font-medium">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary text-xs">
                    <span>Shipping (Local Delivery)</span>
                    <span className="text-foreground font-medium">
                      ₦{shipping.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-border my-4" />
                  <div className="flex justify-between text-lg font-display">
                    <span>TOTAL</span>
                    <span className="text-primary font-bold">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Email for Receipt
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 bg-background border border-border/80 rounded-xl px-4 text-xs outline-none focus:border-primary transition-colors"
                  />
                  {error && <p className="text-xs text-red-400">{error}</p>}
                </div>

                <Button
                  className="w-full py-6 text-base gap-2 font-bold shadow-lg shadow-primary/20"
                  onClick={handleCheckout}
                  disabled={isPaying}
                >
                  {isPaying ? (
                    <>
                      Redirecting <Loader2 className="h-5 w-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Pay with Paystack <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}