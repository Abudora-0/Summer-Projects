"use client";

import { useMemo, useState } from "react";
import { allTags, projects } from "@/data/projects";
import { ProjectTile } from "@/components/project-tile";

export function WorkSection() {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active ? projects.filter((p) => p.tags.includes(active)) : projects),
    [active]
  );

  return (
    <section id="work" className="scroll-mt-24 border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
              Work
            </p>
            <h2 className="font-display mt-5 text-3xl italic text-paper sm:text-4xl">
              Nine products, each in its own voice
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Every card below is themed in that product&apos;s own real accent
            color, not a shared template.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            data-cursor="link"
            className="rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
            style={{
              borderColor: active === null ? "var(--accent)" : "var(--line)",
              color: active === null ? "var(--paper)" : "var(--muted)",
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag === active ? null : tag)}
              data-cursor="link"
              className="rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
              style={{
                borderColor: active === tag ? "var(--accent)" : "var(--line)",
                color: active === tag ? "var(--paper)" : "var(--muted)",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
