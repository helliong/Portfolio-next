import type { NextConfig } from "next";

// Let Next.js serve responsive modern formats while source assets stay portable.
const nextConfig: NextConfig = {
  // Produce a minimal self-contained server for the production Docker image.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  devIndicators: false,
};

export default nextConfig;
