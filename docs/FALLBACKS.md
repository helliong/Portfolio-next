# Заглушки (Stubs) и Fallback в проекте

В данном документе собраны все места в кодовой базе, где вместо целевого кода, внешних данных или реального контента возвращается временная заглушка (placeholder / stub) или защитный fallback.

---

## Сводная таблица

| Файл и строки | Категория | Заглушка / Fallback | Целевой / Ожидаемый контент | Условие срабатывания |
| :--- | :--- | :--- | :--- | :--- |
| [`src/data/projects.ts:22, 32, 42`](file:///d:/work/Portfolio-next/src/data/projects.ts#L22) | Данные проектов | `"No description yet."` | Реальное описание проекта | В массиве `cases` для проектов `pinwindow`, `audio-switcher`, `market-ai` |
| [`src/data/projectDetails.ts:154-157`](file:///d:/work/Portfolio-next/src/data/projectDetails.ts#L154-L157) | Данные проектов | Шаблонный текст: `` `A personal project built with ${visibleTags.join(", ")}.` `` | Уникальное краткое резюме (`summary`) | Отсутствует оверрайд `details.summary` и `project.description` |
| [`src/data/projectDetails.ts:158-161`](file:///d:/work/Portfolio-next/src/data/projectDetails.ts#L158-L161) | Данные проектов | Статический текст: `"This project explores a focused product idea through a clear, maintainable implementation."` | Развёрнутый обзор (`overview`) проекта | Отсутствует оверрайд `details.overview` и `project.description` |
| [`src/data/projectDetails.ts:162-166`](file:///d:/work/Portfolio-next/src/data/projectDetails.ts#L162-L166) | Данные проектов | Дефолтный массив: `["Focused project workflow", "Responsive user interface", "Maintainable implementation"]` | Конкретный список фич/вклада (`features`) | Отсутствует `details.features` в `projectOverrides` |
| [`src/data/projectDetails.ts:185-190`](file:///d:/work/Portfolio-next/src/data/projectDetails.ts#L185-L190) | Локализация | Базовые английские тексты `details` | Русский перевод `russianProjectCopy` | Язык переключен на `ru`, но проект отсутствует в словаре перевода |
| [`scripts/generate-projects.mjs:105`](file:///d:/work/Portfolio-next/scripts/generate-projects.mjs#L105) | Ассеты / Медиа | Изображение-плейсхолдер: `"/assets/img/projects/no-photo.webp"` | Реальный скриншот мокапа проекта | В `public/assets/img/projects/` нет файла `mockup-{id}.{ext}` |
| [`scripts/generate-projects.mjs:119`](file:///d:/work/Portfolio-next/scripts/generate-projects.mjs#L119) | Данные проектов | `"No description yet."` | Описание репозитория из GitHub API | У репозитория на GitHub не заполнено поле `description` |
| [`src/app/projects/[id]/page.tsx:64`](file:///d:/work/Portfolio-next/src/app/projects/[id]/page.tsx#L64) | UI / Данные | Символ тире: `"—"` | Год создания проекта (например `"2024"`) | У проекта не определено поле `year` |
| [`src/components/ProjectCaseStudy.tsx:38`](file:///d:/work/Portfolio-next/src/components/ProjectCaseStudy.tsx#L38) | UI / Данные | Дефолтная роль: `"developer"` | Специализированная роль (`"full-stack"`, `"desktop app"`) | Теги проекта не содержат ключевых слов стека |
| [`src/components/ProjectCaseStudy.tsx:131-140`](file:///d:/work/Portfolio-next/src/components/ProjectCaseStudy.tsx#L131-L140) | UI Компоненты | Неактивная кнопка `<button disabled>` с иконкой `LockKeyhole` | Активная ссылка `<a href="...">` на работающий демо-стенд | Отсутствует `project.liveDemo` или проект помечен `live-hidden` |
| [`src/components/ProjectsArchive.tsx:183-192`](file:///d:/work/Portfolio-next/src/components/ProjectsArchive.tsx#L183-L192) | UI Компоненты | Неактивная кнопка `<button disabled>` с иконкой `LockKeyhole` | Ссылка на Live Demo в карточке архива | Отсутствует `project.liveDemo` |
| [`src/app/projects/[id]/page.tsx:34-36`](file:///d:/work/Portfolio-next/src/app/projects/[id]/page.tsx#L34-L36) | SEO / Метаданные | `{ title: "Project not found" }` | Метаданные реального проекта (`${name} \| Egor Yakovlev`) | Передан несуществующий `id` проекта в `generateMetadata` |
| [`src/app/projects/[id]/page.tsx:49-51`](file:///d:/work/Portfolio-next/src/app/projects/[id]/page.tsx#L49-L51) | Роутинг / Ошибки | Редирект на fallback 404 (`notFound()`) | Страница кейс-стади с данными проекта | `projectIndex === -1` (проект не найден в списке) |
| [`src/app/not-found.tsx:10-70`](file:///d:/work/Portfolio-next/src/app/not-found.tsx#L10-L70) | Роутинг / Ошибки | Страница 404 с кодом `404` и ссылками возврата | Целевая страница маршрута | Запрошен несуществующий URL маршрут |
| [`src/app/api/send/route.ts:185`](file:///d:/work/Portfolio-next/src/app/api/send/route.ts#L185) | API / Email | Строка `"not specified"` | Выбранный тип проекта (`"Website"`, `"Landing page"` и т.д.) | Поле `projectType` пустое или не передано в запросе |
| [`src/app/api/send/route.ts:129`](file:///d:/work/Portfolio-next/src/app/api/send/route.ts#L129) | API / Rate Limit | Строка `"local-development"` | Реальный IP-клиента из proxy-заголовков | Запрос запущен локально без proxy-заголовков |
| [`src/components/SelfServicePopup.tsx`](file:///d:/work/Portfolio-next/src/components/SelfServicePopup.tsx) | Сеть / Формы | Fallback задержки: `180` секунд | Значение `retryAfter` от сервера Upstash Redis | Сервер вернул 429 без валидного числа секунд `retryAfter` |
| [`src/components/SelfServicePopup.tsx:257`](file:///d:/work/Portfolio-next/src/components/SelfServicePopup.tsx#L257) | Сеть / Формы | Текст ошибки: `"Failed to send request"` | Кастомное сообщение ошибки из ответа сервера | Поле `payload.message` отсутствует в ответе |
| [`src/components/SelfServicePopup.tsx:271`](file:///d:/work/Portfolio-next/src/components/SelfServicePopup.tsx#L271) | Сеть / Формы | Общий текст: `"something went wrong. please try again later"` | Детальная ошибка валидации или сетевого подключения | Исключение при выполнении `fetch` или сбой сети |
| [`src/components/PreferencesProvider.tsx:22-35`](file:///d:/work/Portfolio-next/src/components/PreferencesProvider.tsx#L22-L35) | Хранилище / Состояние | Начальные значения: `language = "en"`, `theme = "dark"` | Сохраненные предпочтения пользователя из `localStorage` | Ошибка доступа к `localStorage` (браузерные ограничения/инкогнито) |
| [`src/app/globals.css:39`](file:///d:/work/Portfolio-next/src/app/globals.css#L39) | CSS / Шрифты | Системный шрифт `"Roboto Mono", monospace` | Веб-шрифт из Google Fonts (`var(--font-roboto-mono)`) | Веб-шрифт не загрузился или заблокирован |

---

## Подробный разбор ключевых заглушек

### 1. Данные проектов (`src/data/projectDetails.ts` и `src/data/projects.ts`)
Если для проекта не создана детальная редакционная карточка в `projectOverrides`, функция `getProjectDetails` генерирует синтетический контент:
```typescript
// src/data/projectDetails.ts
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
]
```
В файле `src/data/projects.ts` для проектов `pinwindow`, `audio-switcher` и `market-ai` используется заглушка:
```typescript
description: "No description yet."
```

### 2. Скрипт генерации проектов (`scripts/generate-projects.mjs`)
При отсутствии скриншота проекта скрипт подставляет плейсхолдер:
```javascript
const image = foundExt
  ? `/assets/img/projects/mockup-${id}${foundExt}`
  : "/assets/img/projects/no-photo.webp";
```

### 3. Индикатор отсутствия Demo-версии (`ProjectCaseStudy.tsx` и `ProjectsArchive.tsx`)
Вместо внешней ссылки на работающий сайт рендерится заглушка с замком:
```tsx
<button
  type="button"
  disabled
  title={t("Live demo unavailable", "Демо недоступно")}
  className="project-case-action project-case-action-live is-disabled"
>
  {t("live demo", "демо")}
  <LockKeyhole size={14} aria-hidden="true" />
</button>
```
