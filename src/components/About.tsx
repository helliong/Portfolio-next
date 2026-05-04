import { experienceGroups } from "@/data/projects";

export default function About() {
  return (
    <section id="about" className="py-[10%] pb-[20%] scroll-m-10">
      <div className="relative flex justify-between">
        <span className="absolute top-0 flex flex-col items-start whitespace-nowrap text-3xl font-bold max-md:text-[28px]">
          about me
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)] max-md:w-[35px]" />
        </span>
      </div>

      <div className="mt-[10%] flex gap-10 max-md:mt-[15%] max-md:flex-col max-md:gap-5">
        <div className="max-md:flex max-md:items-center max-md:justify-center">
          <img
            src="/assets/img/svg/author-photo.svg"
            alt="Author Photo"
            className="max-w-[300px] max-md:w-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-4xl max-md:text-2xl">Egor Yakovlev</span>
          <span className="mt-5 text-[27px] font-[var(--font-weight-bio)] text-[var(--text-color)] opacity-[var(--opacity)] max-md:text-base">
            I’m a beginner front-end developer. I focus on building clean,
            responsive, and user-friendly web interfaces. I’m constantly
            learning new technologies and improving my skills to create modern,
            efficient, and visually appealing websites.
          </span>

          <div className="mt-6 flex gap-6 text-[24px]">
            <a href="#" className="group relative inline-block">
              <span className="relative z-10 transition duration-300 group-hover:text-white">
                INSTAGRAM
              </span>

              <span className="absolute inset-0 -z-10 opacity-0 blur-lg transition duration-300 group-hover:opacity-100 bg-white/20" />

              <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-white origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>

            <a href="#" className="group relative inline-block">
              <span className="relative z-10 transition duration-300 group-hover:text-white">
                GITHUB
              </span>

              {/* glow */}
              <span className="absolute inset-0 -z-10 opacity-0 blur-lg transition duration-300 group-hover:opacity-100 bg-white/20" />

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-white origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>

            <a href="#" className="group relative inline-block">
              <span className="relative z-10 transition duration-300 group-hover:text-white">
                EMAIL
              </span>

              {/* glow */}
              <span className="absolute inset-0 -z-10 opacity-0 blur-lg transition duration-300 group-hover:opacity-100 bg-white/20" />

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-white origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>

            <a href="#" className="group relative inline-block">
              <span className="relative z-10 transition duration-300 group-hover:text-white">
                TELEGRAM
              </span>

              {/* glow */}
              <span className="absolute inset-0 -z-10 opacity-0 blur-lg transition duration-300 group-hover:opacity-100 bg-white/20" />

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-white origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>

      <div className="py-[1%] pb-[20%]">
        <div className="relative flex justify-between max-md:flex-col">
          {experienceGroups.map((group) => (
            <div
              key={group.title}
              className="mt-[10%] h-[5px] w-auto bg-[var(--line-color)] text-[25px] font-extrabold max-md:text-[15px]"
            >
              <div className="mt-[15px]">{group.title}</div>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="mt-2.5 flex max-w-[420px] gap-2.5 text-xl font-light leading-[1.4] opacity-[var(--opacity)] max-md:text-xs"
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
