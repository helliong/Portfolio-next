import { projects } from "@/data/projects";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <main className="min-h-screen bg-[var(--bg-color)] px-4 py-16 text-[var(--text-color)]">
      <div className="mx-auto max-w-[1000px]">
        <a href="/projects" className="mb-10 inline-block opacity-60">
          ← back
        </a>

        <h1 className="mb-6 text-[40px] font-bold lowercase">
          {project.name}
        </h1>

        <img
          src={project.image}
          alt={project.name}
          className="mb-6 w-full rounded-lg border"
        />

        <p className="text-[16px] opacity-[var(--opacity)]">
          {project.description}
        </p>
      </div>
    </main>
  );
}