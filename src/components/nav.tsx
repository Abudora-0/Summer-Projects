"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { projects } from "@/data/projects";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/**
 * A nav link whose label rolls up and is replaced by a duplicate rolling in
 * from below. Two copies of the text in a clipped box, moved as one unit.
 */
function RollLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-accent-soft"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      {/*
        The rail holds two stacked copies, so it is twice the height of one
        label and shifting it by half brings the second copy into the window.
        Moving it a full height sends both copies past the top and the link
        reads as blank, which is what it used to do.
      */}
      <span className="relative block h-[1.2em] overflow-hidden">
        <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
          <span
            className={`flex h-[1.2em] items-center ${active ? "text-fg" : "text-muted"}`}
          >
            {label}
          </span>
          <span className="flex h-[1.2em] items-center text-accent">{label}</span>
        </span>
      </span>
    </a>
  );
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [spied, setSpied] = useState<string | null>(null);
  // Off the home page there are no sections to be inside of.
  const active = onHome ? spied : null;
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", setProgress);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(y > 80);
    // Only hide well down the page, and never while the mobile sheet is open.
    setHidden(y > previous && y > 420 && !menuOpen);
  });

  // Scrollspy. rootMargin pins the trigger line near the top of the viewport so
  // a section counts as active once its heading reaches the nav, not its middle.
  useEffect(() => {
    if (!onHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSpied(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const circumference = 2 * Math.PI * 15;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-5"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className={`flex items-center gap-2 rounded-full border backdrop-blur-xl transition-colors duration-300 sm:gap-3 ${
            condensed
              ? "border-line bg-bg-raised/80 pl-3 pr-2 py-2 shadow-[var(--shadow)]"
              : "border-transparent bg-transparent px-2 py-2"
          }`}
        >
          {/* Progress ring wraps the mark only once the nav has condensed. */}
          <Link href="/" className="relative grid place-items-center rounded-full px-1">
            <svg
              viewBox="0 0 34 34"
              className="pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] -rotate-90"
              aria-hidden
            >
              <motion.circle
                cx="17"
                cy="17"
                r="15"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{
                  strokeDashoffset: circumference * (1 - progress),
                  opacity: condensed ? 0.9 : 0,
                }}
                transition={{ duration: 0.15 }}
              />
            </svg>
            <Wordmark compact={condensed} className="text-lg font-semibold tracking-tight" />
          </Link>

          <div className="hidden items-center sm:flex">
            {SECTIONS.map((s) => (
              <RollLink
                key={s.id}
                href={onHome ? `#${s.id}` : `/#${s.id}`}
                label={s.label}
                active={active === s.id}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("palette:toggle"))}
              aria-label="Open command palette"
              className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-muted transition-colors hover:border-accent-line hover:text-fg sm:flex"
            >
              <SearchIcon className="h-3.5 w-3.5" />
              <kbd className="font-mono text-[10px] tracking-widest">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg sm:hidden"
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-xl sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Wordmark className="text-lg font-semibold" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-6 pt-6">
              {SECTIONS.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={onHome ? `#${s.id}` : `/#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display border-b border-line py-4 text-4xl italic text-fg"
                >
                  {s.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto grid grid-cols-3 gap-px overflow-hidden border-t border-line bg-line px-0">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="bg-bg px-3 py-4 text-center font-mono text-[10px] uppercase tracking-wide text-muted"
                >
                  <span
                    className="mx-auto mb-1.5 block h-1.5 w-1.5 rounded-full"
                    style={{ background: p.accent }}
                  />
                  {p.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
