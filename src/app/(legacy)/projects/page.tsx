import { redirect } from "next/navigation";

/** Redirects the legacy project archive URL to the default localized route. */
export default function ProjectsPage() {
  redirect("/en/projects");
}
