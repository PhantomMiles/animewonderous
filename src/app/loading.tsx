import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Glow effect matching app's spotlight style */}
      <div className="absolute h-64 w-64 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-2xl relative overflow-hidden">
            <span className="font-display text-2xl font-bold text-primary tracking-widest animate-pulse">
              AW
            </span>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
          
          {/* Rotating Outer Ring */}
          <div className="absolute -inset-2 rounded-3xl border-2 border-primary/30 border-t-primary animate-spin" />
        </div>

        {/* Brand Name & Loader Bar */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-display text-lg tracking-[0.2em] text-foreground font-semibold">
            ANIMEWONDEROUS
          </p>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-surface border border-border">
            <div className="h-full w-full bg-primary origin-left animate-[loadingBar_1.2s_ease-in-out_infinite]" />
          </div>
          <p className="text-xs text-text-muted tracking-wider uppercase mt-1">
            Loading Experience...
          </p>
        </div>
      </div>
    </div>
  );
}