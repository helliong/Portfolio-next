"use client";

import { useEffect, useState } from "react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/hellliong/", dark: "/assets/img/svg/instagramDark.svg", light: "/assets/img/svg/instagramWhite.svg" },
  { label: "GitHub", href: "https://github.com/helliong", dark: "/assets/img/svg/githubDark.svg", light: "/assets/img/svg/githubWhite.svg" },
  { label: "Gmail", href: "mailto:saoffabg@gmail.com", dark: "/assets/img/svg/gmailDark.svg", light: "/assets/img/svg/gmailWhite.svg" },
  { label: "Telegram", href: "https://t.me/lege0rge", dark: "/assets/img/svg/telegramDark.svg", light: "/assets/img/svg/telegramWhite.svg" },
];

export default function Contact() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.body.classList.contains("light"));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    setIsLight(document.body.classList.contains("light"));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-[10%] max-md:py-[50%] max-md:pb-[20%] scroll-m-10">
      <div className="relative flex flex-col items-center">
        <span className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center whitespace-nowrap text-3xl font-bold max-md:text-[28px]">
          contact me
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)] max-md:w-[60px]" />
        </span>

        <div className="mt-[200px] flex w-full items-center justify-center gap-[10%] pb-[5vw] max-md:mt-[120px] max-md:gap-[15%]">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined}>
              <img src={isLight ? social.dark : social.light} alt={social.label} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
