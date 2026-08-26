import ProjectsArchive from "@/components/ProjectsArchive";
import SiteProviders from "@/components/SiteProviders";
import { projects } from "@/data/projects";
import { isLocale, locales, localizedAlternates, type Locale } from "@/i18n";
import { jsonLd, projectsJsonLd, socialMetadata } from "@/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedMetadata: Record<Locale, Metadata> = {
  en: {
    title: "All projects | Egor Yakovlev",
    description: "A complete archive of web, application and utility projects.",
  },
  ru: {
    title: "Все проекты | Егор Яковлев",
    description: "Полный архив веб-проектов, приложений и инструментов.",
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
    alternates: localizedAlternates("/projects", locale),
    ...socialMetadata({
      title: localizedMetadata[locale].title as string,
      description: localizedMetadata[locale].description as string,
      path: "/projects",
      locale,
    }),
  };
}

/** Renders the localized complete project archive route. */
export default async function LocalizedProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const structuredData = projectsJsonLd(projects, locale);

  return (
    <SiteProviders language={locale}>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(structuredData)}
        />
        <ProjectsArchive />
      </>
    </SiteProviders>
  );
}
