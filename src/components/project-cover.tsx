import type { Project } from "@/data/projects";

function Pattern({ project, uid }: { project: Project; uid: string }) {
  const { pattern, accent, accentSoft } = project;
  const stroke = accent;

  switch (pattern) {
    case "grid":
      return (
        <>
          <defs>
            <pattern id={uid} width="34" height="34" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="30" height="30" rx="3" fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
        </>
      );
    case "rings":
      return (
        <g fill="none" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx="50%" cy="50%" r={i * 26} />
          ))}
        </g>
      );
    case "stripes":
      return (
        <defs>
          <pattern id={uid} width="26" height="26" patternTransform="rotate(28)" patternUnits="userSpaceOnUse">
            <rect width="13" height="26" fill={stroke} fillOpacity="0.14" />
          </pattern>
        </defs>
      );
    case "geo":
      return (
        <defs>
          <pattern id={uid} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 2 L38 20 L20 38 L2 20 Z M20 12 L28 20 L20 28 L12 20 Z"
              fill="none"
              stroke={stroke}
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          </pattern>
        </defs>
      );
    case "blob":
      return (
        <g>
          <ellipse cx="30%" cy="35%" rx="120" ry="90" fill={stroke} fillOpacity="0.18" />
          <ellipse cx="72%" cy="68%" rx="150" ry="110" fill={accentSoft} fillOpacity="0.5" />
        </g>
      );
    case "dots":
      return (
        <defs>
          <pattern id={uid} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.6" fill={stroke} fillOpacity="0.55" />
          </pattern>
        </defs>
      );
    case "lines":
      return (
        <g stroke={stroke} strokeOpacity="0.35" strokeWidth="1.2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={i} x1="8%" x2="92%" y1={`${i * 12}%`} y2={`${i * 12}%`} />
          ))}
        </g>
      );
    case "duotone":
      return (
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accentSoft} stopOpacity="0.9" />
          </linearGradient>
        </defs>
      );
    case "stamp":
      return (
        <g fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="1.4">
          <circle cx="50%" cy="50%" r="70" />
          <circle cx="50%" cy="50%" r="82" strokeDasharray="4 6" />
        </g>
      );
    default:
      return null;
  }
}

export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const uid = `pat-${project.slug}`;
  const initials = project.name.slice(0, 2).toUpperCase();

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(155deg, ${project.accentSoft} 0%, var(--ink) 78%)`,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <Pattern project={project} uid={uid} />
        {project.pattern === "stripes" && (
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
        )}
        {project.pattern === "geo" && (
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
        )}
        {project.pattern === "dots" && (
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
        )}
        {project.pattern === "duotone" && (
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
        )}
      </svg>
      <span
        className="font-display absolute bottom-3 right-4 select-none text-6xl italic opacity-[0.14]"
        style={{ color: project.accent }}
      >
        {initials}
      </span>
    </div>
  );
}
