"use client";

import { usePreferences } from "./PreferencesProvider";

const packages = [
  {
    title: "landing page",
    description: "A focused page for a product, service, launch or event.",
    price: "$200",
    timeline: "from 7 days",
    items: [
      "Responsive design",
      "Contact form",
      "SEO basics",
      "Analytics setup",
    ],
  },
  {
    title: "business website",
    description:
      "A compact website for a personal brand, studio or local business.",
    price: "$500",
    timeline: "from 12 days",
    items: [
      "Up to 5 pages",
      "CMS-ready structure",
      "Performance tuning",
      "Deployment",
    ],
  },
  {
    title: "online store",
    description:
      "A storefront with catalog, product pages and checkout integration.",
    price: "$1,200",
    timeline: "from 30 days",
    items: [
      "Product catalog",
      "Cart and checkout",
      "Payment integration",
      "Admin workflow",
    ],
  },
  {
    title: "web app / MVP",
    description:
      "A custom application with auth, dashboard logic and integrations.",
    price: "$3,000",
    timeline: "from 45 days",
    items: [
      "User accounts",
      "Database architecture",
      "API integration",
      "Launch support",
    ],
  },
];

const ruPackages = [
  {
    title: "лендинг",
    description:
      "Фокусная страница для продукта, услуги, запуска или мероприятия.",
    price: "15 000 ₽",
    timeline: "от 7 дней",
    items: [
      "Адаптивный дизайн",
      "Форма заявки",
      "Базовое SEO",
      "Подключение аналитики",
    ],
  },
  {
    title: "сайт-визитка",
    description:
      "Компактный сайт для личного бренда, студии или локального бизнеса.",
    price: "35 000 ₽",
    timeline: "от 12 дней",
    items: [
      "До 5 страниц",
      "Структура под CMS",
      "Оптимизация скорости",
      "Публикация",
    ],
  },
  {
    title: "интернет-магазин",
    description:
      "Витрина с каталогом, карточками товаров и интеграцией оплаты.",
    price: "120 000 ₽",
    timeline: "от 30 дня",
    items: [
      "Каталог товаров",
      "Корзина и оформление",
      "Интеграция оплаты",
      "Админ-процессы",
    ],
  },
  {
    title: "веб-приложение / MVP",
    description:
      "Индивидуальный продукт с авторизацией, логикой кабинета и интеграциями.",
    price: "250 000 ₽",
    timeline: "от 45 дней",
    items: [
      "Аккаунты пользователей",
      "Архитектура базы данных",
      "Интеграция API",
      "Поддержка запуска",
    ],
  },
];

/** Renders indicative localized prices for common website packages. */
export default function Pricing() {
  const { language, t } = usePreferences();
  const localizedPackages = language === "ru" ? ruPackages : packages;

  return (
    <section id="pricing" className="portfolio-section pricing-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>{t("pricing / starting points", "стоимость / ориентиры")}</h2>
      </div>

      <div className="pricing-grid">
        {localizedPackages.map((item, index) => (
          <article key={item.title} className="pricing-item">
            <div className="pricing-topline">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.timeline}</small>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <strong>
              {t("from", "от")} {item.price}
            </strong>
            <ul>
              {item.items.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
