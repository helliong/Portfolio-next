import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-10 py-24 sm:py-32 lg:py-[12%]">
      <div className="relative">
        <h2 className="flex flex-col text-[28px] font-bold lowercase lg:right-0 lg:top-0 lg:items-end lg:text-3xl">
          personal projects
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)]" />
        </h2>

        <div className="mt-16 grid w-full grid-cols-1 gap-10 lg:mt-[200px] lg:grid-cols-2 lg:gap-x-20 lg:gap-y-[60px]">
          {projects.slice(0, 4).map((project) => (
            <article key={project.id}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 max-md:flex-col"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full max-w-[270px] shrink-0 rounded-[5px] border border-white transition hover:scale-[1.03] md:w-[270px]"
                />

                <div>
                  <h3 className="mb-2 text-[22px] font-semibold lowercase sm:text-[24px]">
                    {project.name}
                  </h3>

                  <p className="max-w-[420px] text-[14px] font-light leading-[1.4] opacity-[var(--opacity)]">
                    {project.description}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      {projects.length > 4 && (
        <div className="mt-14 flex justify-center lg:mt-20">
          <Link
            href="/projects"
            className="rounded-full border border-[var(--line-color)] px-7 py-3 text-[15px] font-medium lowercase transition hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] sm:px-8 sm:text-[16px]"
          >
            see all projects
          </Link>
        </div>
      )}
    </section>
  );
}