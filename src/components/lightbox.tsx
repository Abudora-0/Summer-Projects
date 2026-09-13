"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Shot } from "@/data/projects";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";

export function Lightbox({
  shots,
  index,
  accent,
  onClose,
  onIndex,
}: {
  shots: Shot[];
  index: number | null;
  accent: string;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const open = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndex((index + delta + shots.length) % shots.length);
    },
    [index, shots.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  const shot = index !== null ? shots[index] : null;

  return (
    <AnimatePresence>
      {open && shot && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-bg/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label="Screenshot viewer"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {index + 1} of {shots.length}
            </p>
            <button
              onClick={onClose}
              aria-label="Close viewer"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full w-full max-w-6xl flex-col"
            >
              <div
                className="min-h-0 overflow-hidden rounded-xl border"
                style={{ borderColor: accent }}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={1600}
                  height={1000}
                  className="h-auto max-h-[74vh] w-full object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-muted">
                {shot.caption}
              </figcaption>
            </motion.figure>
          </div>

          {shots.length > 1 && (
            <div
              className="flex items-center justify-center gap-3 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent-line hover:text-fg"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {shots.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => onIndex(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 24 : 6,
                      background: i === index ? accent : "var(--line-strong)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent-line hover:text-fg"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
