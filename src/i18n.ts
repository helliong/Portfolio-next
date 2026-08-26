export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const siteUrl = "https://helliong.space";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(path: string, locale: Locale) {
  if (!path || path.startsWith("#")) return path;
  if (/^[a-z][a-z\d+\-.]*:/i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const segments = normalizedPath.split("/");

  if (isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function localizedAlternates(path: string, locale: Locale) {
  return {
    canonical: localizedPath(path, locale),
    languages: {
      en: localizedPath(path, "en"),
      ru: localizedPath(path, "ru"),
      "x-default": localizedPath(path, defaultLocale),
    },
  };
}
