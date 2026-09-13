"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme";

/*
 * One SVG that morphs rather than two that swap: the sun's rays retract and
 * the disc slides into a crescent by animating a mask circle across it.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, ready } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className={`group relative grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent-line hover:text-fg ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <mask id="theme-toggle-mask">
          <rect width="100%" height="100%" fill="white" />
          <motion.circle
            cx="18"
            cy="7"
            r="8"
            fill="black"
            initial={false}
            animate={{ cx: dark ? 18 : 30, cy: dark ? 7 : -2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </mask>

        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#theme-toggle-mask)"
          initial={false}
          animate={{ r: dark ? 9 : 5.5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: dark ? 0 : 1, rotate: dark ? -45 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "12px 12px" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="1.6"
              x2="12"
              y2="3.6"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
        </motion.g>
      </svg>

      {/* Until hydration settles, the icon state is a guess, so soften it. */}
      {!ready && <span className="absolute inset-0 rounded-full bg-bg/40" />}
    </button>
  );
}
