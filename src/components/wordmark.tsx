"use client";

import { motion } from "framer-motion";

const REST = "budora".split("");

/*
 * Bricolage Grotesque is a variable face, so hovering stretches the letters on
 * the width axis rather than just recolouring them.
 *
 * The tail is one clipped box rather than nine individually animated letters:
 * animating each letter's width to "auto" is not something Framer can
 * interpolate, and it collapses the mark instead of expanding it.
 */
export function Wordmark({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`font-mark group relative inline-flex items-baseline whitespace-nowrap text-fg ${className}`}
      aria-label="Abudora"
    >
      <motion.span
        aria-hidden
        className="inline-block"
        initial={{ opacity: 0, y: "0.35em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        A
      </motion.span>

      <motion.span
        aria-hidden
        className="inline-flex overflow-hidden"
        initial={false}
        animate={{ maxWidth: compact ? "0ch" : "7ch", opacity: compact ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {REST.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: "0.35em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.04 * (i + 1),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>

      {/* Sweeps out from the A on hover rather than sitting there statically. */}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
    </span>
  );
}
