import type { Metadata } from "next";
import DocumentShell from "@/components/DocumentShell";
import { defaultLocale, isLocale, locales, siteUrl } from "@/i18n";
import "../globals.css";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Egor Yakovlev - Full-stack Developer | React, Next.js, TypeScript",
  description: "Full-stack developer portfolio",
  icons: {
    icon: "/logoWhite.svg",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleRootLayout({ children, params }: Props) {
  const { locale } = await params;
  const language = isLocale(locale) ? locale : defaultLocale;

  return <DocumentShell language={language}>{children}</DocumentShell>;
}
