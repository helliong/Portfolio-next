import ProjectsArchive from "@/components/ProjectsArchive";
import type { ProjectFilter } from "@/components/ProjectsArchive";
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
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
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

function projectFilterFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): ProjectFilter {
  if ("web" in searchParams) return "web";
  if ("app" in searchParams || "apps" in searchParams) return "apps";
  if ("tools" in searchParams) return "tools";
  return "all";
}

/** Renders the localized complete project archive route. */
export default async function LocalizedProjectsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialFilter = projectFilterFromSearchParams(resolvedSearchParams);
  const structuredData = projectsJsonLd(projects, locale);

  return (
    <SiteProviders language={locale}>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(structuredData)}
        />
        <ProjectsArchive initialFilter={initialFilter} />
      </>
    </SiteProviders>
  );
}
