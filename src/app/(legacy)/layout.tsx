import type { Metadata } from "next";
import DocumentShell from "@/components/DocumentShell";
import { defaultLocale, siteUrl } from "@/i18n";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Egor Yakovlev - Full-stack Developer | React, Next.js, TypeScript",
  description: "Full-stack developer portfolio",
  icons: {
    icon: "/logoWhite.svg",
  },
};

export default function LegacyRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocumentShell language={defaultLocale}>{children}</DocumentShell>;
}
