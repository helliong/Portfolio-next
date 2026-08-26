import { projects } from "@/data/projects";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/** Prebuilds a static redirect route for every known project. */
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

/** Redirects legacy project detail URLs to the default localized route. */
export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  redirect(`/en/projects/${id}`);
}
