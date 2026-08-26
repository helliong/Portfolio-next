"use client";

import { getLocalizedProjectDetails } from "@/data/projectDetails";
import { projectOrder } from "@/data/projectOrder";
import { projects } from "@/data/projects";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "./Footer";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";
import PreferenceControls from "./PreferenceControls";
import { usePreferences } from "./PreferencesProvider";

type ProjectFilter = "all" | "web" | "apps" | "tools";

const filters: ProjectFilter[] = ["all", "web", "apps", "tools"];

// Preserve the manually selected order while enriching generated project data.
const orderedProjectIds = new Set<string>(projectOrder);
const orderedProjects = [
  ...projectOrder
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project)),
  ...projects.filter((project) => !orderedProjectIds.has(project.id)),
];

/** Renders the filterable project archive and its contact dialogs. */
export default function ProjectsArchive() {
  const { language, localizedHref, t } = usePreferences();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Recompute the visible list only when the selected category changes.
  const localizedProjects = useMemo(() => orderedProjects.map((project) => getLocalizedProjectDetails(project, language)), [language]);
  const visibleProjects = useMemo(() => activeFilter === "all" ? localizedProjects : localizedProjects.filter((project) => project.category === activeFilter), [activeFilter, localizedProjects]);
  const filterLabels: Record<ProjectFilter, string> = { all: t("all", "РІСЃРµ"), web: t("web", "РІРµР±"), apps: t("apps", "РїСЂРёР»РѕР¶РµРЅРёСЏ"), tools: t("tools", "РёРЅСЃС‚СЂСѓРјРµРЅС‚С‹") };
  const archiveTitles: Record<ProjectFilter, string> = {
    all: t("all projects", "РІСЃРµ РїСЂРѕРµРєС‚С‹"),
    web: t("web projects", "РІРµР±-РїСЂРѕРµРєС‚С‹"),
    apps: t("apps projects", "РїСЂРѕРµРєС‚С‹ РїСЂРёР»РѕР¶РµРЅРёР№"),
    tools: t("tools projects", "РїСЂРѕРµРєС‚С‹ РёРЅСЃС‚СЂСѓРјРµРЅС‚РѕРІ"),
  };

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <main id="projects-top" className="projects-archive">
      <div className="projects-archive-shell">
        <header className="projects-archive-topbar">
          <Link href={localizedHref("/")} className="projects-archive-brand" aria-label={t("Portfolio home", "Р“Р»Р°РІРЅР°СЏ РїРѕСЂС‚С„РѕР»РёРѕ")}>
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

          <nav className="projects-archive-nav" aria-label={t("Primary navigation", "РћСЃРЅРѕРІРЅР°СЏ РЅР°РІРёРіР°С†РёСЏ")}>
            <Link href={localizedHref("/#about")}>{t("about", "РѕР±Рѕ РјРЅРµ")}</Link>
            <Link href={localizedHref("/#services")}>{t("services", "СѓСЃР»СѓРіРё")}</Link>
            <Link href={localizedHref("/projects")} className="is-active" aria-current="page">
              {t("projects", "РїСЂРѕРµРєС‚С‹")}
            </Link>
            <Link href={localizedHref("/#contact")}>{t("contact", "РєРѕРЅС‚Р°РєС‚С‹")}</Link>
          </nav>

          <div className="projects-archive-header-actions"><PreferenceControls compact /><button
            type="button"
            className="projects-archive-order"
            onClick={() => setIsPopupOpen(true)}
          >
            {t("order a website", "Р·Р°РєР°Р·Р°С‚СЊ СЃР°Р№С‚")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button></div>
        </header>

        <section className="projects-archive-intro" aria-labelledby="projects-title">
          <h1 id="projects-title" className="font-dot" aria-live="polite">
            {archiveTitles[activeFilter]} / {String(visibleProjects.length).padStart(2, "0")}
          </h1>

          <div className="projects-archive-filters" aria-label={t("Filter projects", "Р¤РёР»СЊС‚СЂ РїСЂРѕРµРєС‚РѕРІ")}>
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : undefined}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filterLabels[filter]}
              </button>
            ))}
          </div>
        </section>

        <section className="projects-archive-grid" aria-live="polite">
          {visibleProjects.map((project) => {
            const projectIndex = localizedProjects.findIndex(
              (item) => item.id === project.id,
            );

            return (
              <article className="projects-archive-item" key={project.id}>
                <span className="projects-archive-index font-dot" aria-hidden="true">
                  {String(projectIndex + 1).padStart(2, "0")}
                </span>

                <Link
                  href={localizedHref(`/projects/${project.id}`)}
                  className="projects-archive-media"
                  aria-label={`${t("View project", "РЎРјРѕС‚СЂРµС‚СЊ РїСЂРѕРµРєС‚")} ${project.name}`}
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
                      <Link href={localizedHref(`/projects/${project.id}`)}>{project.name}</Link>
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
                        {t("live demo", "РґРµРјРѕ")}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        title={t("Live demo unavailable", "Р”РµРјРѕ РЅРµРґРѕСЃС‚СѓРїРЅРѕ")}
                        className="projects-archive-action projects-archive-action-live is-disabled"
                      >
                        {t("live demo", "РґРµРјРѕ")}
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

