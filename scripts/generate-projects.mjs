import fs from "fs";
import path from "path";

const USERNAME = "helliong";
const HIDDEN_TAG = "portfolio-hidden";

const OUTPUT_FILE = path.join(process.cwd(), "src/data/projects.ts");
const PROJECTS_IMG_DIR = path.join(process.cwd(), "public/assets/img/projects");

const EXCLUDED_REPOS = new Set([
  "portfolio-next",
  "Portfolio-next",
  "helliong.github.io",
]);

function titleCase(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value) {
  return value.toLowerCase().trim();
}

function imageExists(repoName) {
  const extensions = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

  return extensions.find((ext) =>
    fs.existsSync(path.join(PROJECTS_IMG_DIR, `mockup-${repoName}${ext}`)),
  );
}

async function getRepos() {
  const response = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

function createProject(repo) {
  const id = slugify(repo.name);

  const foundExt = imageExists(repo.name);

  const image = foundExt
    ? `/assets/img/projects/mockup-${repo.name}${foundExt}`
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
  };
}

function toTs(projects) {
  return `export type Project = {
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
    link: "https://github.com/${USERNAME}",
  },
  {
    id: "construction",
    name: "construction",
    image: "/assets/img/projects/mockup-construction.webp",
    alt: "construction project",
    description: "Construction landing page case.",
    tags: ["landing", "frontend", "ui"],
    link: "https://github.com/${USERNAME}",
  },
  {
    id: "link cast",
    name: "link cast",
    image: "/assets/img/projects/mockup-linkcast.webp",
    alt: "link cast project",
    description: "Link casting application case.",
    tags: ["application", "frontend", "ui"],
    link: "https://github.com/${USERNAME}",
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

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

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
