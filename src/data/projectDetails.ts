import type { Project } from "./projects";

export type ProjectDetails = Project & {
  summary: string;
  overview: string;
  features: string[];
  liveDemo?: string | null;
};

type ProjectOverride = Pick<
  ProjectDetails,
  "summary" | "overview" | "features"
> & {
  liveDemo?: string;
};

// Adds editorial copy that is not available from the generated GitHub data.
const projectOverrides: Record<string, ProjectOverride> = {
  pinwindow: {
    summary:
      "A lightweight Windows utility for keeping any selected window above the rest of the desktop.",
    overview:
      "PinWindow is a focused desktop tool built for the moments when one application needs to stay visible while you work elsewhere. The project keeps the interaction simple and gives the user direct control over the always-on-top state without adding a heavy background application.",
    features: [
      "Select a window and keep it always on top",
      "Quickly enable or disable the pinned state",
      "Native Windows behavior in a compact utility",
      "Minimal interface designed for a single clear task",
    ],
  },
  "lumea-candles": {
    summary:
      "A responsive storefront concept for a handmade candle brand with a calm, product-led interface.",
    overview:
      "Lumea Candles explores an ecommerce experience centered on clear product presentation and a consistent visual identity. The application is structured with reusable components and responsive layouts so the catalogue remains comfortable to browse across screen sizes.",
    features: [
      "Responsive product catalogue",
      "Reusable product and content components",
      "Typed application structure",
      "Mobile and desktop layouts",
    ],
  },
  "campus-and-code": {
    summary:
      "A full-stack learning platform that connects a modern frontend with persistent data and supporting services.",
    overview:
      "Campus And Code is a larger application focused on organizing educational content and user interactions. It combines a typed Next.js interface with a PostgreSQL data layer, file storage, email delivery and containerized services.",
    features: [
      "Structured learning content and application pages",
      "Persistent data stored in PostgreSQL",
      "Email notifications through Nodemailer",
      "S3-compatible file storage and Docker-based setup",
    ],
  },
  "market-ai": {
    summary:
      "An AI-oriented market application built as a set of connected frontend and backend services.",
    overview:
      "Market AI is an experiment in combining a modern web interface with an isolated service architecture. The project uses typed frontend code and containerized services to keep responsibilities separated and make integrations easier to develop and deploy.",
    features: [
      "Market-focused interface and data presentation",
      "Service-based application architecture",
      "Containerized local environment",
      "Responsive React interface",
    ],
  },
  linkcast: {
    summary:
      "A Python utility for working with links through a small, task-focused workflow.",
    overview:
      "Linkcast is a compact Python project built around processing and sharing links without unnecessary interface complexity. It keeps the implementation direct and makes the core workflow easy to run and extend.",
    features: [
      "Link input and processing workflow",
      "Compact Python implementation",
      "Clear task-oriented interaction",
      "Simple foundation for further integrations",
    ],
  },
  "qr-link-generator": {
    summary:
      "A typed web utility that turns links into QR codes ready to preview and share.",
    overview:
      "QR Link Generator provides a straightforward way to create a QR code from a URL. The interface keeps attention on the input, generated result and quick repeat use while TypeScript keeps the data flow predictable.",
    features: [
      "Generate a QR code from a URL",
      "Immediate result preview",
      "Input validation and typed state",
      "Responsive utility interface",
    ],
  },
  "bmi-calculator": {
    summary:
      "A Python calculator for estimating body mass index from a small set of user inputs.",
    overview:
      "BMI Calculator is a concise Python project that turns height and weight values into a readable BMI result. The implementation focuses on input handling, calculation logic and clear output.",
    features: [
      "Height and weight input",
      "Automatic BMI calculation",
      "Readable result classification",
      "Input checks for valid values",
    ],
  },
  "audio-switcher": {
    summary:
      "A Windows automation script for changing audio devices without opening system settings.",
    overview:
      "Audio Switcher uses AutoHotkey to reduce a repeated Windows audio task to a quick action. It is designed for users who frequently move between headphones, speakers or other output devices.",
    features: [
      "Switch between configured audio devices",
      "Keyboard-driven Windows automation",
      "Fast workflow without opening settings",
      "Lightweight script-based setup",
    ],
  },
  "password-generator": {
    summary:
      "A browser-based tool for creating configurable random passwords.",
    overview:
      "Password Generator is a compact frontend utility built with native web technologies. It lets the user adjust password requirements and generates a result directly in the browser with no server dependency.",
    features: [
      "Generate random passwords in the browser",
      "Configure password length and character groups",
      "Copy the generated result",
      "Responsive interface with no backend dependency",
    ],
  },
  construction: {
    summary:
      "A responsive construction company landing page built around clear sections and service presentation.",
    overview:
      "Construction is an early landing-page project focused on translating a visual layout into a working responsive site. It includes the core content sections expected from a company page and adapts them for smaller screens.",
    features: [
      "Responsive landing-page layout",
      "Service and company content sections",
      "Interactive behavior with jQuery",
      "Semantic HTML and custom CSS styling",
    ],
  },
};

/** Merges generated project data with editorial details and safe fallbacks. */
export function getProjectDetails(project: Project): ProjectDetails {
  const details = projectOverrides[project.id];

  return {
    ...project,
    summary:
      details?.summary ??
      project.description ??
      `A personal project built with ${project.tags.join(", ")}.`,
    overview:
      details?.overview ??
      project.description ??
      "This project explores a focused product idea through a clear, maintainable implementation.",
    features: details?.features ?? [
      "Focused project workflow",
      "Responsive user interface",
      "Maintainable implementation",
    ],
    liveDemo: details?.liveDemo ?? project.liveDemo ?? null,
  };
}
