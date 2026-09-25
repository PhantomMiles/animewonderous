import React from "react";
import Image from "next/image";

export default function Loading(): React.ReactElement {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Glow effect matching app's spotlight style */}
      <div 
        aria-hidden="true" 
        className="absolute h-64 w-64 rounded-full bg-primary/20 blur-[120px] pointer-events-none" 
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-surface flex items-center justify-center shadow-2xl">
            <Image src="/aa.png" alt="Logo" width={100} height={100} className='h-12 w-auto' />
            {/* Shimmer overlay */}
            <div 
              aria-hidden="true" 
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" 
            />
          </div>

          {/* Rotating Outer Ring */}
          <div 
            aria-hidden="true" 
            className="absolute -inset-2 rounded-3xl border-2 border-primary/30 border-t-primary animate-spin" 
          />
        </div>

        {/* Brand Name & Loader Bar */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-display text-lg font-semibold tracking-[0.2em] text-foreground">
            ANIMEWONDEROUS
          </p>
          <div className="h-1 w-32 overflow-hidden rounded-full border border-border bg-surface">
            <div 
              aria-hidden="true" 
              className="h-full w-full origin-left bg-primary animate-loading-bar" 
            />
          </div>
          <p className="mt-1 text-xs uppercase tracking-wider text-text-muted">
            Loading Experience...
          </p>
        </div>
      </div>
      
      {/* Screen reader only announcement */}
      <span className="sr-only">Loading, please wait...</span>
    </div>
  );
}