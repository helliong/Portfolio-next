import type { Project } from "./projects";
import type { Language } from "@/components/PreferencesProvider";

const LIVE_HIDDEN_TAG = "live-hidden";

export type ProjectDetails = Project & {
  summary: string;
  overview: string;
  features: string[];
  liveDemo?: string | null;
};

type ProjectOverride = Pick<
  ProjectDetails,
  "summary" | "overview" | "features"
> & {
  liveDemo?: string;
};

// Adds editorial copy that is not available from the generated GitHub data.
const projectOverrides: Record<string, ProjectOverride> = {
  pinwindow: {
    summary:
      "A lightweight Windows utility for keeping any selected window above the rest of the desktop.",
    overview:
      "PinWindow is a focused desktop tool built for the moments when one application needs to stay visible while you work elsewhere. The project keeps the interaction simple and gives the user direct control over the always-on-top state without adding a heavy background application.",
    features: [
      "Select a window and keep it always on top",
      "Quickly enable or disable the pinned state",
      "Native Windows behavior in a compact utility",
      "Minimal interface designed for a single clear task",
    ],
  },
  "lumea-candles": {
    summary:
      "A responsive storefront concept for a handmade candle brand with a calm, product-led interface.",
    overview:
      "Lumea Candles explores an ecommerce experience centered on clear product presentation and a consistent visual identity. The application is structured with reusable components and responsive layouts so the catalogue remains comfortable to browse across screen sizes.",
    features: [
      "Responsive product catalogue",
      "Reusable product and content components",
      "Typed application structure",
      "Mobile and desktop layouts",
    ],
  },
  "campus-and-code": {
    summary:
      "A full-stack learning platform that connects a modern frontend with persistent data and supporting services.",
    overview:
      "Campus And Code is a larger application focused on organizing educational content and user interactions. It combines a typed Next.js interface with a PostgreSQL data layer, file storage, email delivery and containerized services.",
    features: [
      "Structured learning content and application pages",
      "Persistent data stored in PostgreSQL",
      "Email notifications through Nodemailer",
      "S3-compatible file storage and Docker-based setup",
    ],
  },
  "market-ai": {
    summary:
      "An AI-oriented market application built as a set of connected frontend and backend services.",
    overview:
      "Market AI is an experiment in combining a modern web interface with an isolated service architecture. The project uses typed frontend code and containerized services to keep responsibilities separated and make integrations easier to develop and deploy.",
    features: [
      "Market-focused interface and data presentation",
      "Service-based application architecture",
      "Containerized local environment",
      "Responsive React interface",
    ],
  },
  linkcast: {
    summary:
      "A Python utility for working with links through a small, task-focused workflow.",
    overview:
      "Linkcast is a compact Python project built around processing and sharing links without unnecessary interface complexity. It keeps the implementation direct and makes the core workflow easy to run and extend.",
    features: [
      "Link input and processing workflow",
      "Compact Python implementation",
      "Clear task-oriented interaction",
      "Simple foundation for further integrations",
    ],
  },
  "qr-link-generator": {
    summary:
      "A typed web utility that turns links into QR codes ready to preview and share.",
    overview:
      "QR Link Generator provides a straightforward way to create a QR code from a URL. The interface keeps attention on the input, generated result and quick repeat use while TypeScript keeps the data flow predictable.",
    features: [
      "Generate a QR code from a URL",
      "Immediate result preview",
      "Input validation and typed state",
      "Responsive utility interface",
    ],
  },
  "bmi-calculator": {
    summary:
      "A Python calculator for estimating body mass index from a small set of user inputs.",
    overview:
      "BMI Calculator is a concise Python project that turns height and weight values into a readable BMI result. The implementation focuses on input handling, calculation logic and clear output.",
    features: [
      "Height and weight input",
      "Automatic BMI calculation",
      "Readable result classification",
      "Input checks for valid values",
    ],
  },
  "audio-switcher": {
    summary:
      "A Windows automation script for changing audio devices without opening system settings.",
    overview:
      "Audio Switcher uses AutoHotkey to reduce a repeated Windows audio task to a quick action. It is designed for users who frequently move between headphones, speakers or other output devices.",
    features: [
      "Switch between configured audio devices",
      "Keyboard-driven Windows automation",
      "Fast workflow without opening settings",
      "Lightweight script-based setup",
    ],
  },
  "password-generator": {
    summary:
      "A browser-based tool for creating configurable random passwords.",
    overview:
      "Password Generator is a compact frontend utility built with native web technologies. It lets the user adjust password requirements and generates a result directly in the browser with no server dependency.",
    features: [
      "Generate random passwords in the browser",
      "Configure password length and character groups",
      "Copy the generated result",
      "Responsive interface with no backend dependency",
    ],
  },
  construction: {
    summary:
      "A responsive construction company landing page built around clear sections and service presentation.",
    overview:
      "Construction is an early landing-page project focused on translating a visual layout into a working responsive site. It includes the core content sections expected from a company page and adapts them for smaller screens.",
    features: [
      "Responsive landing-page layout",
      "Service and company content sections",
      "Interactive behavior with jQuery",
      "Semantic HTML and custom CSS styling",
    ],
  },
};

