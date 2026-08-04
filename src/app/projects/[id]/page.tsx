import { getProjectDetails } from "@/data/projectDetails";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.name} | Egor Yakovlev`,
    description: getProjectDetails(project).summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const sourceProject = projects.find((item) => item.id === id);

  if (!sourceProject) {
    notFound();
  }

  const project = getProjectDetails(sourceProject);

  return (
    <main className="min-h-screen bg-[var(--bg-color)] px-4 py-8 font-noto text-[var(--text-color)] transition-colors duration-300 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[1478px]">
        <nav className="flex items-center justify-between border-b border-[var(--line-color)] pb-6">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[14px] lowercase opacity-60 transition hover:opacity-100 sm:text-[16px]"
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
            />
            all projects
          </Link>

          <Link
            href="/"
            className="text-[14px] lowercase opacity-60 transition hover:opacity-100 sm:text-[16px]"
          >
            portfolio
          </Link>
        </nav>

        <header className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="text-[14px] font-medium uppercase tracking-[0.08em] text-[var(--line-color)] opacity-60">
              selected project / {project.id}
            </span>
            <h1 className="mt-5 max-w-[1000px] text-[42px] font-extrabold leading-[1.05] lowercase sm:text-[64px] lg:text-[86px]">
              {project.name}
            </h1>
            <p className="mt-7 max-w-[760px] text-[18px] font-light leading-[1.5] opacity-[var(--opacity)] sm:text-[22px]">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 border border-[var(--line-color)] px-5 text-[14px] font-medium lowercase transition hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
            >
              github
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>

            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 bg-[var(--text-color)] px-5 text-[14px] font-medium lowercase text-[var(--bg-color)] transition hover:opacity-75"
              >
                live demo
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex min-h-12 cursor-not-allowed items-center border border-[var(--line-color)] px-5 text-[14px] lowercase opacity-35">
                demo unavailable
              </span>
            )}
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--line-color)] bg-white/[0.03]">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            priority
            sizes="(max-width: 1510px) 100vw, 1478px"
            className="object-contain"
          />
        </div>

        <section className="grid gap-14 border-b border-[var(--line-color)] py-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)] lg:gap-24 lg:py-28">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] opacity-50">
              01 / about
            </p>
            <h2 className="mt-5 text-[28px] font-bold lowercase sm:text-[36px]">
              project overview
            </h2>
            <p className="mt-7 max-w-[850px] text-[17px] font-light leading-[1.7] opacity-[var(--opacity)] sm:text-[20px]">
              {project.overview}
            </p>
          </div>

          <aside>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] opacity-50">
              technologies
            </p>
            <ul className="mt-5 border-t border-[var(--line-color)]">
              {project.tags.map((tag, index) => (
                <li
                  key={tag}
                  className="flex items-center justify-between border-b border-[var(--line-color)] py-4 text-[16px] lowercase"
                >
                  <span>{tag}</span>
                  <span className="text-[12px] font-medium opacity-35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="py-20 lg:py-28">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] opacity-50">
            02 / functionality
          </p>
          <div className="mt-5 grid gap-10 lg:grid-cols-2 lg:gap-24">
            <h2 className="max-w-[560px] text-[28px] font-bold lowercase sm:text-[36px]">
              what the project can do
            </h2>
            <ol className="border-t border-[var(--line-color)]">
              {project.features.map((feature, index) => (
                <li
                  key={feature}
                  className="grid grid-cols-[36px_1fr] gap-4 border-b border-[var(--line-color)] py-5 text-[16px] font-light sm:grid-cols-[48px_1fr] sm:text-[19px]"
                >
                  <span className="text-[13px] font-medium opacity-40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
