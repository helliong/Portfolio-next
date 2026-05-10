import type { Metadata } from "next";
import { DotGothic16, Noto_Sans } from "next/font/google";
import "./globals.css";
import { getAssetPath } from "@/lib/getAssetPath";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-sans",
});

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
});

export const metadata: Metadata = {
  title: "Egor Yakovlev | Frontend developer",
  description: "Frontend developer portfolio",
  icons: {
    icon: getAssetPath("/logoWhite.svg"),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${dotGothic.variable}`}>{children}</body>
    </html>
  );
}
