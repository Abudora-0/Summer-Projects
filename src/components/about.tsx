"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, stats, timelineBounds } from "@/data/projects";
import { ALL_TECH, TechIcon } from "@/components/tech-icon";
import { LocalTime } from "@/components/local-time";

const BIO = `Most bookmark managers are a list. Mine is a contact sheet. Most CV builders hand you a template. Mine changes its entire personality depending on the job you are chasing. Give me a problem everyone has already solved once, and I will go find the version of it nobody bothered to make interesting.`;

/** Fades the bio in word by word as it crosses the middle of the viewport. */
function ScrollReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="font-display text-[1.35rem] italic leading-[1.5] tracking-tight text-fg sm:text-[1.75rem]"
    >
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.6) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

function Tile({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-line bg-bg-raised p-6 transition-colors duration-500 hover:border-accent-line ${className}`}
    >
      {label && (
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

/**
 * A small gantt of the whole summer. One row per project rather than nine bars
 * stacked on a single line, which just blends into one muddy stripe once you
 * see how much of this overlapped.
 */
function Timeline() {
  const start = new Date(timelineBounds.start).getTime();
  const end = new Date(timelineBounds.end).getTime();
  const span = end - start;

  const months = ["Jul", "Aug", "Sep"].map((label, i) => {
    const at = new Date(2026, 6 + i, 1).getTime();
    return { label, left: ((at - start) / span) * 100 };
  });

  return (
    <div className="mt-6">
      <div className="relative">
        {/* Offset past the name gutter (4.5rem) and the gap (0.75rem) so these
            share the bars' coordinate space rather than the tile's. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 left-[5.25rem]"
        >
          {months.map((m) => (
            <div
              key={m.label}
              className="absolute top-0 h-full w-px bg-line"
              style={{ left: `${m.left}%` }}
            />
          ))}
        </div>

        <ul className="relative space-y-[5px]">
          {projects.map((p) => {
            const a = ((new Date(p.startedAt).getTime() - start) / span) * 100;
            const b = ((new Date(p.shippedAt).getTime() - start) / span) * 100;
            return (
              <li key={p.slug} className="group/row flex items-center gap-3">
                <span className="w-[4.5rem] shrink-0 truncate text-right font-mono text-[9px] uppercase tracking-[0.1em] text-faint transition-colors group-hover/row:text-fg">
                  {p.name}
                </span>
                <span className="relative h-2.5 flex-1">
                  <Link
                    href={`/work/${p.slug}`}
                    title={`${p.name}, ${p.startedAt} to ${p.shippedAt}`}
                    className="absolute top-0 h-2.5 rounded-full opacity-80 transition-all duration-300 hover:opacity-100 group-hover/row:opacity-100"
                    style={{
                      left: `${a}%`,
                      // A project built in one day still needs to be visible.
                      width: `max(0.5rem, ${b - a}%)`,
                      background: p.accent,
                    }}
                  >
                    <span className="sr-only">{p.name}</span>
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Same gutter plus track split as the rows, so the months line up. */}
      <div className="mt-3 flex items-center gap-3">
        <span className="w-[4.5rem] shrink-0" />
        <span className="relative block h-4 flex-1">
          {months.map((m) => (
            <span
              key={m.label}
              className="absolute -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.14em] text-faint"
              style={{ left: `${m.left}%` }}
            >
              {m.label}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
          About
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Tile className="md:col-span-2 md:row-span-2">
            <ScrollReveal text={BIO} />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                This portfolio covers one summer of that habit. Nine separate
                products, each with its own stack, its own visual language, and
                its own reason for existing. Some scratch a personal itch, like
                an academic dashboard for my own university. Some were pure
                excuse to learn something new, like teaching a browser to read
                manga.
              </p>
              <p>
                Off the clock I am probably still building something, arguing
                with an API that returns undocumented fields, or trying to make
                a loading spinner feel less like an apology.
              </p>
            </div>
          </Tile>

          <Tile label="Lahore, right now">
            <LocalTime />
          </Tile>

          <Tile label="The receipts">
            <dl className="grid grid-cols-2 gap-5">
              {[
                { v: stats.projects, l: "products" },
                { v: stats.commits, l: "commits" },
                { v: stats.extensions, l: "extensions" },
                { v: stats.selfHosted, l: "self hosted" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl italic text-fg">{s.v}</dt>
                  <dd className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </Tile>

          <Tile className="md:col-span-2" label="What I reach for">
            <div className="flex flex-wrap gap-2">
              {ALL_TECH.map((tech) => (
                <span
                  key={tech}
                  className="group/chip inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-all duration-300 hover:border-accent-line hover:bg-accent-quiet hover:text-fg"
                >
                  <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                  {tech}
                </span>
              ))}
            </div>
          </Tile>

          <Tile className="md:col-span-3" label="The summer, plotted">
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Every bar is one project, first commit to last, across{" "}
              {stats.weeks} weeks. The overlaps are the honest part.
            </p>
            <Timeline />
          </Tile>
        </div>
      </div>
    </section>
  );
}
