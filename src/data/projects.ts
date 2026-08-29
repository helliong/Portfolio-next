// This file is generated from GitHub by scripts/generate-projects.mjs.
export type Project = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  category: "web" | "apps" | "tools";
  year?: string;
  link?: string | null;
  liveDemo?: string | null;
};

// Hand-picked cases retained alongside the generated project collection.
export const cases: Project[] = [
  {
    id: "pinwindow",
    name: "PinWindow",
    image: "/assets/img/projects/mockup-pinwindow.webp",
    alt: "PinWindow",
    description: "No description yet.",
    tags: ["c#", "live-hidden"],
    category: "apps",
    link: "https://github.com/helliong/pinWindow",
  },
  {
    id: "audio-switcher",
    name: "Audio Switcher",
    image: "/assets/img/projects/mockup-audio-switcher.webp",
    alt: "Audio Switcher",
    description: "No description yet.",
    tags: ["autohotkey", "live-hidden"],
    category: "apps",
    link: "https://github.com/helliong/audio-switcher",
  },
  {
    id: "market-ai",
    name: "Market Ai",
    image: "/assets/img/projects/mockup-market-ai.webp",
    alt: "Market Ai",
    description: "No description yet.",
    tags: [
      "docker",
      "microservice",
      "nextjs",
      "react",
      "tailwindcss",
      "typescript",
    ],
    category: "web",
    link: "https://github.com/helliong/market-ai",
  },
];

// Groups technologies and tools for reusable experience summaries.
export const experienceGroups = [
  {
    title: "I have experience with",
    items: [
      "MySQL Database",
      "postgreSQL Database",
      "supabase Database",
      "GIT, GitHub",
      "Coding PHP",
      "Figma, Adobe Illustrator",
      "Coding Python",
      "Next.js",
    ],
  },
  {
    title: "I’m confident with",
    items: [
      "Coding HTML",
      "Coding CSS3",
      "Coding JavaScript",
      "Using Adobe Package",
      "Creating Logos",
      "Creating UI/UX Designs",
      "Using Figma",
    ], 
  },
  {
    title: "I work with and study",
    items: [
     "Studying React",
      "Studying TypeScript",
      "Studying Node.js",
      "Using Adobe Package",
      "Studying User Experience",
      "Studying Tailwind CSS",
    ],
  },
];

