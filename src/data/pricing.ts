import type { Locale } from "@/i18n";

export type PricingPackage = {
  title: string;
  description: string;
  price: string;
  timeline: string;
  items: string[];
};

export type ExtraService = {
  title: string;
  description: string;
  price: string;
  timeline: string;
};

type PricingContent = {
  packages: PricingPackage[];
  extras: ExtraService[];
};

const englishPricing: PricingContent = {
  packages: [
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
      price: "$400",
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
  ],
  extras: [
    {
      title: "redesign",
      description:
        "Refresh the visual system, layout and key conversion paths without rebuilding everything.",
      price: "$150",
      timeline: "from 5 days",
    },
    {
      title: "CRM integration",
      description:
        "Send leads, orders and form data into your CRM with clean fields and statuses.",
      price: "$180",
      timeline: "from 2 days",
    },
    {
      title: "request bot",
      description:
        "Connect website forms to Telegram or another bot so new requests arrive instantly.",
      price: "$50",
      timeline: "from 2 day",
    },
    {
      title: "payment setup",
      description:
        "Connect checkout, invoices or donation flows through a payment provider.",
      price: "$220",
      timeline: "from 3 days",
    },
    {
      title: "analytics & events",
      description:
        "Configure goals, events and dashboards to understand user behavior after launch.",
      price: "$150",
      timeline: "from 2 days",
    },
    {
      title: "support package",
      description:
        "Monthly updates, small improvements, monitoring and content changes.",
      price: "$80/ month",
      timeline: "monthly",
    },
  ],
};

const russianPricing: PricingContent = {
  packages: [
    {
      title: "лендинг",
      description:
        "Фокусная страница для продукта, услуги, запуска или мероприятия.",
      price: "10 000 ₽",
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
      price: "25 000 ₽",
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
      timeline: "от 30 дней",
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
  ],
  extras: [
    {
      title: "редизайн",
      description:
        "Обновление визуальной системы, структуры и ключевых сценариев без полной пересборки сайта.",
      price: "10 000 ₽",
      timeline: "от 5 дней",
    },
    {
      title: "подключение CRM",
      description:
        "Передача заявок, заказов и данных форм в CRM с понятными полями и статусами.",
      price: "10 000 ₽",
      timeline: "от 2 дней",
    },
    {
      title: "бот для заявок",
      description:
        "Связка форм сайта с Telegram или другим ботом, чтобы заявки приходили сразу.",
      price: "8 000 ₽",
      timeline: "от 1 дня",
    },
    {
      title: "подключение оплаты",
      description:
        "Интеграция оплаты, счетов или донатов через платежный сервис.",
      price: "18 000 ₽",
      timeline: "от 3 дней",
    },
    {
      title: "аналитика и события",
      description:
        "Настройка целей, событий и дашбордов для понимания поведения пользователей.",
      price: "10 000 ₽",
      timeline: "от 2 дней",
    },
    {
      title: "поддержка сайта",
      description:
        "Ежемесячные обновления, мелкие улучшения, мониторинг и правки контента.",
      price: "8 000 ₽ / месяц",
      timeline: "ежемесячно",
    },
  ],
};

export function getPricingContent(locale: Locale) {
  return locale === "ru" ? russianPricing : englishPricing;
}
