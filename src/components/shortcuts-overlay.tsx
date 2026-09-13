"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/icons";

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Open the command palette" },
  { keys: ["?"], label: "Show this sheet" },
  { keys: ["T"], label: "Switch between light and dark" },
  { keys: ["G", "then", "W"], label: "Jump to the work index" },
  { keys: ["G", "then", "A"], label: "Jump to about" },
  { keys: ["G", "then", "C"], label: "Jump to contact" },
  { keys: ["←", "→"], label: "Move through screenshots in the viewer" },
  { keys: ["Esc"], label: "Close whatever is open" },
];

export function ShortcutsOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Never hijack a key while somebody is typing.
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Keyboard shortcuts"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-[var(--shadow)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg italic text-fg">Shortcuts</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close shortcuts"
                className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-fg"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            <ul className="divide-y divide-[var(--line)]">
              {SHORTCUTS.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-4 px-5 py-3"
                >
                  <span className="text-sm text-muted">{s.label}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    {s.keys.map((k, i) =>
                      k === "then" ? (
                        <span key={i} className="px-0.5 font-mono text-[10px] text-faint">
                          then
                        </span>
                      ) : (
                        <kbd
                          key={i}
                          className="min-w-[1.6rem] rounded border border-line bg-bg px-1.5 py-1 text-center font-mono text-[10px] text-fg"
                        >
                          {k}
                        </kbd>
                      )
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
