import type { NextConfig } from "next";

// Let Next.js serve responsive modern formats while source assets stay portable.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  devIndicators: false,
};

export default nextConfig;
