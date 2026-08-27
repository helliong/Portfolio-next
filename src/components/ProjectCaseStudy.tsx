"use client";

import {
  getLocalizedProjectDetails,
  type ProjectDetails,
} from "@/data/projectDetails";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "./Footer";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";
import PreferenceControls from "./PreferenceControls";
import { usePreferences } from "./PreferencesProvider";

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
  if (
    project.tags.some((tag) => ["nextjs", "react", "html", "css"].includes(tag))
  ) {
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
  const { language, localizedHref, t } = usePreferences();
  const localizedProject = getLocalizedProjectDetails(project, language);
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
          <Link
            href={localizedHref("/")}
            className="projects-archive-brand"
            aria-label={t("Portfolio home", "Главная портфолио")}
          >
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

          <nav
            className="projects-archive-nav"
            aria-label={t("Primary navigation", "Основная навигация")}
          >
            <Link href={localizedHref("/projects")} className="is-active">
              {t("projects", "проекты")}
            </Link>
            <Link href={localizedHref("/#services")}>
              {t("services", "услуги")}
            </Link>
            <Link href={localizedHref("/#about")}>{t("about", "обо мне")}</Link>

            <Link href={localizedHref("/#contact")}>
              {t("contact", "контакты")}
            </Link>
          </nav>

          <div className="projects-archive-header-actions">
            <PreferenceControls compact />
            <button
              type="button"
              className="projects-archive-order"
              onClick={() => setIsPopupOpen(true)}
            >
              {t("order a website", "заказать сайт")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="project-case-hero">
          <div className="project-case-heading">
            <span className="project-case-kicker">
              {t("selected project", "избранный проект")} / {number}
            </span>
            <h1 className="font-dot">{project.name}</h1>
            <p>{localizedProject.summary}</p>

            <div className="project-case-actions">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-case-action project-case-action-github"
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
                  className="project-case-action project-case-action-live"
                >
                  {t("live demo", "демо")}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title={t("Live demo unavailable", "Демо недоступно")}
                  className="project-case-action project-case-action-live is-disabled"
                >
                  {t("live demo", "демо")}
                  <LockKeyhole size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <dl className="project-case-facts">
            <div>
              <dt>{t("year", "год")}</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>{t("role", "роль")}</dt>
              <dd>
                {getRole(project) === "desktop app"
                  ? t("desktop app", "настольное приложение")
                  : getRole(project) === "developer"
                    ? t("developer", "разработчик")
                    : getRole(project)}
              </dd>
            </div>
            <div>
              <dt>stack</dt>
              <dd>{project.tags.slice(0, 2).join(", ")}</dd>
            </div>
            <div>
              <dt>{t("status", "статус")}</dt>
              <dd className={project.liveDemo ? "is-live" : undefined}>
                {project.liveDemo
                  ? t("live", "онлайн")
                  : t("repository", "репозиторий")}
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
              <span className="font-dot">01</span> / {t("overview", "обзор")}
            </h2>
            <p>{localizedProject.overview}</p>
          </article>

          <article>
            <h2>
              <span className="font-dot">02</span> /{" "}
              {t("contribution", "вклад")}
            </h2>
            <ul>
              {localizedProject.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2>
              <span className="font-dot">03</span> /{" "}
              {t("technology", "технологии")}
            </h2>
            <ul>
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        </section>

        <nav
          className="project-case-pagination"
          aria-label={t("Adjacent projects", "Соседние проекты")}
        >
          <Link href={localizedHref(`/projects/${previousProject.id}`)}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{previousProject.number}</span>
            {previousProject.name}
          </Link>
          <Link href={localizedHref(`/projects/${nextProject.id}`)}>
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
