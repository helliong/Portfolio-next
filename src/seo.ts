import type { Metadata } from "next";
import { localizedPath, siteUrl, type Locale } from "@/i18n";
import type { Project } from "@/data/projects";

const siteName = "Egor Yakovlev Portfolio";
const defaultSocialImage = "/assets/img/projects/mockup-qr-link-generator.webp";

type SocialMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

function openGraphLocale(locale: Locale) {
  return locale === "ru" ? "ru_RU" : "en_US";
}

export function socialMetadata({
  title,
  description,
  path,
  locale,
  image = defaultSocialImage,
}: SocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(localizedPath(path, locale));
  const imageUrl = absoluteUrl(image);

  return {
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      locale: openGraphLocale(locale),
      alternateLocale: openGraphLocale(locale === "ru" ? "en" : "ru"),
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function homeJsonLd(locale: Locale) {
  const homeUrl = absoluteUrl(localizedPath("/", locale));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${homeUrl}#person`,
      name: locale === "ru" ? "Егор Яковлев" : "Egor Yakovlev",
      url: homeUrl,
      jobTitle: locale === "ru" ? "Full-stack разработчик" : "Full-stack Developer",
      sameAs: [
        "https://github.com/helliong",
        "https://t.me/lege0rge",
        "https://www.instagram.com/hellliong/",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Frontend development",
        "Full-stack development",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      name: "Egor Yakovlev Portfolio",
      url: homeUrl,
      inLanguage: locale,
      author: {
        "@id": `${homeUrl}#person`,
      },
    },
  ];
}

export function projectsJsonLd(projects: Project[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "ru" ? "Проекты Егора Яковлева" : "Egor Yakovlev Projects",
    url: absoluteUrl(localizedPath("/projects", locale)),
    inLanguage: locale,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(localizedPath(`/projects/${project.id}`, locale)),
      name: project.name,
    })),
  };
}

export function projectJsonLd(
  project: Project,
  locale: Locale,
  summary: string,
) {
  const projectUrl = absoluteUrl(localizedPath(`/projects/${project.id}`, locale));

  return {
    "@context": "https://schema.org",
    "@type": project.category === "web" ? "WebSite" : "SoftwareSourceCode",
    name: project.name,
    url: projectUrl,
    description: summary,
    inLanguage: locale,
    image: absoluteUrl(project.image),
    dateCreated: project.year,
    author: {
      "@type": "Person",
      name: locale === "ru" ? "Егор Яковлев" : "Egor Yakovlev",
      url: absoluteUrl(localizedPath("/", locale)),
    },
    programmingLanguage: project.tags.filter((tag) => tag !== "live-hidden"),
    codeRepository: project.link || undefined,
    sameAs: project.liveDemo || project.link || undefined,
  };
}
