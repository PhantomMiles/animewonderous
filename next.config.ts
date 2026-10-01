import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly pins the workspace root so Next.js doesn't get confused by
  // OneDrive's sync folder structure, or by having both bun.lock and
  // package-lock.json present. (This was previously nested under
  // `experimental`, which Next.js 15 no longer recognizes there — it now
  // warned and silently ignored it on every Vercel build.)
  outputFileTracingRoot: path.join(__dirname),
  // Ensure Webpack doesn't try to resolve OneDrive's placeholder symlinks.
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
