"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PreferenceControls from "./PreferenceControls";
import { usePreferences } from "./PreferencesProvider";

type Props = { topHref?: string };

/** Renders site credits, preferences, branding, and the back-to-top link. */
export default function Footer({ topHref = "#home" }: Props) {
  const { localizedHref, t } = usePreferences();

  return (
    <footer className="site-footer">
      <div className="footer-meta">
        <Link href={localizedHref("/")} className="footer-brand" aria-label={t("Portfolio home", "Р“Р»Р°РІРЅР°СЏ РїРѕСЂС‚С„РѕР»РёРѕ")}>
          <Image src="/logoWhite.svg" alt="EY" width={52} height={36} className="footer-logo-dark" />
          <Image src="/logoBlack.svg" alt="EY" width={52} height={36} className="footer-logo-light" />
        </Link>
        <span className="footer-copyright">© {new Date().getFullYear()}</span>
        <PreferenceControls compact />
      </div>
      <span className="footer-credit">
        {t("built by", "СЃРѕР·РґР°РЅРѕ")}{" "}
        <a href="https://github.com/helliong" target="_blank" rel="noreferrer">helliong</a>
      </span>
      <div className="footer-links">
        <Link href={localizedHref("/privacy")}>{t("privacy policy", "РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ")}</Link>
        <Link href={topHref}>{t("back to top", "РЅР°РІРµСЂС…")} <ArrowUp size={15} aria-hidden="true" /></Link>
      </div>
    </footer>
  );
}
