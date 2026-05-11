"use client";

import { title } from "node:process";
import { useEffect, useState } from "react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hellliong/",
    light: "/assets/img/svg/instagramWhite.svg",
    dark: "/assets/img/svg/instagramDark.svg",
    title: "follow me for more updates!",
  },
  {
    label: "GitHub",
    href: "https://github.com/helliong",
    light: "/assets/img/svg/githubWhite.svg",
    dark: "/assets/img/svg/githubDark.svg",
    title: "check out my projects and code!",
  },
  {
    label: "Gmail",
    href: "mailto:saoffabg@gmail.com",
    light: "/assets/img/svg/gmailWhite.svg",
    dark: "/assets/img/svg/gmailDark.svg",
    title: "email me!",
  },
  {
    label: "Telegram",
    href: "https://t.me/lege0rge",
    light: "/assets/img/svg/telegramWhite.svg",
    dark: "/assets/img/svg/telegramDark.svg",
    title: "contact me on telegram!",
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

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    submit: "",
  });

  return (
    <section id="contact" className="scroll-mt-10 py-24 sm:py-32 lg:py-[15%]">
      <div className="flex flex-col items-center">
        <h2 className="flex flex-col items-center text-[28px] font-bold lowercase lg:text-3xl">
          contact me
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)]" />
        </h2>

        <div
          className="
     mt-14 w-full max-w-[760px]
    rounded-[32px]
    border border-[var(--tag-border-color)]
    bg-[var(--tag-bg-color)]
    p-6 sm:p-8 lg:p-10
    shadow-[var(--form-shadow)]
    backdrop-blur-x1
  "
        >
          <form
            noValidate
            className="flex flex-col gap-5"
            onSubmit={async (e) => {
              e.preventDefault();

              const form = e.currentTarget;

              const name = (
                form.elements.namedItem("name") as HTMLInputElement
              ).value.trim();
              const email = (
                form.elements.namedItem("email") as HTMLInputElement
              ).value.trim();
              const projectType = (
                form.elements.namedItem("projectType") as HTMLInputElement
              ).value.trim();
              const message = (
                form.elements.namedItem("message") as HTMLTextAreaElement
              ).value.trim();

              const newErrors = {
                name: "",
                email: "",
                message: "",
                submit: "",
              };

              if (!name) newErrors.name = "enter your name";
              if (!email) newErrors.email = "enter email";
              else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = "enter a valid email";
              }
              if (!message)
                newErrors.message = "write something about your project";

              setErrors(newErrors);
              setSuccess("");

              if (newErrors.name || newErrors.email || newErrors.message)
                return;

              try {
                setIsSending(true);

                const res = await fetch("/api/send", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                    projectType,
                    message,
                  }),
                });

                if (!res.ok) throw new Error("Failed to send");

                form.reset();
                setSuccess("request sent successfully");
              } catch {
                setErrors((prev) => ({
                  ...prev,
                  submit: "something went wrong. please try again later",
                }));
              } finally {
                setIsSending(false);
              }
            }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  name="name"
                  placeholder="your name"
                  className="
        rounded-2xl border
        border-[var(--tag-border-color)]
        bg-[var(--tag-bg-color)]
        px-5 py-4 text-[15px]
        text-[var(--text-color)]
        placeholder:text-[var(--text-color)]/35
        outline-none transition-all duration-300

        focus:border-[var(--line-color)]
        focus:bg-[var(--tag-bg-color)]
        focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]

        light:border-black/10
        light:bg-black/[0.03]
        light:placeholder:text-black/35
        light:focus:bg-black/[0.05]
        light:focus:shadow-[0_0_20px_rgba(0,0,0,0.05)]
      "
                />

                {errors.name && (
                  <span className="text-[12px] font-bold text-red-400 light:text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="
        rounded-2xl border
        border-[var(--tag-border-color)] bg-[var(--tag-bg-color)]
        px-5 py-4 text-[15px]
        text-[var(--text-color)]
        placeholder:text-[var(--text-color)]/35
        outline-none transition-all duration-300

        focus:border-[var(--line-color)]
        focus:bg-[var(--tag-bg-color)]
        focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]

        light:border-black/10
        light:bg-black/[0.03]
        light:placeholder:text-black/35
        light:focus:bg-black/[0.05]
        light:focus:shadow-[0_0_20px_rgba(0,0,0,0.05)]
      "
                />

                {errors.email && (
                  <span className="text-[12px] font-bold text-red-400 light:text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <input
              type="text"
              name="projectType"
              placeholder="project type"
              className="
    rounded-2xl border
    border-[var(--tag-border-color)] bg-[var(--tag-bg-color)]
    px-5 py-4 text-[15px]
    text-[var(--text-color)]
    placeholder:text-[var(--text-color)]/35
    outline-none transition-all duration-300

    focus:border-[var(--line-color)]
    focus:bg-[var(--tag-bg-color)]
    focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]

    light:border-black/10
    light:bg-black/[0.03]
    light:placeholder:text-black/35
    light:focus:bg-black/[0.05]
    light:focus:shadow-[0_0_20px_rgba(0,0,0,0.05)]
  "
            />

            <div className="flex flex-col gap-1">
              <textarea
                rows={7}
                name="message"
                placeholder="tell me about your project"
                className="
      resize-none rounded-2xl border
      border-[var(--tag-border-color)] bg-[var(--tag-bg-color)]
      px-5 py-4 text-[15px]
      text-[var(--text-color)]
      placeholder:text-[var(--text-color)]/35
      outline-none transition-all duration-300

      focus:border-[var(--line-color)]
      focus:bg-[var(--tag-bg-color)]
      focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]

      light:border-black/10
      light:bg-black/[0.03]
      light:placeholder:text-black/35
      light:focus:bg-black/[0.05]
      light:focus:shadow-[0_0_20px_rgba(0,0,0,0.05)]
    "
              />

              {errors.message && (
                <span className="text-[12px] font-bold text-red-400 light:text-red-500">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
              <div className="flex flex-col gap-2">
                <p className="max-w-[420px] text-[13px] leading-[1.6] opacity-[0.45]">
                  by sending this form you agree to discuss your project via
                  email or telegram
                </p>

                {errors.submit && (
                  <span className="text-[12px] font-bold text-red-400 light:text-red-500">
                    {errors.submit}
                  </span>
                )}

                {success && (
                  <span className="text-[12px] font-bold text-green-400 light:text-green-600">
                    {success}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="
      group relative overflow-hidden
      rounded-full border border-[var(--line-color)]
      px-8 py-4 text-[15px] font-medium lowercase

      transition-all duration-300

      hover:scale-[1.02]
      hover:bg-[var(--text-color)]
      hover:text-[var(--bg-color)]
      hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]

      light:hover:shadow-[0_0_30px_rgba(0,0,0,0.12)]

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
              >
                {isSending ? "sending..." : "send request →"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-20 flex w-full flex-wrap items-center justify-center gap-8 sm:gap-12 lg:mt-[200px] lg:gap-[10%]">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="transition hover:scale-110"
              title={social.title}
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
