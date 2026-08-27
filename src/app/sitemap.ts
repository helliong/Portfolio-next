import type { MetadataRoute } from "next";
import { locales, localizedPath, siteUrl, type Locale } from "@/i18n";
import { projects } from "@/data/projects";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/pricing", priority: 0.8 },
  { path: "/privacy", priority: 0.4 },
] as const;

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function languageAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localizedPath(path, locale))]),
  ) as Record<Locale, string>;
}

function sitemapEntry(
  path: string,
  locale: Locale,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(path, locale)),
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: {
        ...languageAlternates(path),
        "x-default": absoluteUrl(localizedPath(path, "en")),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedStaticRoutes = staticRoutes.flatMap((route) =>
    locales.map((locale) => sitemapEntry(route.path, locale, route.priority)),
  );

  const localizedProjectRoutes = projects.flatMap((project) =>
    locales.map((locale) =>
      sitemapEntry(`/projects/${project.id}`, locale, 0.7),
    ),
  );

  return [...localizedStaticRoutes, ...localizedProjectRoutes];
}
