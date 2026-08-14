"use client";

import { getProjectDetails } from "@/data/projectDetails";
import { projectOrder } from "@/data/projectOrder";
import { projects } from "@/data/projects";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "./Footer";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";

type ProjectFilter = "all" | "web" | "apps" | "tools";

const filters: ProjectFilter[] = ["all", "web", "apps", "tools"];

// Preserve the manually selected order while enriching generated project data.
const orderedProjectIds = new Set<string>(projectOrder);
const orderedProjects = [
  ...projectOrder
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project)),
  ...projects.filter((project) => !orderedProjectIds.has(project.id)),
]
  .map(getProjectDetails);

/** Renders the filterable project archive and its contact dialogs. */
export default function ProjectsArchive() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Recompute the visible list only when the selected category changes.
  const visibleProjects = useMemo(
    () =>
      activeFilter === "all"
        ? orderedProjects
        : orderedProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <main id="projects-top" className="projects-archive">
      <div className="projects-archive-shell">
        <header className="projects-archive-topbar">
          <Link href="/" className="projects-archive-brand" aria-label="Portfolio home">
            <Image
              src="/logoWhite.svg"
              alt="EY"
              width={52}
              height={36}
              className="projects-archive-logo-dark"
              priority
            />
            <Image
              src="/logoBlack.svg"
              alt="EY"
              width={52}
              height={36}
              className="projects-archive-logo-light"
              priority
            />
          </Link>

          <nav className="projects-archive-nav" aria-label="Primary navigation">
            <Link href="/#about">about</Link>
            <Link href="/#services">services</Link>
            <Link href="/projects" className="is-active" aria-current="page">
              projects
            </Link>
            <Link href="/#contact">contact</Link>
          </nav>

          <button
            type="button"
            className="projects-archive-order"
            onClick={() => setIsPopupOpen(true)}
          >
            order a website
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </header>

        <section className="projects-archive-intro" aria-labelledby="projects-title">
          <h1 id="projects-title" className="font-dot" aria-live="polite">
            {activeFilter} projects / {String(visibleProjects.length).padStart(2, "0")}
          </h1>

          <div className="projects-archive-filters" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : undefined}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="projects-archive-grid" aria-live="polite">
          {visibleProjects.map((project) => {
            const projectIndex = orderedProjects.findIndex(
              (item) => item.id === project.id,
            );

            return (
              <article className="projects-archive-item" key={project.id}>
                <span className="projects-archive-index font-dot" aria-hidden="true">
                  {String(projectIndex + 1).padStart(2, "0")}
                </span>

                <Link
                  href={`/projects/${project.id}`}
                  className="projects-archive-media"
                  aria-label={`View ${project.name} project`}
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 1100px) 72vw, 28vw"
                    style={{
                      objectFit: "contain",
                      transform: "none",
                      transition: "none",
                    }}
                  />
                </Link>

                <div className="projects-archive-copy">
                  <div>
                    <h2>
                      <Link href={`/projects/${project.id}`}>{project.name}</Link>
                    </h2>
                    <p>{project.summary}</p>
                  </div>

                  <div className="projects-archive-tags" aria-label="Technologies">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="projects-archive-actions">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-archive-action projects-archive-action-github"
                      >
                        github
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}

                    {project.liveDemo ? (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-archive-action projects-archive-action-live"
                      >
                        live demo
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        title="Live demo unavailable"
                        className="projects-archive-action projects-archive-action-live is-disabled"
                      >
                        live demo
                        <LockKeyhole size={14} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
        <Footer topHref="#projects-top" />
      </div>

      <SelfServicePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={showSuccessPopup}
      />
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </main>
  );
}
