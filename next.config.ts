import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
    webpackMemoryOptimizations: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(process.cwd(), "src"),
      "@/lib": path.resolve(process.cwd(), "src/lib"),
      "@/components": path.resolve(process.cwd(), "src/components"),
      "@/data": path.resolve(process.cwd(), "src/data"),
      "@/context": path.resolve(process.cwd(), "src/context"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
