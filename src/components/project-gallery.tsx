import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/project-cover";

export function ProjectGallery({ project }: { project: Project }) {
  const count = Math.max(3, Math.min(project.screenshotCount, 5));
  const panels = Array.from({ length: count });

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {panels.map((_, i) => (
        <ProjectCover
          key={i}
          project={project}
          className={`rounded-xl ${i === 0 ? "sm:col-span-2 h-64" : "h-64"}`}
        />
      ))}
    </div>
  );
}
