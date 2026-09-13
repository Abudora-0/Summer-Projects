"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects, stats } from "@/data/projects";
import { HeroRotator } from "@/components/hero-rotator";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

const LINES = ["Nine products.", "One summer.", "No two alike."];

/** Counts up once, when it first scrolls into view. */
function CountUp({ to, duration = 1100 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Somebody who asked for less motion still wants the number.
        if (reduce) {
          setValue(to);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Ease out cubic, so it decelerates into the final number.
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration, reduce]);

  return <span ref={ref}>{value}</span>;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  const figures = [
    { value: stats.projects, label: "products shipped" },
    { value: stats.commits, label: "commits" },
    { value: stats.weeks, label: "weeks" },
    { value: stats.extensions, label: "browser extensions" },
  ];

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative isolate flex min-h-[92svh] flex-col overflow-hidden pt-32 sm:pt-36"
    >
      {/* A soft light source that tracks the pointer, so the type feels lit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(46rem 34rem at ${spot.x}% ${spot.y}%, var(--accent-soft), transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full opacity-50 blur-[110px]"
        style={{ background: "var(--accent-quiet)" }}
      />

      {/* flex-1 so the ticker below is pushed to the bottom by layout rather
          than being positioned over the top of the stats. */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-14 sm:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-accent"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Full stack developer, Lahore
        </motion.p>

        <h1 className="font-display mt-7 text-[clamp(2.7rem,8.5vw,7rem)] font-light italic leading-[0.98] tracking-[-0.02em] text-fg">
          {LINES.map((line, i) => (
            <span key={line} className="reveal-mask">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.11,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <HeroRotator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
          >
            See the nine
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent-line hover:bg-accent-quiet"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
        >
          {figures.map((f) => (
            <div key={f.label}>
              <dt className="font-display text-3xl italic text-fg sm:text-4xl">
                <CountUp to={f.value} />
              </dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                {f.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <ProjectTicker />
    </section>
  );
}

/*
 * The nine names on an endless rail, each in its own colour. Duplicated once
 * so the loop has something to scroll into, and paused on hover so a name can
 * actually be clicked.
 */
function ProjectTicker() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div className="group relative overflow-hidden border-t border-line py-4">
      <div className="flex w-max animate-[ticker_38s_linear_infinite] gap-10 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1}>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group/item flex shrink-0 items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-fg"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover/item:scale-150"
                  style={{ background: p.accent }}
                />
                {p.name}
                <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-opacity group-hover/item:opacity-100" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
