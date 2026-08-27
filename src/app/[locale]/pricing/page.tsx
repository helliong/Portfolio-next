import PricingPageContent from "@/components/PricingPageContent";
import type { PricingTab } from "@/components/PricingPageContent";
import SiteProviders from "@/components/SiteProviders";
import { isLocale, locales, localizedAlternates, type Locale } from "@/i18n";
import { jsonLd, socialMetadata } from "@/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const localizedMetadata: Record<Locale, Metadata> = {
  en: {
    title: "Pricing | Egor Yakovlev",
    description: "Website, web app and integration pricing with add-on services.",
  },
  ru: {
    title: "Цены | Егор Яковлев",
    description: "Стоимость сайтов, веб-приложений, интеграций и дополнительных услуг.",
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
    alternates: localizedAlternates("/pricing", locale),
    ...socialMetadata({
      title: localizedMetadata[locale].title as string,
      description: localizedMetadata[locale].description as string,
      path: "/pricing",
      locale,
    }),
  };
}

function pricingJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "ru" ? "Разработка сайтов и интеграций" : "Website development and integrations",
    provider: {
      "@type": "Person",
      name: locale === "ru" ? "Егор Яковлев" : "Egor Yakovlev",
    },
    serviceType: locale === "ru" ? "Full-stack разработка" : "Full-stack development",
  };
}

function pricingTabFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): PricingTab {
  return "extras" in searchParams ? "extras" : "packages";
}

/** Renders the localized pricing route. */
export default async function LocalizedPricingPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialTab = pricingTabFromSearchParams(resolvedSearchParams);

  return (
    <SiteProviders language={locale}>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(pricingJsonLd(locale))}
        />
        <PricingPageContent initialTab={initialTab} />
      </>
    </SiteProviders>
  );
}
