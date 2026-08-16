"use client";

import { projects } from "@/data/projects";
import Image from "next/image";
import { usePreferences } from "./PreferencesProvider";

/** Renders the developer introduction, project count, and personal mark. */
export default function About() {
  const { t } = usePreferences();
  return (
    <section id="about" className="portfolio-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>{t("about / developer", "обо мне / разработчик")}</h2>
      </div>

      <div className="about-grid">
        <div className="about-statement">
          {t("I turn clear ideas into fast, thoughtful web experiences.", "Превращаю ясные идеи в быстрые и продуманные веб-продукты.")}
        </div>

        <div className="about-details">
          <p>
            {t("I'm Egor Yakovlev, a full-stack developer based in Russia. I build responsive interfaces and practical web products with close attention to structure, performance and the details people notice.", "Я Егор Яковлев, full-stack разработчик из России. Создаю адаптивные интерфейсы и практичные веб-продукты, уделяя внимание структуре, производительности и важным деталям.")}
          </p>
          <div className="about-stats">
            <div><strong>{projects.length}+</strong><span>{t("projects", "проектов")}</span></div>
            <div><strong>{t("Russia", "Россия")}</strong><span>{t("location", "локация")}</span></div>
            <div><strong>100%</strong><span>{t("attention", "внимания")}</span></div>
          </div>
        </div>

        <div className="about-mark" aria-label="Egor Yakovlev logo">
          <span className="about-mark-logo">
            <Image
              src="/logoWhite.svg"
              alt=""
              width={182}
              height={130}
            />
          </span>
          <i aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
