import Image from 'next/image';
import Link from 'next/link';
import { Package, MapPin, CreditCard, ChevronLeft, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = {
  order: any; // We'll type this loosely as it's a Prisma payload
};

export default function OrderDetailsPage({ order }: Props) {

  // Derived or mock data for things not stored in the DB yet:
  const shippingAddress = {
    name: 'Anime Fan',
    street: '123 Anime Lane, Victoria Island',
    city: 'Lagos',
    country: 'Nigeria',
    phone: '+234 800 123 4567'
  };
  const paymentMethod = 'Paystack';

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8 max-w-5xl">
        <Link 
          href="/account" 
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Account Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/60">
          <div>
            <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wider mb-2">Order Summary</h1>
            <p className="text-text-secondary text-xs">Order #{order.reference} • Confirmed {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Download Invoice</Button>
            <Button size="sm" className="shadow-md shadow-primary/20">Buy Again</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Status Tracker */}
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-8 shadow-xl">
              <h3 className="font-display text-base uppercase tracking-wider mb-6">Fulfillment Timeline</h3>
              <div className="relative pl-2">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border/80" />
                <div className="space-y-8 relative">
                  <div className="flex gap-5 items-start">
                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 z-10 shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Package Delivered</p>
                      <p className="text-xs text-text-secondary">Sept 15, 2026 • 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0 z-10 shadow-lg shadow-primary/20">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Out for Delivery</p>
                      <p className="text-xs text-text-secondary">Sept 15, 2026 • 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0 z-10 shadow-lg shadow-primary/20">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Dispatched from Lagos Hub</p>
                      <p className="text-xs text-text-secondary">Sept 13, 2026 • 4:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-border/60">
                <h3 className="font-display text-base uppercase tracking-wider">Ordered Items</h3>
              </div>
              <div className="divide-y divide-border/60">
                {order.items.map((item: any) => {
                  const image = item.product?.images?.[0] || '/aa.png';
                  return (
                  <div key={item.id} className="p-6 flex gap-6 items-center">
                    <div className="h-20 w-20 rounded-2xl bg-background border border-border overflow-hidden shrink-0">
                      <Image src={image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-text-secondary mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-base">₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Delivery Info */}
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Delivery Destination
                </h3>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-foreground text-sm">{shippingAddress.name}</p>
                  <p className="text-text-secondary">{shippingAddress.street}</p>
                  <p className="text-text-secondary">{shippingAddress.city}, {shippingAddress.country}</p>
                  <p className="text-text-secondary pt-1">{shippingAddress.phone}</p>
                </div>
              </div>
              <div className="h-px bg-border/60" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" /> Payment Selection
                </h3>
                <p className="text-xs font-bold text-foreground">{paymentMethod}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">Payment breakdown</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-semibold">₦{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping Charge</span>
                  <span className="font-semibold">₦{order.shipping.toLocaleString()}</span>
                </div>
                <div className="h-px bg-border/60 my-2" />
                <div className="flex justify-between text-base font-display">
                  <span>TOTAL PAID</span>
                  <span className="text-primary font-bold">₦{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}