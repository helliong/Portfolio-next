import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
