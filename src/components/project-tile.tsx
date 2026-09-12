"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/project-cover";
import { useAccent } from "@/components/accent-provider";
import { ArrowUpRightIcon } from "@/components/icons";

export function ProjectTile({ project }: { project: Project }) {
  const { setAccent, resetAccent } = useAccent();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="project"
        data-cursor-label="View"
        onMouseEnter={() => setAccent(project.accent, project.accentSoft)}
        onMouseLeave={resetAccent}
        className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent"
      >
        <ProjectCover project={project} className="h-44 w-full sm:h-52" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl italic text-paper">
              {project.name}
            </h3>
            <ArrowUpRightIcon className="mt-1 h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
