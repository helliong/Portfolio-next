import { DotGothic16, Roboto, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n";

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

type DocumentShellProps = {
  children: ReactNode;
  language: Locale;
};

/** Applies global fonts, early preferences, and the document language. */
export default function DocumentShell({ children, language }: DocumentShellProps) {
  return (
    <html lang={language} suppressHydrationWarning>
      <body
        className={`${robotoMono.variable} ${roboto.variable} ${dotGothic.variable}`}
        suppressHydrationWarning
      >
        <Script id="portfolio-preferences" strategy="beforeInteractive">
          {`(function(){try{var p=location.pathname.split('/')[1];var l=(p==='ru'||p==='en')?p:localStorage.getItem('portfolio-language');var t=localStorage.getItem('portfolio-theme');if(l==='ru'||l==='en')document.documentElement.lang=l;if(t==='light')document.body.classList.add('light');else document.body.classList.remove('light');}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
