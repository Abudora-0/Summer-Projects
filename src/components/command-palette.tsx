"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";

interface Entry {
  id: string;
  label: string;
  hint: string;
  accent?: string;
  go: (router: ReturnType<typeof useRouter>) => void;
}

const sectionEntries: Entry[] = [
  { id: "about", label: "About", hint: "Who's behind this", go: (r) => r.push("/#about") },
  { id: "work", label: "Work", hint: "All nine projects", go: (r) => r.push("/#work") },
  { id: "contact", label: "Contact", hint: "Get in touch", go: (r) => r.push("/#contact") },
];

const projectEntries: Entry[] = projects.map((p) => ({
  id: p.slug,
  label: p.name,
  hint: p.tagline,
  accent: p.accent,
  go: (r) => r.push(`/work/${p.slug}`),
}));

const entries = [...sectionEntries, ...projectEntries];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) || e.hint.toLowerCase().includes(q)
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
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
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const activate = useCallback(
    (entry: Entry) => {
      entry.go(router);
      close();
    },
    [router, close]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 backdrop-blur-sm px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="font-mono text-xs text-muted">/</span>
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
                    activate(filtered[index]);
                  }
                }}
                placeholder="Jump to a project or section"
                className="w-full bg-transparent font-sans text-sm text-paper outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
                esc
              </kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  Nothing matches that.
                </li>
              )}
              {filtered.map((entry, i) => (
                <li key={entry.id}>
                  <button
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => activate(entry)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                    style={{
                      background: i === index ? "var(--accent-soft)" : "transparent",
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: entry.accent ?? "var(--brand)" }}
                      />
                      <span className="text-sm text-paper">{entry.label}</span>
                    </span>
                    <span className="truncate text-xs text-muted">{entry.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
