import ProjectsArchive from "@/components/ProjectsArchive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All projects | Egor Yakovlev",
  description: "A complete archive of web, application and utility projects.",
};

/** Renders the complete project archive route. */
export default function ProjectsPage() {
  return <ProjectsArchive />;
}
