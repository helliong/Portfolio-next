import { experienceGroups } from "@/data/projects";

const socials = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/hellliong/" },
  { label: "GITHUB", href: "https://github.com/helliong" },
  { label: "EMAIL", href: "mailto:saoffabg@gmail.com" },
  { label: "TELEGRAM", href: "https://t.me/lege0rge" },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-10 py-24 sm:py-32 lg:py-[10%] lg:pb-[12%]"
    >
      <h2 className="flex flex-col text-[28px] font-bold lowercase lg:text-3xl">
        about me
        <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)]" />
      </h2>

      <div className="mt-14 flex flex-col gap-8 lg:mt-[10%] lg:flex-row lg:gap-10">
        <div className="flex justify-center lg:block">
          <img
            src={"/assets/img/svg/author-photo.svg"}
            alt="Author Photo"
            className="
    h-auto
  w-[240px]
  sm:w-[300px]
  md:w-[380px]
  lg:w-[460px]
  xl:w-[620px]
  shrink-0
  "
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[28px] sm:text-[32px] lg:text-4xl">
            Egor Yakovlev
          </span>

          <span className="mt-5 text-[17px] font-[var(--font-weight-bio)] leading-[1.45] opacity-[var(--opacity)] sm:text-[22px] lg:text-[27px]">
            I’m a beginner front-end developer. I focus on building clean,
            responsive, and user-friendly web interfaces. I’m constantly
            learning new technologies and improving my skills to create modern,
            efficient, and visually appealing websites.
          </span>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-[18px] sm:text-[22px] lg:text-[24px]">
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
                className="group relative inline-block"
              >
                <span className="relative z-10 transition duration-300 group-hover:drop-shadow-[0_0_10px_var(--text-color)]">
                  {social.label}
                </span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[var(--line-color)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-16 lg:pt-[10%]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-14">
          {experienceGroups.map((group) => (
            <div
              key={group.title}
              className="border-t-[5px] border-[var(--line-color)] pt-4"
            >
              <h3 className="text-[18px] font-extrabold sm:text-[21px] lg:text-[25px]">
                {group.title}
              </h3>

              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] font-light leading-[1.4] opacity-[var(--opacity)] sm:text-[16px] lg:text-[20px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
