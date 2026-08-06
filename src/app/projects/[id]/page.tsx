import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { getProjectDetails } from "@/data/projectDetails";
import { projectOrder, projectYears } from "@/data/projectOrder";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const orderedProjects = projectOrder
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

/** Prebuilds a static route for every known project. */
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

/** Creates project-specific search and browser metadata. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.name} | Egor Yakovlev`,
    description: getProjectDetails(project).summary,
  };
}

/** Resolves a project and its circular previous and next navigation links. */
export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const projectIndex = orderedProjects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = getProjectDetails(orderedProjects[projectIndex]);
  const previousIndex =
    (projectIndex - 1 + orderedProjects.length) % orderedProjects.length;
  const nextIndex = (projectIndex + 1) % orderedProjects.length;
  const previousProject = orderedProjects[previousIndex];
  const nextProject = orderedProjects[nextIndex];

  return (
    <ProjectCaseStudy
      project={project}
      number={String(projectIndex + 1).padStart(2, "0")}
      year={projectYears[project.id] ?? "2025"}
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
  );
}
