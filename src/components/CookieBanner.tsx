"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePreferences } from "./PreferencesProvider";

const consentKey = "portfolio-cookie-consent";

type Consent = "accepted" | "declined";

/** Requests a privacy preference once and remembers it in this browser. */
export default function CookieBanner() {
  const { t } = usePreferences();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(window.localStorage.getItem(consentKey) === null);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (consent: Consent) => {
    try {
      window.localStorage.setItem(consentKey, consent);
    } catch {
      // The banner can still be dismissed when browser storage is unavailable.
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="cookie-banner" aria-label={t("Cookie notice", "Уведомление о cookies")} role="region">
      <div className="cookie-banner-copy">
        <span className="cookie-banner-label">{t("privacy / cookies", "конфиденциальность / cookies")}</span>
        <p>
          {t("Essential browser storage remembers your privacy choice and keeps forms working. No optional, advertising or analytics cookies are currently used. Read the", "Необходимое хранилище браузера запоминает ваш выбор и обеспечивает работу форм. Рекламные и аналитические cookies не используются. Подробнее:")} {" "}
          <Link href="/privacy">{t("privacy policy", "политика конфиденциальности")}</Link>.
        </p>
      </div>

      <div className="cookie-banner-actions">
        <button type="button" onClick={() => saveConsent("declined")}>
          {t("decline", "отклонить")}
        </button>
        <button
          type="button"
          className="cookie-banner-accept"
          onClick={() => saveConsent("accepted")}
        >
          {t("accept", "принять")}
        </button>
      </div>
    </aside>
  );
}
