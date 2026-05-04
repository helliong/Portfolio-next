# Portfolio Next.js + TypeScript + Tailwind

Это перенос портфолио из обычного HTML/CSS/JS в Next.js.

## Запуск

```bash
npm install
npm run dev
```

Открой:

```txt
http://localhost:3000
```

## Куда положить изображения

В проекте уже подготовлена папка:

```txt
public/assets/img/
```

Туда нужно положить папки из твоего архива:

```txt
public/assets/img/svg/
public/assets/img/icons/
```

Итоговые пути должны быть такими:

```txt
public/assets/img/icons/logoWhite.svg
public/assets/img/icons/logoBlack.svg
public/assets/img/svg/gallery-project.svg
public/assets/img/svg/snake-project.svg
public/assets/img/svg/author-photo.svg
public/assets/img/svg/githubWhite.svg
public/assets/img/svg/githubDark.svg
```

В коде картинки уже подключены через пути вида:

```tsx
/assets/img/svg/gallery-project.svg
```
