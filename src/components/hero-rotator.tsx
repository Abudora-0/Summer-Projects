"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRightIcon } from "@/components/icons";

const INTERVAL = 3600;

/**
 * Cycles the nine products under the headline, each in its own colour.
 *
 * Replaces the paragraph that used to sit here. It says the same thing the
 * paragraph did, that these are nine unlike products, except it shows them
 * instead of describing them, and it doubles as a way into any of the nine.
 */
export function HeroRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % projects.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const project = projects[i];

  return (
    <div
      className="mt-8 max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tabular-nums tracking-[0.18em] text-faint">
          {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        {/* Nine ticks, the current one filled. A progress bar for the set. */}
        <span className="flex gap-1" aria-hidden>
          {projects.map((p, n) => (
            <button
              key={p.slug}
              onClick={() => setI(n)}
              aria-label={`Show ${p.name}`}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: n === i ? 18 : 6,
                background: n === i ? p.accent : "var(--line-strong)",
              }}
            />
          ))}
        </span>
      </div>

      {/* Fixed height, so the buttons below never shuffle as lines swap. */}
      <div className="relative mt-4 h-[5.5rem] sm:h-[4.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Link href={`/work/${project.slug}`} className="group block">
              <span
                className="font-display text-2xl italic tracking-tight transition-colors sm:text-3xl"
                style={{ color: project.accent }}
              >
                {project.name}
              </span>
              <ArrowUpRightIcon className="ml-2 inline h-4 w-4 -translate-y-0.5 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-1.5" />
              <span className="mt-1 block text-[15px] leading-snug text-muted sm:text-base">
                {project.tagline}
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
