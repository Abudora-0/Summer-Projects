import * as si from "simple-icons";

/*
 * simple-icons carries a brand path plus its official hex for most of what
 * these nine projects are built with. A handful of the newer tools (Plasmo,
 * WXT, Turso, QStash) are not in the set, so anything unmapped falls back to a
 * plain lettered chip rather than a broken or wrong looking logo.
 */
const MAP: Record<string, si.SimpleIcon | undefined> = {
  "next.js": si.siNextdotjs,
  react: si.siReact,
  typescript: si.siTypescript,
  javascript: si.siJavascript,
  "tailwind css": si.siTailwindcss,
  "framer motion": si.siFramer,
  prisma: si.siPrisma,
  postgresql: si.siPostgresql,
  sqlite: si.siSqlite,
  redis: si.siRedis,
  python: si.siPython,
  "node.js": si.siNodedotjs,
  docker: si.siDocker,
  vitest: si.siVitest,
  vercel: si.siVercel,
  ffmpeg: si.siFfmpeg,
  ollama: si.siOllama,
  "react pdf": si.siReact,
};

export function techIconFor(name: string) {
  return MAP[name.toLowerCase()];
}

/*
 * Several official brand colours are pure black or near white, which
 * disappears against one theme or the other. Those fall back to the current
 * text colour, which is legible in both.
 */
function usableBrandColor(hex: string): string | null {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.16 || luminance > 0.92 ? null : `#${hex}`;
}

export function TechIcon({
  name,
  className = "",
  colored = false,
}: {
  name: string;
  className?: string;
  colored?: boolean;
}) {
  const icon = techIconFor(name);

  if (!icon) {
    // No brand mark exists, so show the initial instead of an approximation.
    return (
      <span
        aria-hidden
        className={`grid place-items-center rounded-[4px] border border-line font-mono text-[9px] uppercase text-muted ${className}`}
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-label={name}
      viewBox="0 0 24 24"
      className={className}
      fill={(colored && usableBrandColor(icon.hex)) || "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** The stack the portfolio itself is built on, shown in About. */
export const SITE_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Playwright",
  "Vercel",
];

/** Everything used across the nine, deduped, for the About stack grid. */
export const ALL_TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Prisma",
  "PostgreSQL",
  "SQLite",
  "Redis",
  "Python",
  "Node.js",
  "Docker",
  "Playwright",
  "Vitest",
  "Tesseract.js",
  "FFmpeg",
  "Ollama",
  "Vercel",
];
