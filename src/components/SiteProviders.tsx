"use client";

import type { Language } from "./PreferencesProvider";
import CookieBanner from "./CookieBanner";
import PreferencesProvider from "./PreferencesProvider";

export default function SiteProviders({
  children,
  language,
}: {
  children: React.ReactNode;
  language: Language;
}) {
  return (
    <PreferencesProvider initialLanguage={language}>
      {children}
      <CookieBanner />
    </PreferencesProvider>
  );
}

