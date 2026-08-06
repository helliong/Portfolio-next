// Controls the order shared by the archive and individual project navigation.
export const projectOrder = [
  "qr-link-generator",
  "campus-and-code",
  "market-ai",
  "lumea-candles",
  "pinwindow",
  "linkcast",
  "bmi-calculator",
  "audio-switcher",
  "password-generator",
  "construction",
] as const;

// Maps each project to the archive filter that should contain it.
export const projectCategories = {
  "qr-link-generator": "tools",
  "campus-and-code": "web",
  "market-ai": "web",
  "lumea-candles": "web",
  pinwindow: "apps",
  linkcast: "tools",
  "bmi-calculator": "tools",
  "audio-switcher": "apps",
  "password-generator": "tools",
  construction: "web",
} as const;

// Stores the display year independently from generated repository metadata.
export const projectYears: Record<string, string> = {
  "qr-link-generator": "2024",
  "campus-and-code": "2025",
  "market-ai": "2025",
  "lumea-candles": "2025",
  pinwindow: "2025",
  linkcast: "2025",
  "bmi-calculator": "2024",
  "audio-switcher": "2024",
  "password-generator": "2023",
  construction: "2022",
};
