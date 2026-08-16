"use client";

import { usePreferences } from "./PreferencesProvider";

// Defines the ordered stages shown in the project workflow section.
const steps = [
  ["01", "discovery", "Understanding the goal, audience and project requirements."],
  ["02", "direction", "Defining structure, references and the visual approach."],
  ["03", "development", "Building clean, scalable and performant code."],
  ["04", "launch", "Testing, polishing and preparing the project for release."],
];

/** Renders the project workflow as a numbered sequence. */
export default function Process() {
  const { language, t } = usePreferences();
  const localizedSteps = language === "ru" ? [
    ["01", "знакомство", "Определяем цель, аудиторию и требования проекта."],
    ["02", "направление", "Формируем структуру, референсы и визуальный подход."],
    ["03", "разработка", "Пишем чистый, масштабируемый и производительный код."],
    ["04", "запуск", "Тестируем, шлифуем и готовим проект к публикации."],
  ] : steps;
  return (
    <section className="portfolio-section process-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>{t("process / how we work", "процесс / как мы работаем")}</h2>
      </div>
      <div className="process-grid">
        {localizedSteps.map(([number, title, description]) => (
          <article key={number}>
            <div><span>{number}</span><h3>{title}</h3></div>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
