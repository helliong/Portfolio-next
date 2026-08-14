# Portfolio — Egor Yakovlev

Персональное портфолио full-stack разработчика, построенное на Next.js и TypeScript. Сайт объединяет презентационную главную страницу, архив проектов, подробные case study и форму заявки на разработку.

**Live:** [helliong.space](https://helliong.space)

**GitHub:** [github.com/helliong](https://github.com/helliong)

## Возможности

- адаптивная главная страница в моноширинной editorial-стилистике;
- светлая и тёмная темы;
- архив проектов, автоматически синхронизируемый с GitHub;
- фильтрация проектов по категориям `web`, `apps` и `tools` из GitHub topics;
- поддержка private/commercial проектов без публикации ссылки на репозиторий;
- автоматические годы проектов из даты создания GitHub-репозитория;
- отдельные страницы проектов с описанием, стеком и навигацией;
- интерактивный блок с логотипом и анимированным акцентом;
- форма заявки с отправкой писем через Resend;
- клиентская и серверная валидация, rate limiting через Upstash Redis;
- Privacy Policy, cookie banner и локальное сохранение privacy-настроек;
- мобильная навигация на главной странице и в архиве проектов;
- адаптивные интерфейсы для desktop, tablet и mobile;
- поддержка `prefers-reduced-motion` для ключевых анимаций.

## Стек

| Область | Технологии |
| --- | --- |
| Framework | Next.js, React |
| Language | TypeScript |
| UI | Tailwind CSS, глобальные CSS-токены, Lucide Icons |
| Email | Resend |
| Security | Upstash Redis, rate limiting, серверная валидация |
| Data | GitHub REST API, локально генерируемые TypeScript-данные |
| Fonts | `next/font`, Roboto Mono, DotGothic16 |

## Структура проекта

```text
src/
├── app/
│   ├── api/send/          # API отправки заявки
│   ├── privacy/           # Privacy Policy
│   ├── projects/          # архив и динамические страницы проектов
│   ├── globals.css        # темы, layout и стили компонентов
│   ├── layout.tsx         # шрифты и metadata
│   └── page.tsx           # главная страница
├── components/            # секции, карточки и диалоги
└── data/                  # проекты, порядок и данные case study

public/assets/             # логотипы, mockup и изображения
scripts/                   # генерация списка проектов из GitHub
```

## Локальный запуск

Требования:

- Node.js 20 или новее;
- npm;
- ключ Resend для работающей формы обратной связи.

```bash
git clone https://github.com/helliong/Portfolio-next.git
cd Portfolio-next
npm install
npm run dev
```

После запуска приложение будет доступно на [localhost:3000](http://localhost:3000).

## Переменные окружения

Создайте `.env.local` в корне проекта:

```env
RESEND_API_KEY=re_your_api_key
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Без `RESEND_API_KEY` сайт продолжит работать, но `/api/send` будет возвращать ошибку `500`, а форма не сможет отправлять заявки.

Upstash-переменные обеспечивают распределённый rate limiting формы в production. На Vercel их отсутствие отключает отправку формы с ответом `503`; локально без Upstash серверный rate limiting не применяется. Клиентский cooldown остаётся дополнительным UX-ограничением и не заменяет серверный limiter.

`GITHUB_TOKEN` нужен только во время генерации private/commercial проектов. Используйте fine-grained token с read-доступом к metadata выбранных репозиториев. Для локального запуска передайте его процессу, например в PowerShell:

```powershell
$env:GITHUB_TOKEN = gh auth token
npm run generate:projects
```

Для workflow сохраните отдельный минимально привилегированный token в repository secret `PORTFOLIO_GITHUB_TOKEN`.

## Команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | запуск development-сервера |
| `npm run generate:projects` | получение репозиториев GitHub и обновление `src/data/projects.ts` |
| `npm run build` | production-сборка без повторной генерации проектов |
| `npm run start` | запуск production-сервера |

### Генерация проектов

Скрипт `scripts/generate-projects.mjs` получает публичные репозитории пользователя `helliong`. При наличии `GITHUB_TOKEN` он также получает private-репозитории, но включает только отмеченные topic `commercial`. Проекты с `portfolio-hidden` исключаются. Год проекта формируется автоматически из GitHub-поля `created_at` — даты создания репозитория.

Каждый проект должен иметь ровно один category topic:

- `portfolio-web` → `web`;
- `portfolio-app` → `apps`;
- `portfolio-tool` → `tools`.

Category topics и `commercial` используются только генератором и не отображаются среди технологий. Для private/commercial проекта публикуется demo из `homepage`, а GitHub-ссылка скрывается.

Private/commercial проект без публичного `homepage` пропускается. Год каждой карточки и case study определяется по `created_at`; новые проекты, отсутствующие в ручном порядке, автоматически добавляются в конец архива.

Для изображения проекта скрипт ищет файл по шаблону:

```text
public/assets/img/projects/mockup-{repository-name}.webp
```

Если mockup отсутствует, используется `no-photo.webp`.

> `npm run build` не обращается к GitHub API. Сначала обновите данные отдельной командой `npm run generate:projects` с настроенным `GITHUB_TOKEN`.

Workflow `.github/workflows/update-projects.yml` запускает генерацию каждые 8 часов и вручную через `workflow_dispatch`. Если данные изменились, GitHub Actions создаёт коммит `chore: update projects`.

## Добавление case study

1. Добавьте или обновите репозиторий на GitHub.
2. Укажите для него описание, один `portfolio-*` topic и homepage с live demo. Для private-проекта также добавьте `commercial`.
3. Добавьте mockup в `public/assets/img/projects`.
4. Запустите `npm run generate:projects`.
5. Добавьте расширенное описание в `src/data/projectDetails.ts`.
6. При необходимости задайте позицию в `src/data/projectOrder.ts`; год добавлять вручную не требуется.

## Roadmap

### P0 — содержание и full-stack позиционирование

- [ ] Заменить все `No description yet.` содержательными описаниями: задача, аудитория и результат.
- [ ] Расширить услуги направлениями `Full-stack development`, `Backend & API integration` и `Deployment & maintenance`.
- [ ] Дополнить case study архитектурой frontend, API, базы данных и инфраструктуры.
- [ ] Для ключевых проектов описать проблему, техническое решение, компромиссы и личный вклад.
- [ ] Добавить измеримые результаты: производительность, объём данных, сроки или реализованные сценарии.

### P1 — демонстрация инженерной работы

- [ ] Добавить архитектурные схемы для Campus and Code и Market AI.
- [ ] Показывать API, структуру базы данных, внешние интеграции и процесс деплоя.
- [ ] Добавить секцию опыта, образования, языков и формата сотрудничества.
- [ ] Подготовить актуальное CV и кнопку `Download CV`.
- [ ] Добавить подтверждение компетенций: отзывы, open-source активность или результаты проектов.

### P1 — SEO и распространение

- [ ] Расширить metadata: `metadataBase`, canonical, Open Graph и Twitter Card.
- [ ] Создать общую OG-картинку в стилистике портфолио.
- [ ] Генерировать индивидуальные OG-превью для страниц проектов.
- [ ] Добавить `sitemap.ts` и `robots.ts`.
- [ ] Добавить JSON-LD для `Person`, `WebSite` и выбранных проектов.

### P1 — форма заявки и безопасность

- [x] Добавить серверную валидацию входных данных.
- [x] Экранировать пользовательские значения перед формированием HTML-письма.
- [x] Добавить rate limiting формы через Upstash Redis.
- [ ] Добавить поля бюджета и ориентировочного срока проекта.
- [ ] Сохранять источник заявки и возвращать клиенту структурированные ошибки.
- [ ] Настроить подтверждённый домен отправителя Resend вместо тестового адреса.

### P2 — качество и наблюдаемость

- [ ] Добавить privacy-friendly аналитику основных переходов и отправок формы.
- [ ] Настроить мониторинг ошибок API и клиентского интерфейса.
- [ ] Добавить unit-тесты генератора проектов и серверной валидации.
- [ ] Добавить end-to-end сценарии навигации, смены темы и отправки формы.
- [ ] Проверить Lighthouse, Core Web Vitals и доступность основных страниц.
- [ ] Добавить CI-проверки TypeScript, build и тестов.

## Принципы проекта

- полезность важнее декоративной сложности;
- интерфейс должен оставаться понятным без объяснений;
- анимация поддерживает композицию, а не отвлекает от содержания;
- каждый проект должен показывать не только результат, но и инженерное решение;
- доступность, производительность и адаптивность рассматриваются как базовые требования.

## Контакты

- Portfolio: [helliong.space](https://helliong.space)
- GitHub: [github.com/helliong](https://github.com/helliong)
- Telegram: [@lege0rge](https://t.me/lege0rge)
- Email: [saoffabg@gmail.com](mailto:saoffabg@gmail.com)

---

Built with attention to structure, performance and the details people notice.
