"use client";

import { getLocalizedProjectDetails } from "@/data/projectDetails";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePreferences } from "./PreferencesProvider";

const featuredIds = [
  "qr-link-generator",
  "campus-and-code",
  "market-ai",
  "lumea-candles",
  "pinwindow",
  "linkcast",
];

// Resolve the curated project IDs into the enriched records used by the cards.
const featuredProjects = featuredIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project) => project !== undefined);

/** Renders the curated project selection on the home page. */
export default function Projects() {
  const { language, localizedHref, t } = usePreferences();
  const localizedProjects = featuredProjects.map((project) => getLocalizedProjectDetails(project, language));
  return (
    <section id="projects" className="portfolio-section projects-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>
          {t("selected projects", "избранные проекты")} / {String(localizedProjects.length).padStart(2, "0")}
        </h2>
      </div>

      <div className="project-list">
        {localizedProjects.map((project, index) => (
          <article className="project-row" key={project.id}>
            <div className="project-index">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="project-copy">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="project-tags">
                <span className="status-label">{t("repository", "репозиторий")}</span>
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <Link href={localizedHref(`/projects/${project.id}`)} className="text-link">
                  {t("case study", "о проекте")} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link muted-link"
                  >
                    github <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <Link href={localizedHref(`/projects/${project.id}`)} className="project-media">
              <span className="project-media-frame">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 68px), 42vw"
                />
              </span>
            </Link>
          </article>
        ))}
      </div>

      <div className="projects-more">
        <Link href={localizedHref("/projects")} className="text-link">
          {t("view all projects", "все проекты")} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
