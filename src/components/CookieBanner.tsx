"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const consentKey = "portfolio-cookie-consent";

type Consent = "accepted" | "declined";

/** Requests a privacy preference once and remembers it in this browser. */
export default function CookieBanner() {
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
    <aside className="cookie-banner" aria-label="Cookie notice" role="region">
      <div className="cookie-banner-copy">
        <span className="cookie-banner-label">privacy / cookies</span>
        <p>
          Essential browser storage remembers your privacy choice and keeps forms working.
          No optional, advertising or analytics cookies are currently used. Read the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>

      <div className="cookie-banner-actions">
        <button type="button" onClick={() => saveConsent("declined")}>
          decline
        </button>
        <button
          type="button"
          className="cookie-banner-accept"
          onClick={() => saveConsent("accepted")}
        >
          accept
        </button>
      </div>
    </aside>
  );
}
