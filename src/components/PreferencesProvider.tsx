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

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  try {
    const storedTheme = window.localStorage.getItem(themeKey);
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
  } catch {
    // Fall through to the DOM class applied by the early preference script.
  }

  return document.body.classList.contains("light") ? "light" : "dark";
}

function toWindows1251Byte(char: string) {
  const code = char.charCodeAt(0);
  const special: Record<number, number> = {
    0x0402: 0x80,
    0x0403: 0x81,
    0x201a: 0x82,
    0x0453: 0x83,
    0x201e: 0x84,
    0x2026: 0x85,
    0x2020: 0x86,
    0x2021: 0x87,
    0x20ac: 0x88,
    0x2030: 0x89,
    0x0409: 0x8a,
    0x2039: 0x8b,
    0x040a: 0x8c,
    0x040c: 0x8d,
    0x040b: 0x8e,
    0x040f: 0x8f,
    0x0452: 0x90,
    0x2018: 0x91,
    0x2019: 0x92,
    0x201c: 0x93,
    0x201d: 0x94,
    0x2022: 0x95,
    0x2013: 0x96,
    0x2014: 0x97,
    0x2122: 0x99,
    0x0459: 0x9a,
    0x203a: 0x9b,
    0x045a: 0x9c,
    0x045c: 0x9d,
    0x045b: 0x9e,
    0x045f: 0x9f,
    0x00a0: 0xa0,
    0x040e: 0xa1,
    0x045e: 0xa2,
    0x0408: 0xa3,
    0x00a4: 0xa4,
    0x0490: 0xa5,
    0x00a6: 0xa6,
    0x00a7: 0xa7,
    0x0401: 0xa8,
    0x00a9: 0xa9,
    0x0404: 0xaa,
    0x00ab: 0xab,
    0x00ac: 0xac,
    0x00ad: 0xad,
    0x00ae: 0xae,
    0x0407: 0xaf,
    0x00b0: 0xb0,
    0x00b1: 0xb1,
    0x0406: 0xb2,
    0x0456: 0xb3,
    0x0491: 0xb4,
    0x00b5: 0xb5,
    0x00b6: 0xb6,
    0x00b7: 0xb7,
    0x0451: 0xb8,
    0x2116: 0xb9,
    0x0454: 0xba,
    0x00bb: 0xbb,
    0x0458: 0xbc,
    0x0405: 0xbd,
    0x0455: 0xbe,
    0x0457: 0xbf,
  };

  if (code >= 0x0410 && code <= 0x044f) return code - 0x350;
  if (code >= 0x0000 && code <= 0x007f) return code;
  if (special[code] !== undefined) return special[code];

  return null;
}

function decodeMojibake(value: string) {
  const bytes: number[] = [];

  for (const char of value) {
    const byte = toWindows1251Byte(char);
    if (byte === null) return value;
    bytes.push(byte);
  }

  const decoded = new TextDecoder("utf-8", { fatal: false }).decode(
    Uint8Array.from(bytes),
  );

  return decoded.includes("\uFFFD") ? value : decoded;
}

export default function PreferencesProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

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
    t: (english: string, russian: string) => language === "ru" ? decodeMojibake(russian) : english,
  }), [language, theme]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
