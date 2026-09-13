"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { Lightbox } from "@/components/lightbox";
import { ExpandIcon } from "@/components/icons";

export function ProjectGallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  const [hero, ...rest] = project.shots;

  return (
    <>
      <figure className="group relative">
        <button
          onClick={() => setOpen(0)}
          className="relative block w-full overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--accent-line)" }}
          aria-label={`Open ${hero.caption} full screen`}
        >
          <Image
            src={hero.src}
            alt={hero.caption}
            width={1600}
            height={1000}
            priority
            className="h-auto w-full"
          />
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-bg/70 text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <ExpandIcon className="h-4 w-4" />
          </span>
        </button>
        <figcaption className="mt-3 text-center text-xs text-faint">
          {hero.caption}
        </figcaption>
      </figure>

      {rest.length > 0 && (
        <div
          className={`mt-4 grid gap-4 ${
            rest.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"
          }`}
        >
          {rest.map((shot, i) => (
            <figure key={shot.src} className="group">
              <button
                onClick={() => setOpen(i + 1)}
                className="relative block w-full overflow-hidden rounded-xl border border-line transition-colors duration-300 hover:border-accent-line"
                aria-label={`Open ${shot.caption} full screen`}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={1600}
                  height={1000}
                  className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-bg/70 text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <ExpandIcon className="h-3.5 w-3.5" />
                </span>
              </button>
              <figcaption className="mt-2.5 text-xs text-faint">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <Lightbox
        shots={project.shots}
        index={open}
        accent={project.accent}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
