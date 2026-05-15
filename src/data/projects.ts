import React from "react";

export type Project = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  link: string;
};

export const cases = [
  {
    id: "rebranding",
    name: "rebranding",
    image: "/assets/img/svg/rebranding-project.svg",
    alt: "rebranding project",
    link: "https://github.com/helliong/budss",
  },
  {
    id: "construction",
    name: "construction",
    image: "/assets/img/mockup-construction-project-optimized.webp",
    alt: "construction project",
    link: "https://github.com/helliong/KONSTRUKT",
  },
  {
    id: "link cast",
    name: "link cast",
    image: "/assets/img/mockup-linkcast-optimized.webp",
    alt: "link cast project",
    link: "https://linkcast.helliong.space/",
  },
];

export const projects: Project[] = [
  {
    id: "gallery-python",
    name: "Gallery on python",
    image: "/assets/img/mockup-gallery-project-optimized.webp",
    alt: "Gallery on python",
    description:
      "This is a simple and neat gallery project that combines standard web technologies with a small Python script to automate the creation of an image structure. Essentially, it is an interactive static gallery where the frontend displays and navigates through images, while the backend creates a JSON tree of available files.",
    tags: ["js", "css", "python", "html"],
    link: "https://github.com/helliong/galleryPython",
  },
  {
    id: "snake",
    name: "Snake game",
    image: "/assets/img/mockup-snake-project-optimized.webp",
    alt: "Snake game",
    description:
      "This is a concise browser version of the classic arcade game Snake, with a focus on mobile usability. JavaScript handles the core game logic, HTML provides the markup, and CSS is responsible for the styling.",
    tags: ["js", "css", "html"],
    link: "https://github.com/helliong/snake",
  },
  {
    id: "leaf-catcher",
    name: "Leaf catcher",
    image: "/assets/img/mockup-leafcatcher-optimized.webp",
    alt: "Leaf catcher game",
    description:
      "This is a small interactive web game with friendly and clear gameplay: catch falling leaves and avoid dangerous red instances. The project is lightweight, cross-platform, and runs directly in the browser without a backend.",
    tags: ["js", "css", "html"],
    link: "https://github.com/helliong/leafcatcher",
  },
  {
    id: "password-generator",
    name: "Password generator",
    image: "/assets/img/mockup-password-project-optimized.webp",
    alt: "Password generator",
    description:
      "This is a small client-side web project that quickly and conveniently generates strong passwords. It is a typical frontend utility where markup sets the interface, styles decorate the visual part, and JavaScript implements the generation logic.",
    tags: ["js", "css", "html"],
    link: "https://github.com/helliong/password-generator",
  },
  {
    id: "campus-jobs",
    name: "Campus jobs",
    image: "/assets/img/svg/nophoto.svg",
    alt: "Campus jobs",
    description:
      "Campus Jobs is a web application designed to connect students with part-time job opportunities on their university campuses. The platform allows employers to post job listings, while students can browse and apply for positions that fit their schedules and interests. Built with a user-friendly interface, Campus Jobs aims to simplify the job search process for students and help them gain valuable work experience during their academic journey.",
    tags: ["react", "typescript", "tailwind", "next.js", "python"],
    link: "https://github.com/helliong/campus-jobs",
  },
  {
    id: "audio-switcher",
    name: "Audio switcher",
    image: "/assets/img/svg/nophoto.svg",
    alt: "Audio switcher",
    description:
      "Audio switcher is a web application designed to allow users to easily switch between different audio sources. The platform provides a simple interface for selecting and managing audio inputs, making it easy to toggle between various sound options. Built with a user-friendly interface, Audio switcher aims to simplify the audio management process for users.",

    tags: ["AutoHotkey"],
    link: "https://github.com/helliong/audio-switcher",
  },
  {
    id: "bmi-calculator",
    name: "BMI calculator",
    image: "/assets/img/mockup-bmi-app-optimized.webp",
    alt: "BMI calculator",
    description:
      "BMI calculator is a simple web application designed to help users calculate their Body Mass Index (BMI). The platform provides a user-friendly interface for entering height and weight information, and then displays the calculated BMI along with relevant health information. Built with a focus on simplicity and usability, the BMI calculator aims to make health tracking accessible to everyone.",
    tags: ["next.js", "typescript", "tailwind", "supabase", "react"],
    link: "https://github.com/helliong/bmi-calculator",
  },
];

export const experienceGroups = [
  {
    title: "I’ve had experiences with",
    items: [
      "MySQL Database",
      "GIT, GitHub",
      "Coding PHP",
      "Figma, Adobe Illustrator",
      "Coding Python",
      "Next.js",
    ],
  },
  {
    title: "I have years of experience with",
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
    title: "I work and study about",
    items: [
      "Studying React",
      "Studying TypeScript",
      "Studying Node.js",
      "Using Adobe Package",
      "Studying User Experience",
      "Studying SCSS",
      "Studying Tailwind CSS",
    ],
  },
];
