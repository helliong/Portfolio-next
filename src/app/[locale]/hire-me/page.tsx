import HireMePageContent from "@/components/HireMePageContent";
import SiteProviders from "@/components/SiteProviders";
import { isLocale, locales, localizedAlternates, type Locale } from "@/i18n";
import { jsonLd, socialMetadata } from "@/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

const localizedMetadata: Record<Locale, Metadata> = {
  en: {
    title: "Hire Me | Egor Yakovlev — Full-stack Developer",
    description: "Full-stack developer open to full-time and contract opportunities, remote or office-based.",
  },
  ru: {
    title: "Для компаний | Егор Яковлев — Full-stack разработчик",
    description: "Full-stack разработчик, открытый к full-time и контрактной работе удалённо или в офисе.",
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
    alternates: localizedAlternates("/hire-me", locale),
    ...socialMetadata({
      title: localizedMetadata[locale].title as string,
      description: localizedMetadata[locale].description as string,
      path: "/hire-me",
      locale,
    }),
  };
}

function hireMeJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: locale === "ru" ? "Егор Яковлев" : "Egor Yakovlev",
      jobTitle: locale === "ru" ? "Full-stack разработчик" : "Full-stack Developer",
      email: "mailto:saoffabg@gmail.com",
      knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker"],
    },
  };
}

/** Renders the localized recruiter-facing profile page. */
export default async function LocalizedHireMePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <SiteProviders language={locale}>
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(hireMeJsonLd(locale))} />
        <HireMePageContent />
      </>
    </SiteProviders>
  );
}
