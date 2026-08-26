import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import SiteProviders from "@/components/SiteProviders";
import { getLocalizedProjectDetails, getProjectDetails } from "@/data/projectDetails";
import { projectOrder } from "@/data/projectOrder";
import { projects } from "@/data/projects";
import { isLocale, locales, localizedAlternates } from "@/i18n";
import { jsonLd, projectJsonLd, socialMetadata } from "@/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

const orderedProjectIds = new Set<string>(projectOrder);
const orderedProjects = [
  ...projectOrder
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project)),
  ...projects.filter((project) => !orderedProjectIds.has(project.id)),
];

/** Prebuilds a localized static route for every known project. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      id: project.id,
    })),
  );
}

/** Creates project-specific search and browser metadata for each locale. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!isLocale(locale) || !project) {
    return { title: "Project not found" };
  }

  const details = locale === "ru"
    ? getLocalizedProjectDetails(project, locale)
    : getProjectDetails(project);
  const title = `${details.name} | ${locale === "ru" ? "Егор Яковлев" : "Egor Yakovlev"}`;

  return {
    title,
    description: details.summary,
    alternates: localizedAlternates(`/projects/${id}`, locale),
    ...socialMetadata({
      title,
      description: details.summary,
      path: `/projects/${id}`,
      locale,
      image: project.image,
    }),
  };
}

/** Resolves a localized project and its circular previous and next navigation links. */
export default async function LocalizedProjectPage({ params }: Props) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const projectIndex = orderedProjects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = getProjectDetails(orderedProjects[projectIndex]);
  const localizedProject = locale === "ru"
    ? getLocalizedProjectDetails(orderedProjects[projectIndex], locale)
    : project;
  const structuredData = projectJsonLd(
    orderedProjects[projectIndex],
    locale,
    localizedProject.summary,
  );
  const previousIndex =
    (projectIndex - 1 + orderedProjects.length) % orderedProjects.length;
  const nextIndex = (projectIndex + 1) % orderedProjects.length;
  const previousProject = orderedProjects[previousIndex];
  const nextProject = orderedProjects[nextIndex];

  return (
    <SiteProviders language={locale}>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(structuredData)}
        />
      <ProjectCaseStudy
        project={project}
        number={String(projectIndex + 1).padStart(2, "0")}
        year={project.year ?? "—"}
        previousProject={{
          id: previousProject.id,
          name: previousProject.name,
          number: String(previousIndex + 1).padStart(2, "0"),
        }}
        nextProject={{
          id: nextProject.id,
          name: nextProject.name,
          number: String(nextIndex + 1).padStart(2, "0"),
        }}
      />
      </>
    </SiteProviders>
  );
}
