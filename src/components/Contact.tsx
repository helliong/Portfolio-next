"use client";

import { useEffect, useState } from "react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hellliong/",
    light: "/assets/img/svg/instagramWhite.svg",
    dark: "/assets/img/svg/instagramDark.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/helliong",
    light: "/assets/img/svg/githubWhite.svg",
    dark: "/assets/img/svg/githubDark.svg",
  },
  {
    label: "Gmail",
    href: "mailto:saoffabg@gmail.com",
    light: "/assets/img/svg/gmailWhite.svg",
    dark: "/assets/img/svg/gmailDark.svg",
  },
  {
    label: "Telegram",
    href: "https://t.me/lege0rge",
    light: "/assets/img/svg/telegramWhite.svg",
    dark: "/assets/img/svg/telegramDark.svg",
  },
];

export default function Contact() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.body.classList.contains("light"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsLight(document.body.classList.contains("light"));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="scroll-mt-10 py-24 sm:py-32 lg:py-[15%]">
      <div className="flex flex-col items-center">
        <h2 className="flex flex-col items-center text-[28px] font-bold lowercase lg:text-3xl">
          contact me
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)]" />
        </h2>

        <div className="mt-20 flex w-full flex-wrap items-center justify-center gap-8 sm:gap-12 lg:mt-[200px] lg:gap-[10%]">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition hover:scale-110"
            >
              <img
                src={isLight ? social.dark : social.light}
                alt={social.label}
                className="w-9 sm:w-10 md:w-11 lg:w-[48px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}