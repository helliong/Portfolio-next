import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Portfolio-next",
  assetPrefix: "/Portfolio-next/",
  trailingSlash: true,
};

export default nextConfig;