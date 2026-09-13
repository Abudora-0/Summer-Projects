"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { kinds, projects, type Project } from "@/data/projects";
import { useAccent } from "@/components/accent-provider";
import { ArrowUpRightIcon, GridIcon, ListIcon } from "@/components/icons";

/** Preview card size, shared by the clamp maths and the card itself. */
const PREVIEW_W = 460;
const PREVIEW_H = 288;

/*
 * "Sep '26" rather than "Sep 26", which reads as the twenty sixth of September
 * at a glance and makes every row look like it shipped on a specific day.
 */
function shipMonth(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  return `${month} '${String(d.getFullYear()).slice(-2)}`;
}

/**
 * The floating preview. One instance for the whole list rather than one per
 * row, so the image glides between rows instead of popping in and out.
 */
function FloatingPreview({
  project,
  x,
  y,
}: {
  project: Project | null;
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
}) {
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });
  // Tilt follows how fast the pointer is travelling sideways.
  const rotate = useTransform(springX, [-600, 600], [-7, 7]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{ x: springX, y: springY, rotate }}
    >
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border shadow-[var(--shadow)]"
            style={{
              width: PREVIEW_W,
              borderColor: project.accent,
              background: "var(--bg-raised)",
            }}
          >
            <Image
              src={project.shots[0].src}
              alt=""
              width={1600}
              height={1000}
              className="h-auto w-full"
              priority={false}
            />
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ background: project.accent, opacity: 0.14 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IndexRow({
  project,
  index,
  hovered,
  onHover,
}: {
  project: Project;
  index: number;
  hovered: boolean;
  onHover: (p: Project | null) => void;
}) {
  const dim = hovered === false;

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => onHover(project)}
      onFocus={() => onHover(project)}
      className="group relative block border-b border-line"
    >
      {/* Accent wash sweeps in from the left on hover. */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        style={{ background: "var(--accent-quiet)" }}
      />

      <div className="relative flex items-center gap-4 py-6 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pl-4 sm:gap-8 sm:py-8">
        <span className="w-8 shrink-0 font-mono text-[11px] tabular-nums text-faint sm:w-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail carries the row on touch, where there is no hover. */}
        <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-line lg:hidden">
          <Image
            src={project.shots[0].src}
            alt=""
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </span>

        <h3
          className="font-display min-w-0 flex-1 truncate text-[1.6rem] italic leading-none tracking-tight transition-colors duration-300 sm:text-[2.6rem] lg:w-[19rem] lg:flex-none"
          style={{ color: hovered ? project.accent : undefined }}
        >
          {project.name}
        </h3>

        {/* Fills what is otherwise a long empty stretch between the name and
            the metadata on wide screens. */}
        <span className="hidden min-w-0 flex-1 truncate text-sm text-muted lg:block">
          {project.tagline}
        </span>

        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:block">
          {project.domain}
        </span>
        <span className="hidden w-20 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:block">
          {shipMonth(project.shippedAt)}
        </span>

        <ArrowUpRightIcon
          className="h-4 w-4 shrink-0 -translate-x-1 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          style={{ color: project.accent }}
        />
      </div>

      {/* Everything else recedes while one row is active. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-bg transition-opacity duration-300 ${
          dim ? "opacity-40" : "opacity-0"
        }`}
      />
    </Link>
  );
}

function Sheet({ list }: { list: Project[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((project, i) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group relative overflow-hidden rounded-xl border border-line bg-bg-raised transition-all duration-500 hover:-translate-y-1 hover:border-accent-line"
        >
          <span className="absolute left-3 top-3 z-10 rounded-full bg-bg/80 px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted backdrop-blur">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.shots[0].src}
              alt={project.shots[0].caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: project.accent }}
            />
          </div>

          <div className="flex items-baseline justify-between gap-3 border-t border-line px-4 py-3.5">
            <span className="font-display text-lg italic text-fg">{project.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              {project.domain}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WorkSection() {
  const [filter, setFilter] = useState<string | null>(null);
  const [view, setView] = useState<"index" | "sheet">("index");
  const [hovered, setHovered] = useState<Project | null>(null);
  const { setAccent, resetAccent } = useAccent();
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const list = useMemo(
    () => (filter ? projects.filter((p) => p.kinds.includes(filter)) : projects),
    [filter]
  );

  function onHover(project: Project | null) {
    setHovered(project);
    if (project) setAccent(project.accent);
    else resetAccent();
  }

  return (
    <section
      id="work"
      className="scroll-mt-28 border-t border-line px-6 py-24 sm:px-10 sm:py-32"
      onPointerMove={(e) => {
        // The card is centred on the pointer, so it is clamped by half its own
        // size to stop it sliding off screen near an edge.
        const halfW = PREVIEW_W / 2 + 16;
        const halfH = PREVIEW_H / 2 + 16;
        x.set(Math.min(Math.max(e.clientX, halfW), window.innerWidth - halfW));
        y.set(Math.min(Math.max(e.clientY, halfH), window.innerHeight - halfH));
      }}
      onPointerLeave={() => onHover(null)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
              Work
            </p>
            <h2 className="font-display mt-5 text-4xl italic tracking-tight text-fg sm:text-5xl">
              Nine, in their own voices
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Real screenshots, captured from the live deployments.
            {/* Hovering is not a thing on a touch screen, where the rows carry
                their own thumbnails instead. */}
            <span className="hidden lg:inline"> Hover a row to see one.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[null, ...kinds].map((k) => {
              const active = filter === k;
              return (
                <button
                  key={k ?? "all"}
                  onClick={() => setFilter(k)}
                  className="rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--line)",
                    color: active ? "var(--fg)" : "var(--fg-muted)",
                    background: active ? "var(--accent-quiet)" : "transparent",
                  }}
                >
                  {k ?? "All"}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-line p-1">
            {(
              [
                { id: "index", icon: ListIcon, label: "Index view" },
                { id: "sheet", icon: GridIcon, label: "Contact sheet view" },
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                aria-label={v.label}
                aria-pressed={view === v.id}
                className="relative grid h-7 w-8 place-items-center rounded-full transition-colors"
              >
                {view === v.id && (
                  <motion.span
                    layoutId="view-toggle"
                    className="absolute inset-0 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <v.icon
                  className={`relative h-3.5 w-3.5 ${
                    view === v.id ? "text-fg" : "text-faint"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {view === "index" ? (
            <div className="border-t border-line" onMouseLeave={() => onHover(null)}>
              {list.map((project, i) => (
                <IndexRow
                  key={project.slug}
                  project={project}
                  index={i}
                  hovered={hovered?.slug === project.slug}
                  onHover={onHover}
                />
              ))}
            </div>
          ) : (
            <Sheet list={list} />
          )}
        </div>

        {list.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">
            Nothing in that category.
          </p>
        )}
      </div>

      {view === "index" && !reduce && (
        <FloatingPreview project={hovered} x={x} y={y} />
      )}
    </section>
  );
}
