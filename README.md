<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logoWhite.svg" />
    <img src="public/logoBlack.svg" alt="Egor Yakovlev monogram" width="72" />
  </picture>

  # Egor Yakovlev — Portfolio

  A full-stack developer portfolio built with Next.js and TypeScript.

  [Live website](https://helliong.space) · [GitHub](https://github.com/helliong) · [Contact](mailto:saoffabg@gmail.com)

  **English** · [Русский](README.ru.md)

  ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
  ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
</div>

---

## About

This repository contains my personal portfolio: an editorial-style homepage, a filterable project archive, individual case studies, and a project enquiry flow.

## Highlights

- Responsive dark and light themes
- Project archive synchronized with the GitHub API
- Static case-study pages generated with Next.js
- Contact form powered by Resend, with validation and Upstash rate limiting
- Privacy controls, reduced-motion support, and mobile-first layouts

## Stack

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Resend` · `Upstash Redis`

## Run locally

Requires Node.js 20+ and npm.

```bash
git clone https://github.com/helliong/Portfolio-next.git
cd Portfolio-next
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

Create `.env.local` to enable the contact form:

```env
RESEND_API_KEY=re_your_api_key
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run generate:projects` | Refresh project data from GitHub |

The project generator uses repository topics to classify entries: `portfolio-web`, `portfolio-app`, or `portfolio-tool`. Add `portfolio-hidden` to exclude a repository. Private portfolio entries require `GITHUB_TOKEN` and the `commercial` topic.

---

<div align="center">
  Built with attention to structure, performance, and detail.
</div>
