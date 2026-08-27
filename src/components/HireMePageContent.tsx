"use client";

import { ArrowUpRight, Clock3, Download, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EmploymentPopup from "./EmploymentPopup";
import Footer from "./Footer";
import PreferenceControls from "./PreferenceControls";
import { usePreferences } from "./PreferencesProvider";
import SuccessPopup from "./SuccessPopup";

const strengths = [
  {
    en: "Product-minded development",
    ru: "Продуктовый подход",
    descriptionEn:
      "I connect implementation decisions with user and business goals.",
    descriptionRu:
      "Связываю технические решения с задачами пользователей и бизнеса.",
  },
  {
    en: "End-to-end ownership",
    ru: "Работа от идеи до запуска",
    descriptionEn:
      "I can take a feature from interface and data model to deployment.",
    descriptionRu:
      "Могу провести задачу от интерфейса и модели данных до деплоя.",
  },
  {
    en: "Clear collaboration",
    ru: "Понятная коммуникация",
    descriptionEn:
      "I document decisions, surface risks early and keep progress visible.",
    descriptionRu:
      "Фиксирую решения, заранее обозначаю риски и показываю прогресс.",
  },
];

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Git",
  "Figma",
];

const selectedProjects = [
  {
    name: "Campus And Code",
    href: "/projects/campus-and-code",
    en: "Full-stack learning platform with persistent data and supporting services.",
    ru: "Full-stack платформа для обучения с базой данных и вспомогательными сервисами.",
  },
  {
    name: "Market AI",
    href: "/projects/market-ai",
    en: "AI-oriented application built as connected frontend and backend services.",
    ru: "AI-приложение из связанных frontend- и backend-сервисов.",
  },
  {
    name: "Kmstudy",
    href: "/projects/kmstudy",
    en: "Production website with booking, reviews and contact integrations.",
    ru: "Рабочий сайт с записью, отзывами и интеграциями форм обратной связи.",
  },
];

