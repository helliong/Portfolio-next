# Запуск в Docker

Проект собирается в production-режиме как Next.js standalone-сервер. Итоговый образ не содержит исходники, dev-зависимости и секреты и запускается от непривилегированного пользователя `nextjs`.

## Локальная проверка

Создайте файл `.env` из примера и заполните ключи, если нужна рабочая форма обратной связи:

```bash
cp .env.example .env
docker compose up --build -d
docker compose ps
```

Сайт будет доступен на [localhost:3000](http://localhost:3000). Логи и остановка:

```bash
docker compose logs -f portfolio
docker compose down
```

Без `RESEND_API_KEY` сайт работает, но API формы обратной связи отвечает статусом `503`. Upstash-переменные включают ограничение частоты отправки формы.

## Развёртывание на сервере

Установите Docker Engine с Compose plugin, скопируйте репозиторий на сервер и создайте рядом с `compose.yaml` файл `.env`:

```env
PORT=3000
RESEND_API_KEY=re_your_api_key
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Затем соберите и запустите контейнер:

```bash
docker compose up --build -d
docker compose ps
```

Для обновления приложения после загрузки нового кода снова выполните `docker compose up --build -d`. Порт `3000` можно проксировать через Nginx, Caddy или другой reverse proxy с HTTPS. Если на сервере порт занят, измените только `PORT` в `.env`; внутри контейнера приложение всегда слушает порт `3000`.

Не добавляйте `.env` в Git и не передавайте его при сборке образа: значения из него нужны только запущенному контейнеру.

## Запуск без Compose

```bash
docker build -t portfolio-next .
docker run -d --name portfolio-next --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  portfolio-next
```

