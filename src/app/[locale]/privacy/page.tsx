import PrivacyPageContent from "@/components/PrivacyPageContent";
import SiteProviders from "@/components/SiteProviders";
import { isLocale, locales, localizedAlternates, type Locale } from "@/i18n";
import { socialMetadata } from "@/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedMetadata: Record<Locale, Metadata> = {
  en: {
    title: "Privacy policy | Egor Yakovlev",
    description: "Privacy policy for the Egor Yakovlev portfolio website.",
  },
  ru: {
    title: "Политика конфиденциальности | Егор Яковлев",
    description: "Политика конфиденциальности сайта-портфолио Егора Яковлева.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    ...localizedMetadata[locale],
    alternates: localizedAlternates("/privacy", locale),
    ...socialMetadata({
      title: localizedMetadata[locale].title as string,
      description: localizedMetadata[locale].description as string,
      path: "/privacy",
      locale,
    }),
  };
}

/** Renders the localized privacy policy route. */
export default async function LocalizedPrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <SiteProviders language={locale}>
      <PrivacyPageContent />
    </SiteProviders>
  );
}
