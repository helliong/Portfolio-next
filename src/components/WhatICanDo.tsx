import { ArrowUpRight, GitBranch, Layers3, PanelTop } from "lucide-react";

const services = [
  {
    number: "01",
    title: "web interfaces",
    items: ["responsive layout", "ui components"],
    description:
      "I build clean, responsive interfaces and reusable components that work smoothly across devices and screen sizes.",
    tags: ["html", "css", "javascript", "react", "tailwind"],
    icon: PanelTop,
  },
  {
    number: "02",
    title: "applications & integrations",
    items: ["landing pages", "api integration"],
    description:
      "I create focused pages and connect applications with reliable integrations, forms, and data sources to keep everything in sync.",
    tags: ["next.js", "node.js", "rest api", "supabase", "smtp"],
    icon: Layers3,
  },
  {
    number: "03",
    title: "performance & delivery",
    items: ["frontend optimization", "git workflow"],
    description:
      "I improve frontend performance and follow a clean Git workflow to ship maintainable, versioned code with confidence.",
    tags: ["lighthouse", "web vitals", "git", "github", "vercel"],
    icon: GitBranch,
  },
];

export default function WhatICanDo() {
  return (
    <section id="services" className="scroll-mt-10 py-24 sm:py-32 lg:py-[14%]">
      <div className="relative">
        <h2 className="flex flex-col text-[28px] font-bold lowercase lg:text-3xl">
          what i can do
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)]" />
        </h2>

        <p className="mt-8 max-w-[820px] text-[16px] font-light leading-[1.45] opacity-[var(--opacity)] sm:text-[20px]">
          From interface to deployment - focused on clarity, performance and
          maintainable code.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-[8%] lg:grid-cols-3 lg:gap-14">
          {services.map(
            ({ number, title, items, description, tags, icon: Icon }) => (
              <article
                key={title}
                className="group flex min-h-[430px] flex-col border-t border-[var(--line-color)] pt-7"
              >
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-dot text-[22px] text-[var(--line-color)] opacity-80">
                    {number}
                  </span>

                  <ArrowUpRight
                    size={30}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                  />
                </div>

                <div className="mb-9 flex h-[72px] items-center">
                  <Icon size={58} strokeWidth={1.35} aria-hidden="true" />
                </div>

                <h3 className="text-[25px] font-extrabold leading-[1.15] lowercase sm:text-[29px]">
                  {title}
                </h3>

                <ul className="mt-5 space-y-2 text-[18px] leading-[1.35] sm:text-[21px]">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <span className="size-1.5 rounded-full bg-[var(--line-color)] opacity-80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 mb-6 max-w-[440px] text-[16px] font-light leading-[1.45] opacity-[var(--opacity)] sm:text-[19px]">
                  {description}
                </p>

                <div className="mt-auto min-h-[78px] border-t border-[var(--line-color)] pt-5">
                  <div className="flex flex-wrap gap-x-3 gap-y-2 text-[12px] font-light uppercase tracking-[0.18em] opacity-[var(--opacity)] sm:text-[10px]">
                    {tags.map((tag, index) => (
                      <span key={tag} className="flex items-center gap-3">
                        {tag}
                        {index < tags.length - 1 && (
                          <span className="size-1 rounded-full bg-[var(--line-color)]" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
