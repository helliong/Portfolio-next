"use client";

import type { ProjectDetails } from "@/data/projectDetails";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "./Footer";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";

type AdjacentProject = {
  id: string;
  name: string;
  number: string;
};

type Props = {
  project: ProjectDetails;
  number: string;
  year: string;
  previousProject: AdjacentProject;
  nextProject: AdjacentProject;
};

/** Infers a readable project role from the technologies used by the project. */
function getRole(project: ProjectDetails) {
  if (project.tags.some((tag) => ["nextjs", "react", "html", "css"].includes(tag))) {
    return "full-stack";
  }

  if (project.tags.some((tag) => ["c#", "autohotkey"].includes(tag))) {
    return "desktop app";
  }

  return "developer";
}

/** Renders one complete case study with navigation to adjacent projects. */
export default function ProjectCaseStudy({
  project,
  number,
  year,
  previousProject,
  nextProject,
}: Props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <main id="project-top" className="project-case">
      <div className="project-case-shell">
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
            <Link href="/projects" className="is-active">
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

        <section className="project-case-hero">
          <div className="project-case-heading">
            <span className="project-case-kicker">selected project / {number}</span>
            <h1 className="font-dot">{project.name}</h1>
            <p>{project.summary}</p>

            <div className="project-case-actions">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-case-action project-case-action-github"
              >
                github
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-case-action project-case-action-live"
                >
                  live demo
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Live demo unavailable"
                  className="project-case-action project-case-action-live is-disabled"
                >
                  live demo
                  <LockKeyhole size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <dl className="project-case-facts">
            <div>
              <dt>year</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>role</dt>
              <dd>{getRole(project)}</dd>
            </div>
            <div>
              <dt>stack</dt>
              <dd>{project.tags.slice(0, 2).join(", ")}</dd>
            </div>
            <div>
              <dt>status</dt>
              <dd className={project.liveDemo ? "is-live" : undefined}>
                {project.liveDemo ? "live" : "repository"}
              </dd>
            </div>
          </dl>
        </section>

        <div className="project-case-media">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            priority
            sizes="(max-width: 1720px) 92vw, 1500px"
          />
        </div>

        <section className="project-case-details">
          <article>
            <h2>
              <span className="font-dot">01</span> / overview
            </h2>
            <p>{project.overview}</p>
          </article>

          <article>
            <h2>
              <span className="font-dot">02</span> / contribution
            </h2>
            <ul>
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2>
              <span className="font-dot">03</span> / technology
            </h2>
            <ul>
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        </section>

        <nav className="project-case-pagination" aria-label="Adjacent projects">
          <Link href={`/projects/${previousProject.id}`}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{previousProject.number}</span>
            {previousProject.name}
          </Link>
          <Link href={`/projects/${nextProject.id}`}>
            <span>{nextProject.number}</span>
            {nextProject.name}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
        <Footer topHref="#project-top" />
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
