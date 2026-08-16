"use client";

import { usePreferences } from "./PreferencesProvider";

// Describes the service cards displayed in the capabilities section.
const services = [
  {
    number: "01",
    title: "web development",
    description: "Building fast, responsive and scalable web applications with a maintainable full-stack architecture.",
    items: ["Custom web applications", "Responsive layout", "API integration", "Deployment"],
  },
  {
    number: "02",
    title: "ui implementation",
    description: "Turning layouts into precise, accessible interfaces that remain comfortable on every screen.",
    items: ["Figma to code", "Component systems", "Interaction states", "Cross-browser support"],
  },
  {
    number: "03",
    title: "performance & accessibility",
    description: "Improving loading, semantics and usability so a product feels clear and dependable in daily use.",
    items: ["Core Web Vitals", "Accessibility", "SEO foundations", "Code splitting"],
  },
];

/** Renders the developer services and their key deliverables. */
export default function WhatICanDo() {
  const { language, t } = usePreferences();
  const localizedServices = language === "ru" ? [
    { number: "01", title: "веб-разработка", description: "Создание быстрых, адаптивных и масштабируемых веб-приложений с поддерживаемой full-stack архитектурой.", items: ["Веб-приложения на заказ", "Адаптивная вёрстка", "Интеграция API", "Развёртывание"] },
    { number: "02", title: "реализация интерфейсов", description: "Превращение макетов в точные и доступные интерфейсы, удобные на любом экране.", items: ["Из Figma в код", "Системы компонентов", "Состояния взаимодействия", "Поддержка браузеров"] },
    { number: "03", title: "скорость и доступность", description: "Улучшение загрузки, семантики и удобства, чтобы продукт был понятным и надёжным.", items: ["Core Web Vitals", "Доступность", "Основы SEO", "Разделение кода"] },
  ] : services;
  return (
    <section id="services" className="portfolio-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>{t("services / what I do", "услуги / что я делаю")}</h2>
      </div>

      <div className="services-grid">
        {localizedServices.map((service) => (
          <article key={service.number} className="service-item">
            <span className="service-number">{service.number}</span>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
