export type Project = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  link: string;
  liveDemo?: string | null;
};

export const cases: Project[] = [
  {
    id: "pinwindow",
    name: "PinWindow",
    image: "/assets/img/projects/mockup-pinwindow.webp",
    alt: "PinWindow",
    description: "No description yet.",
    tags: ["c#"],
    link: "https://github.com/helliong/pinWindow",
  },
  {
    id: "audio-switcher",
    name: "Audio Switcher",
    image: "/assets/img/projects/mockup-audio-switcher.webp",
    alt: "Audio Switcher",
    description: "No description yet.",
    tags: ["autohotkey"],
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
    link: "https://github.com/helliong/market-ai",
  },
];

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

export const projects: Project[] = [
  {
    "id": "pinwindow",
    "name": "PinWindow",
    "image": "/assets/img/projects/mockup-pinwindow.webp",
    "alt": "PinWindow",
    "description": "No description yet.",
    "tags": [
      "c#"
    ],
    "link": "https://github.com/helliong/pinWindow",
    "liveDemo": null
  },
  {
    "id": "lumea-candles",
    "name": "Lumea Candles",
    "image": "/assets/img/projects/mockup-lumea-candles.webp",
    "alt": "Lumea Candles",
    "description": "No description yet.",
    "tags": [
      "nextjs",
      "pet-project",
      "scss-modules",
      "typescript",
      "scss"
    ],
    "link": "https://github.com/helliong/lumea-candles",
    "liveDemo": "https://lumea-candles.vercel.app/"
  },
  {
    "id": "campus-and-code",
    "name": "Campus And Code",
    "image": "/assets/img/projects/mockup-campus-and-code.webp",
    "alt": "Campus And Code",
    "description": "No description yet.",
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
    "link": "https://github.com/helliong/Campus-and-code",
    "liveDemo": "https://campuscode.helliong.space/"
  },
  {
    "id": "market-ai",
    "name": "Market Ai",
    "image": "/assets/img/projects/mockup-market-ai.webp",
    "alt": "Market Ai",
    "description": "No description yet.",
    "tags": [
      "docker",
      "microservice",
      "nextjs",
      "react",
      "tailwindcss",
      "typescript"
    ],
    "link": "https://github.com/helliong/market-ai",
    "liveDemo": "https://market-ai-xi.vercel.app/"
  },
  {
    "id": "linkcast",
    "name": "Linkcast",
    "image": "/assets/img/projects/mockup-linkcast.webp",
    "alt": "Linkcast",
    "description": "No description yet.",
    "tags": [
      "python"
    ],
    "link": "https://github.com/helliong/linkcast",
    "liveDemo": "https://linkcast.helliong.space/"
  },
  {
    "id": "qr-link-generator",
    "name": "Qr Link Generator",
    "image": "/assets/img/projects/mockup-qr-link-generator.webp",
    "alt": "Qr Link Generator",
    "description": "No description yet.",
    "tags": [
      "typescript"
    ],
    "link": "https://github.com/helliong/qr-link-generator",
    "liveDemo": "https://qrcode.helliong.space/"
  },
  {
    "id": "bmi-calculator",
    "name": "Bmi Calculator",
    "image": "/assets/img/projects/mockup-bmi-calculator.webp",
    "alt": "Bmi Calculator",
    "description": "No description yet.",
    "tags": [
      "python"
    ],
    "link": "https://github.com/helliong/bmi-calculator",
    "liveDemo": "https://bmi.helliong.space/"
  },
  {
    "id": "audio-switcher",
    "name": "Audio Switcher",
    "image": "/assets/img/projects/mockup-audio-switcher.webp",
    "alt": "Audio Switcher",
    "description": "No description yet.",
    "tags": [
      "autohotkey"
    ],
    "link": "https://github.com/helliong/audio-switcher",
    "liveDemo": null
  },
  {
    "id": "password-generator",
    "name": "Password Generator",
    "image": "/assets/img/projects/mockup-password-generator.webp",
    "alt": "Password Generator",
    "description": "Password generator",
    "tags": [
      "html-css-javascript",
      "password-generator",
      "pet-project",
      "javascript"
    ],
    "link": "https://github.com/helliong/password-generator",
    "liveDemo": "https://helliong.github.io/password-generator/"
  },
  {
    "id": "construction",
    "name": "Construction",
    "image": "/assets/img/projects/mockup-construction.webp",
    "alt": "Construction",
    "description": "My second landing",
    "tags": [
      "css",
      "html",
      "jquery",
      "pet-project"
    ],
    "link": "https://github.com/helliong/construction",
    "liveDemo": "https://helliong.github.io/construction/"
  }
];
