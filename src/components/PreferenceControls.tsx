"use client";

import { Moon, Sun } from "lucide-react";
import { usePreferences } from "./PreferencesProvider";

type Props = { compact?: boolean; showThemeLabel?: boolean };

export default function PreferenceControls({ compact = false, showThemeLabel = false }: Props) {
  const { language, setLanguage, theme, toggleTheme, t } = usePreferences();
  const isLight = theme === "light";

  return (
    <div className={`preference-controls${compact ? " is-compact" : ""}`}>
      <div className="language-switch" aria-label={t("Choose language", "Выбрать язык")}>
        <button type="button" className={language === "en" ? "is-active" : undefined} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" className={language === "ru" ? "is-active" : undefined} onClick={() => setLanguage("ru")} aria-pressed={language === "ru"}>RU</button>
      </div>
      <button type="button" className="theme-switch" onClick={toggleTheme} aria-label={isLight ? t("Switch to dark mode", "Включить тёмную тему") : t("Switch to light mode", "Включить светлую тему")}>
        {isLight ? <Moon size={17} /> : <Sun size={17} />}
        {showThemeLabel && <span>{isLight ? t("dark mode", "тёмная тема") : t("light mode", "светлая тема")}</span>}
      </button>
    </div>
  );
}