// Repository-backed projects displayed throughout the portfolio.
export const projects: Project[] = [
  {
    "id": "human.collective",
    "name": "Human.Collective",
    "image": "/assets/img/projects/no-photo.webp",
    "alt": "Human.Collective",
    "description": "No description yet.",
    "tags": [
      "typescript"
    ],
    "category": "web",
    "year": "2026",
    "link": null,
    "liveDemo": "https://human-collective.vercel.app/"
  },
  {
    "id": "kmstudy",
    "name": "Kmstudy",
    "image": "/assets/img/projects/mockup-kmstudy.webp",
    "alt": "Kmstudy",
    "description": "Responsive website for a mathematics and chemistry tutor, featuring online booking, student reviews, FAQ, and contact form submissions via Telegram and email.",
    "tags": [
      "nextjs",
      "react",
      "typescript"
    ],
    "category": "web",
    "year": "2026",
    "link": null,
    "liveDemo": "https://kmstudy.ru/"
  },
  {
    "id": "cityvet",
    "name": "Cityvet",
    "image": "/assets/img/projects/no-photo.webp",
    "alt": "Cityvet",
    "description": "No description yet.",
    "tags": [
      "nextjs",
      "react",
      "typescript"
    ],
    "category": "web",
    "year": "2026",
    "link": null,
    "liveDemo": "https://cityvet.vercel.app/"
  },
  {
    "id": "lumea-candles",
    "name": "Lumea Candles",
    "image": "/assets/img/projects/mockup-lumea-candles.webp",
    "alt": "Lumea Candles",
    "description": "A responsive storefront concept for a handmade candle brand with a calm, product-led interface.",
    "tags": [
      "nextjs",
      "pet-project",
      "scss-modules",
      "typescript"
    ],
    "category": "web",
    "year": "2026",
    "link": "https://github.com/helliong/lumea-candles",
    "liveDemo": "https://lumea-candles.vercel.app/"
  },
  {
    "id": "market-ai",
    "name": "Market Ai",
    "image": "/assets/img/projects/mockup-market-ai.webp",
    "alt": "Market Ai",
    "description": "An AI-oriented market application built as a set of connected frontend and backend services.",
    "tags": [
      "docker",
      "microservice",
      "nextjs",
      "react",
      "tailwindcss",
      "typescript"
    ],
    "category": "web",
    "year": "2026",
    "link": "https://github.com/helliong/market-ai",
    "liveDemo": "https://market-ai-xi.vercel.app/"
  },
  {
    "id": "audio-switcher",
    "name": "Audio Switcher",
    "image": "/assets/img/projects/mockup-audio-switcher.webp",
    "alt": "Audio Switcher",
    "description": "A Windows automation script for changing audio devices without opening system settings.",
    "tags": [
      "autohotkey",
      "live-hidden"
    ],
    "category": "apps",
    "year": "2026",
    "link": "https://github.com/helliong/audio-switcher",
    "liveDemo": "https://helliong.space/"
  },
  {
    "id": "pinwindow",
    "name": "PinWindow",
    "image": "/assets/img/projects/mockup-pinwindow.webp",
    "alt": "PinWindow",
    "description": "A lightweight Windows utility for keeping any selected window above the rest of the desktop.",
    "tags": [
      "csharp",
      "live-hidden",
      "c#"
    ],
    "category": "apps",
    "year": "2026",
    "link": "https://github.com/helliong/pinWindow",
    "liveDemo": "https://helliong.space/"
  },
  {
    "id": "campus-and-code",
    "name": "Campus And Code",
    "image": "/assets/img/projects/mockup-campus-and-code.webp",
    "alt": "Campus And Code",
    "description": "A full-stack learning platform that connects a modern frontend with persistent data and supporting services.",
    "tags": [
      "docker",
      "nextjs",
      "nodemailer",
      "postgresql",
      "react",
      "s3-storage",
      "scss",
      "typescript",
      "zustand"
    ],
    "category": "web",
    "year": "2026",
    "link": "https://github.com/helliong/Campus-and-code",
    "liveDemo": "https://campuscode.helliong.space/"
  },
  {
    "id": "linkcast",
    "name": "Linkcast",
    "image": "/assets/img/projects/mockup-linkcast.webp",
    "alt": "Linkcast",
    "description": "A Python utility for working with links through a small, task-focused workflow.",
    "tags": [
      "python"
    ],
    "category": "tools",
    "year": "2026",
    "link": "https://github.com/helliong/linkcast",
    "liveDemo": "https://linkcast.helliong.space/"
  },
  {
    "id": "qr-link-generator",
    "name": "Qr Link Generator",
    "image": "/assets/img/projects/mockup-qr-link-generator.webp",
    "alt": "Qr Link Generator",
    "description": "A typed web utility that turns links into QR codes ready to preview and share.",
    "tags": [
      "css",
      "html",
      "typescript"
    ],
    "category": "tools",
    "year": "2026",
    "link": "https://github.com/helliong/qr-link-generator",
    "liveDemo": "https://qrcode.helliong.space/"
  },
  {
    "id": "bmi-calculator",
    "name": "Bmi Calculator",
    "image": "/assets/img/projects/mockup-bmi-calculator.webp",
    "alt": "Bmi Calculator",
    "description": "A Python calculator for estimating body mass index from a small set of user inputs.",
    "tags": [
      "python"
    ],
    "category": "tools",
    "year": "2026",
    "link": "https://github.com/helliong/bmi-calculator",
    "liveDemo": "https://bmi.helliong.space/"
  },
  {
    "id": "password-generator",
    "name": "Password Generator",
    "image": "/assets/img/projects/mockup-password-generator.webp",
    "alt": "Password Generator",
    "description": "A browser-based tool for creating configurable random passwords.",
    "tags": [
      "html-css-javascript",
      "password-generator",
      "pet-project",
      "javascript"
    ],
    "category": "tools",
    "year": "2025",
    "link": "https://github.com/helliong/password-generator",
    "liveDemo": "https://helliong.github.io/password-generator/"
  },
  {
    "id": "construction",
    "name": "Construction",
    "image": "/assets/img/projects/mockup-construction.webp",
    "alt": "Construction",
    "description": "A responsive construction company landing page built around clear sections and service presentation.",
    "tags": [
      "css",
      "html",
      "jquery",
      "pet-project"
    ],
    "category": "web",
    "year": "2023",
    "link": "https://github.com/helliong/construction",
    "liveDemo": "https://helliong.github.io/construction/"
  }
];
