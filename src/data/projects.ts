export type Project = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  link: string;
};

export const cases: Project[] = [
  {
    id: "rebranding",
    name: "rebranding",
    image: "/assets/img/svg/rebranding-project.svg",
    alt: "rebranding project",
    description: "Brand identity and interface redesign case.",
    tags: ["design", "ui", "branding"],
    link: "https://github.com/helliong",
  },
  {
    id: "construction",
    name: "construction",
    image: "/assets/img/projects/mockup-construction.webp",
    alt: "construction project",
    description: "Construction landing page case.",
    tags: ["landing", "frontend", "ui"],
    link: "https://github.com/helliong",
  },
  {
    id: "link cast",
    name: "link cast",
    image: "/assets/img/projects/mockup-linkcast.webp",
    alt: "link cast project",
    description: "Link casting application case.",
    tags: ["application", "frontend", "ui"],
    link: "https://github.com/helliong",
  },
];

export const experienceGroups = [
  {
    title: "experience",
    items: [
      "HTML / CSS / JavaScript",
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "tools",
    items: [
      "Git / GitHub",
      "Vercel",
      "Figma",
      "VS Code",
    ],
  },
  {
    title: "learning",
    items: [
      "Node.js",
      "API routes",
      "Prisma",
      "PostgreSQL",
    ],
  },
];

export const projects: Project[] = [
  {
    "id": "qr-link-generator",
    "name": "Qr Link Generator",
    "image": "/assets/img/projects/no-photo.webp",
    "alt": "Qr Link Generator",
    "description": "No description yet.",
    "tags": [
      "typescript"
    ],
    "link": "https://github.com/helliong/qr-link-generator"
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
    "link": "https://github.com/helliong/bmi-calculator"
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
    "link": "https://github.com/helliong/linkcast"
  },
  {
    "id": "snake",
    "name": "Snake",
    "image": "/assets/img/projects/mockup-snake.webp",
    "alt": "Snake",
    "description": "Snake game that works on the phone. -made by helliong-",
    "tags": [
      "game",
      "html",
      "html-css-javascript",
      "js",
      "pet-project",
      "snake",
      "snake-game",
      "web-game",
      "javascript"
    ],
    "link": "https://github.com/helliong/snake"
  },
  {
    "id": "gallerypython",
    "name": "GalleryPython",
    "image": "/assets/img/projects/mockup-galleryPython.webp",
    "alt": "GalleryPython",
    "description": "No description yet.",
    "tags": [
      "gallery",
      "json",
      "pet-project",
      "python",
      "css"
    ],
    "link": "https://github.com/helliong/galleryPython"
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
    "link": "https://github.com/helliong/password-generator"
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
    "link": "https://github.com/helliong/construction"
  },
  {
    "id": "leafcatcher",
    "name": "Leafcatcher",
    "image": "/assets/img/projects/mockup-leafcatcher.webp",
    "alt": "Leafcatcher",
    "description": "Catch leaves, but be careful with the red ones :)",
    "tags": [
      "css",
      "html",
      "js",
      "pet-project",
      "web",
      "web-game"
    ],
    "link": "https://github.com/helliong/leafcatcher"
  }
];
