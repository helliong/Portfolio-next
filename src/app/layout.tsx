import type { Metadata } from "next";
import { DotGothic16, Roboto, Roboto_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import PreferencesProvider from "@/components/PreferencesProvider";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  weight: ["400"],
});

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
});

// Shared metadata used by every route unless a page provides an override.
export const metadata: Metadata = {
  title: "Egor Yakovlev | Full-stack developer",
  description: "Full-stack developer portfolio",
  icons: {
    icon: "/logoWhite.svg",
  },
};

/** Applies global fonts, styles, and document structure to every page. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoMono.variable} ${roboto.variable} ${dotGothic.variable}`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var l=localStorage.getItem('portfolio-language');var t=localStorage.getItem('portfolio-theme');if(l==='ru'||l==='en')document.documentElement.lang=l;if(t==='light')document.body.classList.add('light');}catch(e){}})();` }} />
        <PreferencesProvider>
          {children}
          <CookieBanner />
        </PreferencesProvider>
      </body>
    </html>
  );
}
