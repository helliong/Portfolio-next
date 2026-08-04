import type { Metadata } from "next";
import { DotGothic16, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
  weight: ["300", "400", "500", "600", "700"],
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
    icon: "/logoWhite.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable} ${dotGothic.variable}`}>{children}</body>
    </html>
  );
}
