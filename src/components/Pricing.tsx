"use client";

import { getPricingContent } from "@/data/pricing";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePreferences } from "./PreferencesProvider";

/** Renders indicative localized prices for common website packages. */
export default function Pricing() {
  const { language, localizedHref, t } = usePreferences();
  const { packages } = getPricingContent(language);

  return (
    <section id="pricing" className="portfolio-section pricing-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>{t("pricing / starting points", "стоимость / ориентиры")}</h2>
      </div>

      <div className="pricing-grid">
        {packages.map((item, index) => (
          <article key={item.title} className="pricing-item">
            <div className="pricing-topline">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.timeline}</small>
            </div>
            <h3>{item.title}</h3>
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

      <div className="pricing-section-footer">
        <p>
          {t(
            "Need integrations, redesign or support? The full pricing page has add-ons too.",
            "Нужны интеграции, редизайн или поддержка? На странице цен есть и дополнительные услуги.",
          )}
        </p>
        <Link href={localizedHref("/pricing")} className="pricing-more-link">
          {t("all services and pricing", "все услуги и цены")}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
