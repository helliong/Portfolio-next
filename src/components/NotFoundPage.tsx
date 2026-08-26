"use client";

import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";
import PreferenceControls from "@/components/PreferenceControls";
import SiteProviders from "@/components/SiteProviders";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NotFoundContent() {
  const { localizedHref, t } = usePreferences();

  return (
    <main id="not-found-top" className="not-found-page">
      <div className="not-found-shell">
        <header className="legal-header">
          <Link href={localizedHref("/")} className="legal-brand" aria-label="Portfolio home">
            <Image
              src="/logoWhite.svg"
              alt="EY"
              width={52}
              height={36}
              className="footer-logo-dark"
              priority
            />
            <Image
              src="/logoBlack.svg"
              alt="EY"
              width={52}
              height={36}
              className="footer-logo-light"
              priority
            />
          </Link>
          <div className="legal-header-actions"><PreferenceControls compact /><span className="not-found-status"><span aria-hidden="true" /> {t("error", "Р С•РЎв‚¬Р С‘Р В±Р С”Р В°")} / 404</span></div>
        </header>

        <section className="not-found-content">
          <div className="not-found-code" aria-hidden="true">
            <span>4</span>
            <span className="not-found-zero">0</span>
            <span>4</span>
          </div>

          <div className="not-found-message">
            <span className="not-found-kicker">{t("lost in the stack", "Р С—Р С•РЎвЂљР ВµРЎР‚РЎРЏР Р…Р С• Р Р† РЎРѓРЎвЂљР ВµР С”Р Вµ")} / 01</span>
            <h1>
              {t("page not found", "РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ Р В° Р Р…Р Вµ Р Р…Р В°Р в„–Р Т‘Р ВµР Р…Р В°")}
              <span className="blink-cursor" aria-hidden="true" />
            </h1>
            <p>
              {t("The page may have moved, been removed, or never existed. Let's get you back somewhere useful.", "Р вЂ™Р С•Р В·Р СР С•Р В¶Р Р…Р С•, РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ Р В° Р В±РЎвЂ№Р В»Р В° Р С—Р ВµРЎР‚Р ВµР СР ВµРЎвЂ°Р ВµР Р…Р В°, РЎС“Р Т‘Р В°Р В»Р ВµР Р…Р В° Р С‘Р В»Р С‘ Р Р…Р С‘Р С”Р С•Р С–Р Т‘Р В° Р Р…Р Вµ РЎРѓРЎС“РЎвЂ°Р ВµРЎРѓРЎвЂљР Р†Р С•Р Р†Р В°Р В»Р В°. Р вЂ™Р ВµРЎР‚Р Р…РЎвЂР СРЎРѓРЎРЏ Р С” Р С—Р С•Р В»Р ВµР В·Р Р…Р С•Р СРЎС“.")}
            </p>

            <div className="not-found-actions">
              <Link href={localizedHref("/")} className="not-found-primary-action">
                <ArrowLeft size={16} aria-hidden="true" /> {t("back home", "Р Р…Р В° Р С–Р В»Р В°Р Р†Р Р…РЎС“РЎР‹")}
              </Link>
              <Link href={localizedHref("/projects")} className="not-found-secondary-action">
                {t("view projects", "РЎРѓР СР С•РЎвЂљРЎР‚Р ВµРЎвЂљРЎРЉ Р С—РЎР‚Р С•Р ВµР С”РЎвЂљРЎвЂ№")} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <Footer topHref="#not-found-top" />
      </div>
    </main>
  );
}

/** Renders the fallback shown when a route cannot be found. */
export default function NotFoundPage() {
  const pathname = usePathname();
  const pathLocale = pathname.split("/")[1];
  const language = pathLocale === "ru" ? "ru" : "en";

  return (
    <SiteProviders language={language}>
      <NotFoundContent />
    </SiteProviders>
  );
}
