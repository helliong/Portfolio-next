import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-[20%] max-md:py-[7%] scroll-m-10">
      <div className="relative flex items-start justify-between">
        <span className="absolute right-0 top-0 flex flex-col items-end whitespace-nowrap text-3xl font-bold max-md:text-[28px]">
          personal projects
          <span className="mt-1.5 h-1 w-[75px] bg-[var(--line-color)] max-md:w-[30px]" />
        </span>

        <div className="mt-[200px] grid w-full grid-cols-2 gap-x-20 gap-y-[60px] max-md:mt-[100px] max-md:grid-cols-1 max-md:gap-10">
          {projects.slice(0, 4).map((project) => (
            <article key={project.id}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-6 max-md:flex-col"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-[270px] shrink-0 rounded-[5px] border border-white transition hover:scale-[1.03] max-md:w-full"
                />

                <div>
                  <h3 className="mb-2 text-[24px] font-semibold lowercase">
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
      <div className="mt-20 flex justify-center">
        <Link
          href="/projects"
          className="rounded-full border border-[var(--line-color)] px-8 py-3 text-[16px] font-medium lowercase transition hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
        >
          see all projects
        </Link>
      </div>
    </section>
  );
}
