"use client";

import { getPricingContent } from "@/data/pricing";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import Footer from "./Footer";
import PreferenceControls from "./PreferenceControls";
import { usePreferences } from "./PreferencesProvider";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";

export type PricingTab = "packages" | "extras";
const pricingTabs: PricingTab[] = ["packages", "extras"];

function pricingTabFromSearch(search: string): PricingTab {
  const params = new URLSearchParams(search);
  return pricingTabs.find((tab) => params.has(tab)) ?? "packages";
}

function setPricingTabUrl(tab: PricingTab) {
  const url = new URL(window.location.href);
  url.search = `?${tab}`;
  window.history.pushState(null, "", url);
}

type Props = {
  initialTab?: PricingTab;
};

/** Renders the dedicated localized pricing route with packages and add-on services. */
export default function PricingPageContent({ initialTab = "packages" }: Props) {
  const { language, localizedHref, t } = usePreferences();
  const [activeTab, setActiveTab] = useState<PricingTab>(initialTab);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { packages, extras } = getPricingContent(language);

  useLayoutEffect(() => {
    setActiveTab(pricingTabFromSearch(window.location.search));

    const handlePopState = () => {
      setActiveTab(pricingTabFromSearch(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <main id="pricing-top" className="pricing-page">
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
            <Link
              href={localizedHref("/pricing")}
              className="is-active"
              aria-current="page"
            >
              {t("pricing", "цены")}
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
              onClick={() => setIsPopupOpen(true)}
            >
              {t("order a website", "заказать сайт")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="pricing-page-intro" aria-labelledby="pricing-title">
          <div>
            <h1 id="pricing-title" className="font-dot">
              {t("packages & extras", "пакеты и доп. услуги")}
            </h1>
          </div>
          <p>
            {t(
              "Indicative starting points for common web projects. Final scope depends on content, integrations and launch requirements.",
              "Ориентировочные стартовые цены для типовых веб-проектов. Финальная смета зависит от контента, интеграций и требований к запуску.",
            )}
          </p>
        </section>

        <div
          className="pricing-tabs"
          role="tablist"
          aria-label={t("Pricing sections", "Разделы цен")}
        >
          <button
            id="packages-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "packages"}
            aria-controls="packages-panel"
            className={activeTab === "packages" ? "is-active" : undefined}
            onClick={() => {
              setActiveTab("packages");
              setPricingTabUrl("packages");
            }}
          >
            {t("main packages", "основные пакеты")}
          </button>
          <button
            id="extras-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "extras"}
            aria-controls="extras-panel"
            className={activeTab === "extras" ? "is-active" : undefined}
            onClick={() => {
              setActiveTab("extras");
              setPricingTabUrl("extras");
            }}
          >
            {t("add-on services", "доп. услуги")}
          </button>
        </div>

        <section
          id="packages-panel"
          role="tabpanel"
          aria-labelledby="packages-tab"
          hidden={activeTab !== "packages"}
          className="pricing-page-panel"
        >
          <div className="pricing-detail-grid">
            {packages.map((item, index) => (
              <article key={item.title} className="pricing-detail-item">
                <div className="pricing-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{item.timeline}</small>
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <strong>
                  {t("from", "от")} {item.price}
                </strong>
                <ul>
                  {item.items.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="extras-panel"
          role="tabpanel"
          aria-labelledby="extras-tab"
          hidden={activeTab !== "extras"}
          className="pricing-page-panel"
        >
          <div className="pricing-extra-grid">
            {extras.map((item, index) => {
              const [price, period] = item.price.split(" / ");

              return (
                <article key={item.title} className="pricing-extra-item">
                  <span className="pricing-extra-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <strong>
                    <span>{t("from", "от")} {price}</span>
                    {period && <span className="pricing-price-period"> / {period}</span>}
                  </strong>
                  <small>{item.timeline}</small>
                </article>
              );
            })}
          </div>
        </section>

        <section className="pricing-page-cta">
          <div>
            <h2>{t("have a custom scope?", "нужна нестандартная смета?")}</h2>
            <p>
              {t(
                "Send the project context and I will help combine the right package and add-ons.",
                "Опишите задачу, и я помогу собрать подходящий пакет и дополнительные услуги.",
              )}
            </p>
          </div>
          <button
            type="button"
            className="pricing-page-button"
            onClick={() => setIsPopupOpen(true)}
          >
            {t("discuss a project", "обсудить проект")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </section>

        <Footer topHref="#pricing-top" />
      </div>

      <SelfServicePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={showSuccessPopup}
        initialProjectType={activeTab === "extras" ? "Additional services" : "Landing page"}
      />
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </main>
  );
}
