import fs from "fs";
import path from "path";

// Generates the project data module from public repositories on GitHub.
const USERNAME = "helliong";
const HIDDEN_TAG = "portfolio-hidden";

const OUTPUT_FILE = path.join(process.cwd(), "src/data/projects.ts");
const PROJECTS_IMG_DIR = path.join(process.cwd(), "public/assets/img/projects");

const EXCLUDED_REPOS = new Set([
  "portfolio-next",
  "Portfolio-next",
  "helliong.github.io",
]);

/** Converts repository slugs into display-friendly project names. */
function titleCase(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Accepts only valid non-GitHub homepages as live demo links. */
function normalizeLiveDemo(homepage) {
  if (!homepage) return null;

  try {
    const url = new URL(homepage);
    return url.hostname === "github.com" || url.hostname === "www.github.com"
      ? null
      : url.toString();
  } catch {
    return null;
  }
}

/** Normalizes repository names for IDs and image filenames. */
function slugify(value) {
  return value.toLowerCase().trim();
}

/** Returns the first supported local image extension for a repository. */
function imageExists(repoName) {
  const normalizedName = slugify(repoName);
  const extensions = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

  return extensions.find((ext) =>
    fs.existsSync(
      path.join(PROJECTS_IMG_DIR, `mockup-${normalizedName}${ext}`),
    ),
  );
}

/** Fetches the account repositories used as the generation source. */
async function getRepos() {
  const response = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/** Converts one GitHub repository response into the local project shape. */
function createProject(repo) {
  const id = slugify(repo.name);
  const foundExt = imageExists(repo.name);

  const image = foundExt
    ? `/assets/img/projects/mockup-${id}${foundExt}`
    : "/assets/img/projects/no-photo.webp";

  const tags = [
    ...(repo.topics || []),
    repo.language ? repo.language.toLowerCase() : null,
  ]
    .filter(Boolean)
    .map((tag) => tag.toLowerCase());

  return {
    id,
    name: titleCase(repo.name),
    image,
    alt: titleCase(repo.name),
    description: repo.description || "No description yet.",
    tags: [...new Set(tags)],
    link: repo.html_url,
    liveDemo: normalizeLiveDemo(repo.homepage),
  };
}

/** Serializes project records into the generated TypeScript data module. */
function toTs(projects) {
  return `// This file is generated from GitHub by scripts/generate-projects.mjs.
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

// Hand-picked cases retained alongside the generated project collection.
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
export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

/** Filters repositories and writes the final project data file. */
async function main() {
  if (!fs.existsSync(PROJECTS_IMG_DIR)) {
    fs.mkdirSync(PROJECTS_IMG_DIR, { recursive: true });
  }

  const repos = await getRepos();

  // console.log(
  //   repos.map((repo) => ({
  //     name: repo.name,
  //     topics: repo.topics,
  //   })),
  // );

  const projects = repos
    .filter((repo) => !EXCLUDED_REPOS.has(repo.name))
    .filter((repo) => !repo.fork)
    .filter((repo) => !repo.archived)
    .filter((repo) => {
      const topics = (repo.topics || []).map((topic) => topic.toLowerCase());

      return !topics.includes(HIDDEN_TAG);
    })
    .map(createProject);

  fs.writeFileSync(OUTPUT_FILE, toTs(projects), "utf8");

  console.log(`Generated ${projects.length} projects in src/data/projects.ts`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
