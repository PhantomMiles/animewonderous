import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // pg (via @prisma/adapter-pg) depends on real Node built-ins (fs, dns, net,
  // tls) for raw TCP/TLS postgres connections. Without this, Next.js's
  // bundler can pull it toward a client/edge bundle through the "use server"
  // boundary and fail trying to resolve those as browser modules — this
  // forces it to always be treated as a plain server-side Node require.
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
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
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
};

export default nextConfig;
