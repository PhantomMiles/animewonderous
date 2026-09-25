'use client';
import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-display mb-10">YOUR CART</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-3xl border border-border">
          <ShoppingCart className="h-16 w-16 text-text-muted mx-auto mb-4 opacity-20" />
          <h2 className="text-2xl font-display mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/shop">
            <Button>Go to Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-surface rounded-2xl border border-border p-4 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-background shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-text-secondary text-xs">{item.category}</p>
                </div>
                <div className="flex items-center gap-3 bg-background border border-border rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <div className="text-right sm:w-32">
                  <p className="font-bold text-lg">₦{(item.price * item.quantity).toLocaleString()}</p>
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
            <div className="bg-surface rounded-3xl border border-border p-8 sticky top-24">
               <h3 className="font-display text-xl mb-6 uppercase tracking-wider">Summary</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-text-secondary">
                     <span>Subtotal</span>
                     <span className="text-foreground font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                     <span>Shipping</span>
                     <span className="text-foreground font-medium">₦{shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                     <span>Tax (Estimated)</span>
                     <span className="text-foreground font-medium">₦0</span>
                  </div>
                  <div className="h-px bg-border my-4"></div>
                  <div className="flex justify-between text-xl font-display">
                     <span>TOTAL</span>
                     <span className="text-primary">₦{total.toLocaleString()}</span>
                  </div>
               </div>
               <Button className="w-full py-6 text-lg gap-2">
                  Checkout <ArrowRight className="h-5 w-5" />
               </Button>
               <div className="mt-6 flex items-center justify-center gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-50" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-50" alt="Mastercard" />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
