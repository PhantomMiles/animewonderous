'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Package, MapPin, CreditCard, ChevronLeft, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PRODUCTS } from '../data/mockData';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  // Mock order data based on orderId or default
  const order = {
    id: orderId || 'AW-10294',
    date: 'Sept 12, 2026',
    status: 'Delivered',
    items: [
      { ...PRODUCTS[0], quantity: 1 },
      { ...PRODUCTS[2], quantity: 1 }
    ],
    shippingAddress: {
      name: 'Wonderous Boy',
      street: '123 Anime Lane, Victoria Island',
      city: 'Lagos',
      country: 'Nigeria',
      phone: '+234 800 123 4567'
    },
    paymentMethod: 'Visa ending in 4242',
    summary: {
      subtotal: 160000,
      shipping: 5000,
      tax: 0,
      total: 165000
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Fixed: Replaced 'to' with 'href' for Next.js Link */}
        <Link 
          href="/account" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Account
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-display uppercase tracking-wider mb-2">Order Details</h1>
            <p className="text-text-secondary text-sm">Order #{order.id} • Placed on {order.date}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Download Invoice</Button>
            <Button>Buy Again</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Status Tracker */}
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h3 className="font-bold mb-6">Order Status</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-8 relative">
                  <div className="flex gap-6">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0 z-10">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Order Delivered</p>
                      <p className="text-xs text-text-secondary">Sept 15, 2026 • 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0 z-10">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Out for Delivery</p>
                      <p className="text-xs text-text-secondary">Sept 15, 2026 • 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0 z-10">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Shipped from Lagos Hub</p>
                      <p className="text-xs text-text-secondary">Sept 13, 2026 • 4:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-surface rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="font-bold">Items in Order</h3>
              </div>
              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-6 items-center">
                    <div className="h-20 w-20 rounded-xl bg-background border border-border overflow-hidden shrink-0">
                      <Image src={item.images[0]} alt={item.name} width={100} height={100} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-text-secondary">{item.category} • Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Delivery Info */}
            <div className="bg-surface rounded-2xl border border-border p-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Delivery Address
                </h3>
                <div className="text-sm">
                  <p className="font-bold">{order.shippingAddress.name}</p>
                  <p className="text-text-secondary">{order.shippingAddress.street}</p>
                  <p className="text-text-secondary">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  <p className="text-text-secondary mt-2">{order.shippingAddress.phone}</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" /> Payment Method
                </h3>
                <p className="text-sm font-bold">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">Order Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium">₦{order.summary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="font-medium">₦{order.summary.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Estimated Tax</span>
                  <span className="font-medium">₦{order.summary.tax.toLocaleString()}</span>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="flex justify-between text-lg font-display">
                  <span>TOTAL</span>
                  <span className="text-primary font-bold">₦{order.summary.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}