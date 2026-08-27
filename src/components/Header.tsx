"use client";

import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PreferenceControls from "./PreferenceControls";
import { usePreferences } from "./PreferencesProvider";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";

/** Renders primary navigation and controls the theme and contact dialogs. */
export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { localizedHref, theme, t } = usePreferences();
  const navItems = [
    ["projects", "проекты"],
    ["about", "обо мне"],
    ["services", "услуги"],
    ["pricing", "цены"],
    ["contact", "контакты"],
  ];

  /** Displays a short confirmation after a successful form submission. */
  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <header id="home" className="site-header">
      <div className="topbar">
        <a
          href="#home"
          aria-label={t("Back to top", "Наверх")}
          className="brand-mark"
        >
          <Image
            src="/logoWhite.svg"
            alt="Egor Yakovlev"
            width={52}
            height={36}
            className="footer-logo-dark"
            priority
          />
          <Image
            src="/logoBlack.svg"
            alt="Egor Yakovlev"
            width={52}
            height={36}
            className="footer-logo-light"
            priority
          />
        </a>

        <nav
          className="desktop-nav"
          aria-label={t("Primary navigation", "Основная навигация")}
        >
          {navItems.map(([id, ru]) => (
            <a key={id} href={`#${id}`}>
              {t(id, ru)}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            type="button"
            className="order-action"
            onClick={() => setIsPopupOpen(true)}
          >
            <span>{t("order a website", "заказать сайт")}</span>
            <small>20% OFF</small>
          </button>
          <span className="topbar-divider" aria-hidden="true" />
          <PreferenceControls showThemeLabel />
        </div>

        <nav
          className="mobile-nav"
          aria-label={t("Mobile navigation", "Мобильная навигация")}
        >
          {navItems.map(([id, ru]) => (
            <a key={id} href={`#${id}`}>
              {t(id, ru)}
            </a>
          ))}
        </nav>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <div>
            <h1 className="font-dot">
              <span className="hero-title-line">
                {t("full-stack web", "full-stack веб")}
              </span>
              <br />
              {t("developer", "разработчик")}
              <span className="blink-cursor" aria-hidden="true" />
            </h1>
            <p>
              {t(
                "I build fast, accessible and focused web experiences.",
                "Создаю быстрые, доступные и продуманные веб-продукты.",
              )}
            </p>
          </div>

          <div className="hero-meta">
            <span className="status-label">
              {t("available for freelance", "доступен для проектов")}
            </span>
            <span className="meta-separator" aria-hidden="true" />
            <span>
              <MapPin size={14} aria-hidden="true" />{" "}
              {t("based in Russia", "нахожусь в России")}
            </span>
            <span className="meta-separator" aria-hidden="true" />
            <span>UTC +6</span>
          </div>

          <a href="#projects" className="scroll-link">
            <ArrowDown size={18} aria-hidden="true" />
            {t("scroll to explore", "листайте дальше")}
          </a>
        </div>

        <article className="featured-project">
          <div className="featured-heading">
            <span className="section-kicker">
              {t("selected project", "избранный проект")}
            </span>
            <div className="featured-title-row">
              <h2>pin window</h2>
              <span className="status-label">
                {t("open source", "открытый код")}
              </span>
            </div>
          </div>

          <Link
            href={localizedHref("/projects/pinwindow")}
            className="featured-media"
          >
            <Image
              src="/assets/img/projects/mockup-pinwindow.webp"
              alt="QR Link Generator project preview"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
              priority
            />
          </Link>

          <div className="featured-footer">
            <Link
              href={localizedHref("/projects/pinwindow")}
              className="text-link"
            >
              {t("view project", "смотреть проект")}{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <div className="featured-facts">
              <span>
                <small>{t("role", "роль")}</small>
                {t("developer", "разработчик")}
              </span>
              <span>
                <small>stack</small>typescript
              </span>
              <span>
                <small>{t("status", "статус")}</small>
                {t("published", "опубликован")}
              </span>
            </div>
          </div>
        </article>
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
    </header>
  );
}
