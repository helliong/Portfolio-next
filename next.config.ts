import type { NextConfig } from "next";

// Keep exported project images portable across static and Vercel deployments.
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
