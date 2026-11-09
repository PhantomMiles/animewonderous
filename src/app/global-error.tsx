'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root layout error:', error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-3xl font-bold">
            !
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Application Error
            </h1>
            <p className="text-sm text-neutral-400">
              A critical error occurred while loading the application shell.
            </p>
            {error.digest && (
              <p className="text-xs text-neutral-500 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm transition-colors cursor-pointer"
            >
              Try again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

