import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import SiteProviders from "@/components/SiteProviders";
import WhatICanDo from "@/components/WhatICanDo";
import { isLocale, locales, localizedAlternates, type Locale } from "@/i18n";
import { homeJsonLd, jsonLd, socialMetadata } from "@/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedMetadata: Record<Locale, Metadata> = {
  en: {
    title: "Egor Yakovlev - Full-stack Developer | React, Next.js, TypeScript",
    description: "Full-stack developer portfolio",
  },
  ru: {
    title: "Егор Яковлев - Full-stack разработчик | React, Next.js, TypeScript",
    description: "Портфолио full-stack разработчика.",
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
    alternates: localizedAlternates("/", locale),
    ...socialMetadata({
      title: localizedMetadata[locale].title as string,
      description: localizedMetadata[locale].description as string,
      path: "/",
      locale,
    }),
  };
}

/** Composes the localized portfolio home page from its main content sections. */
export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const structuredData = homeJsonLd(locale);

  return (
    <SiteProviders language={locale}>
      <main className="portfolio-site font-noto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(structuredData)}
        />
        <div className="portfolio-shell">
          <Header />
          <Projects />
          <WhatICanDo />
          <About />
          <Process />
          <Contact />
          <Footer />
        </div>
      </main>
    </SiteProviders>
  );
}
