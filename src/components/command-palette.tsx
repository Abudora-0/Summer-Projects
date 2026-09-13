"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/theme";
import { ArrowUpRightIcon, SearchIcon } from "@/components/icons";

interface Entry {
  id: string;
  label: string;
  hint: string;
  group: "Projects" | "Sections" | "Actions";
  accent?: string;
  thumb?: string;
  keywords?: string;
  run: (ctx: { router: ReturnType<typeof useRouter>; toggleTheme: () => void }) => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { toggle, theme } = useTheme();

  const entries = useMemo<Entry[]>(() => {
    const sections: Entry[] = [
      { id: "s-about", label: "About", hint: "Who is behind this", group: "Sections", run: ({ router }) => router.push("/#about") },
      { id: "s-work", label: "Work", hint: "All nine projects", group: "Sections", run: ({ router }) => router.push("/#work") },
      { id: "s-contact", label: "Contact", hint: "Get in touch", group: "Sections", run: ({ router }) => router.push("/#contact") },
    ];

    const projectEntries: Entry[] = projects.flatMap((p) => [
      {
        id: `p-${p.slug}`,
        label: p.name,
        hint: p.tagline,
        group: "Projects" as const,
        accent: p.accent,
        thumb: p.shots[0].src,
        keywords: `${p.domain} ${p.kinds.join(" ")} ${p.stack.join(" ")}`,
        run: ({ router }) => router.push(`/work/${p.slug}`),
      },
      {
        id: `l-${p.slug}`,
        label: `Open ${p.name} live`,
        hint: p.deployUrl.replace("https://", ""),
        group: "Actions" as const,
        accent: p.accent,
        keywords: `demo site deployment ${p.name}`,
        run: () => window.open(p.deployUrl, "_blank", "noopener,noreferrer"),
      },
    ]);

    const actions: Entry[] = [
      {
        id: "a-theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        hint: "Or press T",
        group: "Actions",
        run: ({ toggleTheme }) => toggleTheme(),
      },
      {
        id: "a-github",
        label: "Open GitHub profile",
        hint: "github.com/Abudora-0",
        group: "Actions",
        run: () => window.open("https://github.com/Abudora-0", "_blank", "noopener,noreferrer"),
      },
      {
        id: "a-email",
        label: "Send an email",
        hint: "m.abdullah21306@gmail.com",
        group: "Actions",
        run: () => window.location.assign("mailto:m.abdullah21306@gmail.com"),
      },
    ];

    return [...projectEntries.filter((e) => e.group === "Projects"), ...sections, ...actions, ...projectEntries.filter((e) => e.group === "Actions")];
  }, [theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) =>
      `${e.label} ${e.hint} ${e.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [query, entries]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onToggle = () => setOpen((v) => !v);

    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:toggle", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:toggle", onToggle);
    };
  }, [close]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Keep the highlighted row inside the scroll box when arrowing past its edge.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-i="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const activate = useCallback(
    (entry: Entry) => {
      entry.run({ router, toggleTheme: toggle });
      close();
    },
    [router, toggle, close]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-bg/80 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-[var(--shadow)]"
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.17, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <SearchIcon className="h-4 w-4 shrink-0 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && filtered[index]) {
                    e.preventDefault();
                    activate(filtered[index]);
                  }
                }}
                placeholder="Search projects, sections, actions"
                className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
              />
              <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
                esc
              </kbd>
            </div>

            <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-muted">
                  Nothing matches that.
                </li>
              )}

              {filtered.map((entry, i) => {
                // Compared against the previous row rather than tracked in a
                // mutable local, which React forbids during render.
                const showGroup = entry.group !== filtered[i - 1]?.group;
                const active = i === index;

                return (
                  <li key={entry.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                        {entry.group}
                      </p>
                    )}
                    <button
                      data-i={i}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => activate(entry)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                      style={{ background: active ? "var(--accent-soft)" : "transparent" }}
                    >
                      {entry.thumb ? (
                        <span className="relative h-9 w-14 shrink-0 overflow-hidden rounded border border-line">
                          <Image
                            src={entry.thumb}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover object-top"
                          />
                        </span>
                      ) : (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: entry.accent ?? "var(--fg-faint)" }}
                        />
                      )}

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-fg">{entry.label}</span>
                        <span className="block truncate text-xs text-faint">{entry.hint}</span>
                      </span>

                      {entry.id.startsWith("l-") && (
                        <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-faint" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span className="ml-auto">? for shortcuts</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
