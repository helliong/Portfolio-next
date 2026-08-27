"use client";

import { localizedPath, type Locale } from "@/i18n";
import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

export type Language = Locale;
export type Theme = "dark" | "light";

type Preferences = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  localizedHref: (href: string) => string;
  t: (english: string, russian: string) => string;
};

const PreferencesContext = createContext<Preferences | null>(null);

const languageKey = "portfolio-language";
const themeKey = "portfolio-theme";

export default function PreferencesProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>("dark");

  // Restore visual preferences after hydration while route params keep language SEO-stable.
  useLayoutEffect(() => {
    let nextTheme: Theme = document.body.classList.contains("light") ? "light" : "dark";

    try {
      const storedTheme = window.localStorage.getItem(themeKey);
      if (storedTheme === "dark" || storedTheme === "light") nextTheme = storedTheme;
      window.localStorage.setItem(languageKey, initialLanguage);
    } catch {
      // Defaults remain available when browser storage is blocked.
    }

    document.documentElement.lang = initialLanguage;
    document.body.classList.toggle("light", nextTheme === "light");
    setLanguageState(initialLanguage);
    setTheme(nextTheme);
  }, [initialLanguage]);

  useLayoutEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
    try { window.localStorage.setItem(languageKey, nextLanguage); } catch {}
  };

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      try { window.localStorage.setItem(themeKey, nextTheme); } catch {}
      return nextTheme;
    });
  };

  const value = useMemo(() => ({
    language,
    theme,
    setLanguage,
    toggleTheme,
    localizedHref: (href: string) => localizedPath(href, language),
    t: (english: string, russian: string) => (language === "ru" ? russian : english),
  }), [language, theme]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
