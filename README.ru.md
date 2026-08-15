<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logoWhite.svg" />
    <img src="public/logoBlack.svg" alt="Монограмма Егора Яковлева" width="72" />
  </picture>

  # Егор Яковлев — Портфолио

  Портфолио full-stack разработчика на Next.js и TypeScript.

  [Сайт](https://helliong.space) · [GitHub](https://github.com/helliong) · [Связаться](mailto:saoffabg@gmail.com)

  [English](README.md) · **Русский**

  ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
  ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
</div>

---

## О проекте

Репозиторий содержит моё персональное портфолио: главную страницу в редакционном стиле, фильтруемый архив проектов, отдельные case study и форму заявки на разработку.

## Возможности

- Адаптивные светлая и тёмная темы
- Синхронизация проектов через GitHub API
- Статически генерируемые страницы проектов
- Форма обратной связи на Resend с валидацией и rate limiting через Upstash
- Privacy-настройки, поддержка reduced motion и адаптивная вёрстка

## Стек

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Resend` · `Upstash Redis`

## Локальный запуск

Потребуются Node.js 20+ и npm.

```bash
git clone https://github.com/helliong/Portfolio-next.git
cd Portfolio-next
npm install
npm run dev
```

Откройте [localhost:3000](http://localhost:3000).

Чтобы включить отправку заявок, создайте `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## Команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | Запустить сервер разработки |
| `npm run build` | Создать production-сборку |
| `npm run start` | Запустить production-сервер |
| `npm run generate:projects` | Обновить данные проектов из GitHub |

Генератор распределяет репозитории по категориям с помощью topics: `portfolio-web`, `portfolio-app` или `portfolio-tool`. Topic `portfolio-hidden` исключает репозиторий. Для private-проектов необходимы `GITHUB_TOKEN` и topic `commercial`.

---

<div align="center">
  Сделано с вниманием к структуре, производительности и деталям.
</div>