/** Presents a concise, recruiter-focused profile with localized CV downloads. */
export default function HireMePageContent() {
  const { localizedHref, t } = usePreferences();
  const [isEmploymentPopupOpen, setIsEmploymentPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <main id="hire-top" className="hire-page">
      <div className="projects-archive-shell">
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
            <Link href={localizedHref("/#projects")}>
              {t("projects", "проекты")}
            </Link>
            <Link href={localizedHref("/#about")}>{t("about", "обо мне")}</Link>
            <Link href={localizedHref("/#services")}>
              {t("services", "услуги")}
            </Link>
            <Link href={localizedHref("/pricing")}>{t("pricing", "цены")}</Link>
            <Link
              href={localizedHref("/hire-me")}
              className="is-active"
              aria-current="page"
            >
              {t("hire me", "для компаний")}
            </Link>
            <Link href={localizedHref("/#contact")}>
              {t("contact", "контакты")}
            </Link>
          </nav>

          <div className="projects-archive-header-actions">
            <PreferenceControls compact />
            <button
              type="button"
              className="projects-archive-order"
              onClick={() => setIsEmploymentPopupOpen(true)}
            >
              {t("contact me", "связаться")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="hire-hero" aria-labelledby="hire-title">
          <div className="hire-hero-copy">
            {/* <span className="section-kicker">
              {t("open to opportunities", "открыт к предложениям")}
            </span> */}
            <h1 id="hire-title" className="font-dot">
              {t(
                "let’s build useful products",
                "давайте создавать полезные продукты",
              )}
            </h1>
            <p>
              {t(
                "I’m Egor Yakovlev, a full-stack developer focused on thoughtful interfaces, reliable application logic and shipping useful web products.",
                "Я Егор Яковлев, full-stack разработчик. Создаю продуманные интерфейсы, надёжную логику приложений и полезные веб-продукты.",
              )}
            </p>
            <div className="hire-actions">
              <button
                type="button"
                className="hire-primary-action"
                onClick={() => setIsEmploymentPopupOpen(true)}
              >
                {t("discuss a position", "обсудить позицию")}
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <Link
                className="hire-secondary-action"
                href={localizedHref("/projects")}
              >
                {t("view projects", "смотреть проекты")}
              </Link>
            </div>
          </div>

          <dl className="hire-facts">
            <div>
              <dt>{t("work format", "формат работы")}</dt>
              <dd>
                {t(
                  "full-time · contract · remote · office (Yekaterinburg only)",
                  "full-time · контракт · удалённо · офис (Только Екатеринбург)",
                )}
              </dd>
            </div>
            <div>
              <dt>{t("time zones", "часовые пояса")}</dt>
              <dd>
                <Clock3 size={16} aria-hidden="true" />{" "}
                {t("Yekaterinburg · Moscow", "Екатеринбург · Москва")}
              </dd>
              <small>UTC+5 · UTC+3</small>
            </div>
            <div>
              <dt>{t("location", "локация")}</dt>
              <dd>
                <MapPin size={16} aria-hidden="true" /> {t("Russia", "Россия")}
              </dd>
            </div>
            <div>
              <dt>{t("specialization", "специализация")}</dt>
              <dd>full-stack web development</dd>
            </div>
          </dl>
        </section>

        <section
          className="hire-section hire-strengths"
          aria-labelledby="strengths-title"
        >
          <div className="hire-section-heading">
            <span>01</span>
            <h2 id="strengths-title">
              {t("what I bring", "чем буду полезен")}
            </h2>
          </div>
          <div className="hire-strength-grid">
            {strengths.map((item) => (
              <article key={item.en}>
                <h3>{t(item.en, item.ru)}</h3>
                <p>{t(item.descriptionEn, item.descriptionRu)}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="hire-section hire-stack"
          aria-labelledby="stack-title"
        >
          <div className="hire-section-heading">
            <span>02</span>
            <h2 id="stack-title">{t("core stack", "основной стек")}</h2>
          </div>
          <ul>
            {stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>

        <section
          className="hire-section hire-projects"
          aria-labelledby="hire-projects-title"
        >
          <div className="hire-section-heading">
            <span>03</span>
            <h2 id="hire-projects-title">
              {t("selected work", "избранные работы")}
            </h2>
          </div>
          <div className="hire-project-list">
            {selectedProjects.map((project, index) => (
              <Link key={project.name} href={localizedHref(project.href)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{project.name}</h3>
                  <p>{t(project.en, project.ru)}</p>
                </div>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="hire-cv" aria-labelledby="cv-title">
          <div>
            <span className="section-kicker">
              {t("curriculum vitae", "резюме")}
            </span>
            <h2 id="cv-title">{t("choose your language", "выберите язык")}</h2>
            <p>
              {t(
                "PDF versions with experience, education and contacts.",
                "PDF-версии с опытом, образованием и контактами.",
              )}
            </p>
          </div>
          <div className="hire-cv-actions">
            <a href="/cv/Egor_Yakovlev_CV_EN.pdf" download>
              <Download size={17} aria-hidden="true" /> Download CV — EN
            </a>
            <a href="/cv/Egor_Yakovlev_CV_RU.pdf" download>
              <Download size={17} aria-hidden="true" /> Скачать CV — RU
            </a>
          </div>
        </section>

        <section className="hire-contact">
          <div>
            <span>{t("have a role in mind?", "есть подходящая позиция?")}</span>
            <h2>{t("let’s talk", "давайте обсудим")}</h2>
          </div>
          <div>
            <a href="mailto:saoffabg@gmail.com">
              saoffabg@gmail.com <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="https://t.me/lege0rge" target="_blank" rel="noreferrer">
              telegram <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <Footer topHref="#hire-top" />
      </div>

      <EmploymentPopup
        isOpen={isEmploymentPopupOpen}
        onClose={() => setIsEmploymentPopupOpen(false)}
        onSuccess={showSuccessPopup}
      />
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </main>
  );
}
