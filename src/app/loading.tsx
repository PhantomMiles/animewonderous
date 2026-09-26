"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingProps {
  duration?: number; // Duration in milliseconds (default: 2000ms)
  onComplete?: () => void;
}

export default function Loading({
  duration = 2000,
  onComplete,
}: LoadingProps): React.ReactElement {
  const [progress, setProgress] = useState(0);

  // Handle percentage progress timer
  useEffect(() => {
    const stepTime = duration / 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [duration]);

  // Handle completion trigger cleanly after render pass completes
  useEffect(() => {
    if (progress >= 100 && onComplete) {
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <div
      role="status"
      aria-label={`Loading page content: ${progress}%`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Glow effect matching app's spotlight style */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-primary/20 blur-[120px]" 
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <Image 
              src="/aa.png" 
              alt="Animewonderous Brand Emblem" 
              width={200} 
              height={200} 
              className="object-cover"
              priority
            />
            {/* Shimmer overlay */}
            <div 
              aria-hidden="true" 
              className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-primary/20 to-transparent" 
            />
          </div>

          {/* Rotating Outer Ring */}
          <div 
            aria-hidden="true" 
            className="absolute -inset-2 animate-spin rounded-[1.75rem] border-2 border-primary/30 border-t-primary" 
          />
        </div>

        {/* Brand Name, Progress Bar & Percentage Counter */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-lg font-semibold tracking-[0.2em] text-foreground">
            ANIMEWONDEROUS
          </p>

          {/* Dynamic Progress Bar */}
          <div className="relative h-1.5 w-40 overflow-hidden rounded-full border border-border bg-card">
            <div 
              aria-hidden="true" 
              className="h-full bg-primary transition-all duration-75 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Real-time Percentage & Status */}
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Loading Experience
            </p>
            <span className="font-mono text-xs font-bold text-primary">
              {progress}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Screen reader announcement */}
      <span className="sr-only">Loading Animewonderous experience, {progress}% complete</span>
    </div>
  );
}