"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

export type Language = "en" | "ru";
export type Theme = "dark" | "light";

type Preferences = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  t: (english: string, russian: string) => string;
};

const PreferencesContext = createContext<Preferences | null>(null);

const languageKey = "portfolio-language";
const themeKey = "portfolio-theme";

export default function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  // Restore preferences after hydration while the inline layout script prevents a theme flash.
  useLayoutEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem(languageKey);
      const storedTheme = window.localStorage.getItem(themeKey);
      if (storedLanguage === "en" || storedLanguage === "ru") setLanguageState(storedLanguage);
      if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    } catch {
      // Defaults remain available when browser storage is blocked.
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
    try { window.localStorage.setItem(languageKey, nextLanguage); } catch {}
  };

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      document.body.classList.toggle("light", nextTheme === "light");
      try { window.localStorage.setItem(themeKey, nextTheme); } catch {}
      return nextTheme;
    });
  };

  const value = useMemo(() => ({
    language,
    theme,
    setLanguage,
    toggleTheme,
    t: (english: string, russian: string) => language === "ru" ? russian : english,
  }), [language, theme]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
