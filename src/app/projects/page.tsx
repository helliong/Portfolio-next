import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-color)] px-4 py-16 text-[var(--text-color)] transition-colors duration-300">
      <div className="mx-auto max-w-[1478px]">
        <a
          href="/"
          className="mb-16 inline-flex text-[16px] opacity-60 transition hover:opacity-100"
        >
          ← back home
        </a>

        <h1 className="mb-20 flex flex-col text-[40px] font-bold lowercase max-md:text-[32px]">
          all projects
          <span className="mt-2 h-1 w-[90px] bg-[var(--line-color)]" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer">
          {projects.map((project) => (
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
                  className="h-auto w-[270px] shrink-0 rounded-[5px] border border-white transition duration-300 hover:scale-[1.03] max-md:w-full"
                />

                <div>
                  <h2 className="mb-2 text-[24px] font-semibold lowercase">
                    {project.name}
                  </h2>

                  <p className="max-w-[420px] text-[14px] font-light leading-[1.4] opacity-[var(--opacity)]">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--tag-border-color)] bg-[var(--tag-bg-color)] px-2 py-1 text-[11px] lowercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
