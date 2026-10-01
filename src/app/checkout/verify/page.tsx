'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type State =
  | { phase: 'checking' }
  | { phase: 'success'; reference: string; amount: number }
  | { phase: 'failed'; message: string };

function VerifyContent() {
  const params = useSearchParams();
  const reference = params.get('reference') || params.get('trxref');
  const [state, setState] = useState<State>({ phase: 'checking' });

  useEffect(() => {
    if (!reference) {
      setState({ phase: 'failed', message: 'No payment reference found.' });
      return;
    }

    let cancelled = false;
    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.status === 'success') {
          setState({ phase: 'success', reference: data.reference, amount: data.amount });
        } else {
          setState({ phase: 'failed', message: 'Your payment was not completed.' });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ phase: 'failed', message: 'We could not verify your payment.' });
      });

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-24 lg:px-8">
      <div className="max-w-md mx-auto text-center bg-surface border border-border rounded-3xl p-10">
        {state.phase === 'checking' && (
          <>
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
            <h1 className="text-2xl font-display mb-2">Confirming payment…</h1>
            <p className="text-text-secondary text-sm">Please don&apos;t close this page.</p>
          </>
        )}

        {state.phase === 'success' && (
          <>
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <h1 className="text-2xl font-display mb-2">Payment successful</h1>
            <p className="text-text-secondary text-sm mb-1">
              ₦{state.amount.toLocaleString()} received.
            </p>
            <p className="text-text-muted text-xs mb-8">Reference: {state.reference}</p>
            <Link href="/shop" className="text-primary font-bold hover:underline">
              Continue shopping
            </Link>
          </>
        )}

        {state.phase === 'failed' && (
          <>
            <XCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h1 className="text-2xl font-display mb-2">Payment not completed</h1>
            <p className="text-text-secondary text-sm mb-8">{state.message}</p>
            <Link href="/cart" className="text-primary font-bold hover:underline">
              Back to cart
            </Link>
          </>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyContent />
    </Suspense>
  );
}