/** Merges generated project data with editorial details and safe fallbacks. */
export function getProjectDetails(project: Project): ProjectDetails {
  const details = projectOverrides[project.id];
  const isLiveHidden = project.tags.includes(LIVE_HIDDEN_TAG);
  const liveDemo = details?.liveDemo ?? project.liveDemo ?? null;
  const visibleTags = project.tags.filter((tag) => tag !== LIVE_HIDDEN_TAG);

  return {
    ...project,
    tags: visibleTags,
    summary:
      details?.summary ??
      project.description ??
      `A personal project built with ${visibleTags.join(", ")}.`,
    overview:
      details?.overview ??
      project.description ??
      "This project explores a focused product idea through a clear, maintainable implementation.",
    features: details?.features ?? [
      "Focused project workflow",
      "Responsive user interface",
      "Maintainable implementation",
    ],
    liveDemo: isLiveHidden ? null : liveDemo,
  };
}

const russianProjectCopy: Record<string, Pick<ProjectDetails, "summary" | "overview" | "features">> = {
  kmstudy: { summary: "Адаптивный сайт репетитора по математике и химии с онлайн-записью, отзывами и формой связи.", overview: "Kmstudy помогает ученикам познакомиться с преподавателем, выбрать формат занятий и отправить заявку. Интерфейс адаптирован для разных экранов, а обращения доставляются через Telegram и email.", features: ["Онлайн-запись на занятия", "Отзывы учеников и ответы на вопросы", "Адаптивный интерфейс", "Отправка заявок в Telegram и на email"] },
  "market-ai": { summary: "Маркетплейс с AI-функциями, построенный из связанных frontend- и backend-сервисов.", overview: "Market AI объединяет современный веб-интерфейс и изолированную сервисную архитектуру. Типизированный frontend и контейнеры разделяют ответственность и упрощают разработку и развёртывание интеграций.", features: ["Интерфейс маркетплейса", "Сервисная архитектура", "Контейнеризованное окружение", "Адаптивный React-интерфейс"] },
  "audio-switcher": { summary: "Windows-скрипт для переключения аудиоустройств без открытия настроек системы.", overview: "Audio Switcher сокращает повторяющуюся операцию Windows до одного быстрого действия — удобно при частом переключении между наушниками, колонками и другими устройствами.", features: ["Переключение аудиоустройств", "Управление с клавиатуры", "Работа без открытия настроек", "Лёгкая установка скрипта"] },
  pinwindow: { summary: "Лёгкая Windows-утилита, которая закрепляет выбранное окно поверх остальных.", overview: "PinWindow помогает оставить нужное приложение видимым во время работы в других окнах. Простой интерфейс даёт прямой контроль над режимом «поверх всех» без тяжёлого фонового приложения.", features: ["Закрепление выбранного окна", "Быстрое включение и отключение", "Нативное поведение Windows", "Минималистичный интерфейс"] },
  "lumea-candles": { summary: "Адаптивная концепция магазина свечей со спокойным интерфейсом и акцентом на продукт.", overview: "Lumea Candles исследует e-commerce интерфейс с ясной подачей товара и цельной визуальной системой. Повторно используемые компоненты и адаптивная сетка делают каталог удобным на любых экранах.", features: ["Адаптивный каталог", "Переиспользуемые компоненты", "Типизированная структура", "Мобильная и десктопная версии"] },
  "campus-and-code": { summary: "Full-stack платформа для обучения с современным интерфейсом и постоянным хранилищем данных.", overview: "Campus And Code организует учебные материалы и взаимодействие пользователей. Проект объединяет Next.js, PostgreSQL, файловое хранилище, email и контейнеризованные сервисы.", features: ["Структурированный учебный контент", "Данные в PostgreSQL", "Email-уведомления", "S3-хранилище и Docker"] },
  linkcast: { summary: "Компактная Python-утилита для работы со ссылками.", overview: "Linkcast обрабатывает и передаёт ссылки без лишней сложности интерфейса. Прямая реализация делает основной сценарий простым для запуска и развития.", features: ["Ввод и обработка ссылок", "Компактная реализация на Python", "Понятный сценарий работы", "Основа для новых интеграций"] },
  "qr-link-generator": { summary: "Веб-инструмент, который превращает ссылки в готовые к просмотру и отправке QR-коды.", overview: "QR Link Generator быстро создаёт QR-код из URL. Интерфейс сосредоточен на вводе, результате и повторном использовании, а TypeScript обеспечивает предсказуемый поток данных.", features: ["QR-код из URL", "Мгновенный предпросмотр", "Валидация ввода", "Адаптивный интерфейс"] },
  "bmi-calculator": { summary: "Python-калькулятор индекса массы тела по росту и весу.", overview: "BMI Calculator преобразует рост и вес в понятный показатель BMI, уделяя внимание обработке ввода, расчёту и ясному результату.", features: ["Ввод роста и веса", "Автоматический расчёт", "Понятная классификация", "Проверка значений"] },
  "password-generator": { summary: "Браузерный инструмент для создания настраиваемых случайных паролей.", overview: "Password Generator позволяет выбрать требования и создать пароль прямо в браузере без сервера.", features: ["Генерация в браузере", "Настройка длины и символов", "Копирование результата", "Работа без backend"] },
  construction: { summary: "Адаптивный лендинг строительной компании с ясной подачей услуг.", overview: "Учебный лендинг переводит визуальный макет в работающий адаптивный сайт с основными разделами страницы компании.", features: ["Адаптивная вёрстка", "Разделы услуг и компании", "Интерактивность на jQuery", "Семантичные HTML и CSS"] },
};

export function getLocalizedProjectDetails(project: Project, language: Language): ProjectDetails {
  const details = getProjectDetails(project);
  if (language !== "ru") return details;
  const copy = russianProjectCopy[project.id];
  return copy ? { ...details, ...copy } : details;
}
