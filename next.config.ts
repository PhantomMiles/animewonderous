/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Prevents Windows/OneDrive symlink conflicts
    outputFileTracingRoot: undefined,
  },
  // Ensure Webpack doesn't resolve symlinks inside node_modules/OneDrive
  webpack: (config: any) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;