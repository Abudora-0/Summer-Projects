export interface Shot {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  /** Short buckets used by the work filter. Kept deliberately few. */
  kinds: string[];
  /** Longer descriptive labels, shown on the project page. */
  tags: string[];
  stack: string[];
  accent: string;
  pattern:
    | "grid"
    | "rings"
    | "stripes"
    | "geo"
    | "blob"
    | "dots"
    | "lines"
    | "duotone"
    | "stamp";
  repoUrl: string;
  deployUrl: string;
  deployNote?: string;
  /** ISO dates taken from the first and last commit in each repo. */
  startedAt: string;
  shippedAt: string;
  commits: number;
  features: string[];
  shots: Shot[];
}

export const projects: Project[] = [
  {
    slug: "bento",
    name: "Bento",
    tagline: "Your bookmarks, laid out like a photographer's contact sheet.",
    description:
      "Bento is a self hosted bookmark manager that refuses to look like a spreadsheet. Every saved page becomes a numbered frame on a photographic contact sheet, complete with a real screenshot, drag to arrange ordering, and a loupe view for zooming in close. A companion browser extension captures the active tab in one keystroke, and everything from tags to accounts is enforced at the database layer so your sheet stays yours.",
    domain: "Productivity",
    kinds: ["Tools", "Extensions", "Self-hosted"],
    tags: ["Productivity", "Browser Extension", "Self-hosted"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SQLite", "Turso", "Plasmo"],
    accent: "#E4A455",
    pattern: "grid",
    repoUrl: "https://github.com/Abudora-0/Bento",
    deployUrl: "https://bentto.vercel.app",
    startedAt: "2026-08-18",
    shippedAt: "2026-09-12",
    commits: 40,
    features: [
      "One key capture of the active tab, screenshot included",
      "Four switchable grid layouts plus a zoomable loupe view",
      "Chrome, Firefox and Safari bookmark import",
      "Command palette, tags, folders and shareable filter links",
      "Per account isolation enforced in SQL, not just the UI",
    ],
    shots: [
      { src: "/shots/bento-1.webp", caption: "A contact sheet for everything you save" },
      { src: "/shots/bento-2.webp", caption: "The lock screen" },
    ],
  },
  {
    slug: "cortex",
    name: "Cortex",
    tagline: "The academic dashboard UET Lahore students actually needed.",
    description:
      "Cortex pulls a UET student's entire academic life, official GPA and CGPA, timetable, assignments, attendance and faculty directory, into one dashboard synced straight from the university's own LMS. A GPA Lab lets you drag ungraded courses around to test hypothetical marks before results land, and an attendance calculator tells you exactly how many classes you can still miss before hitting the 75 percent debar line.",
    domain: "Academic",
    kinds: ["Dashboards"],
    tags: ["Academic", "Dashboard", "LMS sync"],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "TipTap"],
    accent: "#5B7FE0",
    pattern: "rings",
    repoUrl: "https://github.com/Abudora-0/Cortex",
    deployUrl: "https://cortexlms.vercel.app",
    deployNote: "Signing in needs a UET Google account, so the demo opens on the sign in page.",
    startedAt: "2026-07-03",
    shippedAt: "2026-09-13",
    commits: 32,
    features: [
      "Live GPA and CGPA using UET's own relative grading scheme",
      "GPA Lab for testing hypothetical marks before results post",
      "Attendance tracker built around the 75 percent debar line",
      "Assignment board with one tap Classroom and Eduko links",
      "LMS sync via a bookmarklet that never stores your password",
    ],
    shots: [
      { src: "/shots/cortex-1.webp", caption: "Sign in, with the semester pitch alongside" },
    ],
  },
  {
    slug: "darazsmart",
    name: "DarazSmart",
    tagline: "A price detective for every Daraz search you make.",
    description:
      "DarazSmart sits between you and Daraz.pk, comparing live listings, tracking price drops, and collecting working coupons so you stop overpaying by habit. It reads straight from Daraz's own public catalog API with no headless browser in sight, then layers on a virtual cart, wishlist, side by side comparison for up to four products, and email alerts the moment a tracked item gets cheaper.",
    domain: "Commerce",
    kinds: ["Dashboards", "Consumer"],
    tags: ["Commerce", "Price tracking", "Web App"],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Recharts"],
    accent: "#FF6A4D",
    pattern: "stripes",
    repoUrl: "https://github.com/Abudora-0/darazsmart",
    deployUrl: "https://darazsmart.vercel.app",
    startedAt: "2026-06-30",
    shippedAt: "2026-09-07",
    commits: 21,
    features: [
      "Live catalog search with relevance scoring, no scraping browser needed",
      "Price history charts and automated email price drop alerts",
      "Coupon collector with one click copy",
      "Wishlist plus a four way product comparison view",
      "Command palette search and a flash free light and dark theme",
    ],
    shots: [
      { src: "/shots/darazsmart-1.webp", caption: "Trending deals on the home feed" },
      { src: "/shots/darazsmart-2.webp", caption: "Search with the filter rail" },
      { src: "/shots/darazsmart-3.webp", caption: "The coupon collector" },
    ],
  },
  {
    slug: "hidayah",
    name: "Hidayah",
    tagline: "Prayer times, the Quran, and a Qibla, computed on your device.",
    description:
      "Hidayah is an Islamic companion app built to work fully offline. It computes prayer times on device across twelve calculation authorities, wakes you for prayer with background push notifications that survive Vercel's cron limits, and carries the complete Quran in Uthmani script with ten English and eight Urdu translations, per ayah tafsir, and seven reciters. Three hand tuned themes, Emerald, Lapis and Ink, were audited against WCAG AA across sixty six separate contrast checks.",
    domain: "Faith",
    kinds: ["Consumer"],
    tags: ["Faith & Wellbeing", "PWA", "Offline first"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redis", "PWA"],
    accent: "#1C8A63",
    pattern: "geo",
    repoUrl: "https://github.com/Abudora-0/Hidayah",
    deployUrl: "https://hidayyah.vercel.app",
    startedAt: "2026-08-23",
    shippedAt: "2026-08-25",
    commits: 40,
    features: [
      "On device prayer times across twelve calculation methods",
      "Full Quran with tafsir, translations, and seven reciters",
      "Qibla compass and a Hijri calendar of Islamic occasions",
      "Background prayer alerts that work around Vercel's cron limits",
      "Three WCAG AA audited themes, fully usable offline",
    ],
    shots: [
      { src: "/shots/hidayah-1.webp", caption: "Prayer times, computed on device" },
      { src: "/shots/hidayah-2.webp", caption: "The Quran index" },
      { src: "/shots/hidayah-3.webp", caption: "The tasbih counter" },
    ],
  },
  {
    slug: "morphly",
    name: "Morphly",
    tagline: "Paste anything. Get back a real Word, Excel or PowerPoint file.",
    description:
      "Morphly takes whatever you paste, tidy Markdown or raw, messy AI chatbot output, and turns it into an actual .docx, .xlsx or .pptx file with native structure, not an HTML file wearing a costume. One shared parsing pipeline feeds three format generators, an optional local model pass cleans up unstructured text before conversion, and every image gets fetched through an SSRF hardened pipeline. No accounts, no database, nothing ever leaves the server it runs on.",
    domain: "Documents",
    kinds: ["Tools"],
    tags: ["Documents", "File conversion", "Web App"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest", "Ollama"],
    accent: "#8B6BE0",
    pattern: "blob",
    repoUrl: "https://github.com/Abudora-0/Morphly",
    deployUrl: "https://morphlyy.vercel.app",
    startedAt: "2026-08-17",
    shippedAt: "2026-08-23",
    commits: 19,
    features: [
      "Real native .docx, .xlsx and .pptx output, not HTML in disguise",
      "One shared schema powering all three format generators",
      "Optional local model cleanup pass for messy pasted text",
      "SSRF hardened image embedding with strict allowlists",
      "No accounts and no database, everything stays server side",
    ],
    shots: [
      { src: "/shots/morphly-1.webp", caption: "Paste text, export a real Office file" },
      { src: "/shots/morphly-2.webp", caption: "The conversion workspace" },
    ],
  },
  {
    slug: "omnikit",
    name: "OmniKit",
    tagline: "Every small tool you keep googling, in one self hosted kit.",
    description:
      "OmniKit bundles the everyday tools you would otherwise hunt for on ad choked websites, image editing, PDF surgery, QR codes, hashing, JWT decoding and more, into a single self hostable app that processes everything in memory or in your browser. The hosted demo exposes thirty five of them; self host it and a companion Python worker unlocks the rest, handling AI background removal and video or audio downloading over a Redis backed queue.",
    domain: "Utilities",
    kinds: ["Tools", "Self-hosted"],
    tags: ["Utilities", "Self-hosted", "Docker"],
    stack: ["Next.js", "TypeScript", "Python", "Redis", "Docker", "FFmpeg"],
    accent: "#2DD4CF",
    pattern: "dots",
    repoUrl: "https://github.com/Abudora-0/omnikit",
    deployUrl: "https://omniikit.vercel.app",
    deployNote:
      "The hosted demo runs the thirty five image, PDF and utility tools. Downloaders need the Python worker, so they only run self hosted.",
    startedAt: "2026-06-30",
    shippedAt: "2026-07-06",
    commits: 11,
    features: [
      "Dozens of tools across image, PDF and everyday utilities",
      "In browser and in memory processing, nothing lingers on disk",
      "Python worker queue for AI background removal and downloads",
      "Full Docker Compose setup for self hosting the entire stack",
      "Command palette and live job progress tracking",
    ],
    shots: [
      { src: "/shots/omnikit-1.webp", caption: "One kit for every quick fix" },
      { src: "/shots/omnikit-2.webp", caption: "A tool running entirely in the browser" },
    ],
  },
  {
    slug: "preface",
    name: "Preface",
    tagline: "Dump your project in. Get a README that actually fits.",
    description:
      "Preface reads a pasted project dump, package.json, file tree, source files, or an imported GitHub repo, and turns it into a structured, accurate README without the copy paste template guesswork. Pick from eight templates, drop in any of roughly eighty shields.io badges, and watch a live GitHub accurate preview update as you go. An optional AI pass runs against a local model by default, so the whole thing works without ever sending your code anywhere.",
    domain: "Developer Tools",
    kinds: ["Tools"],
    tags: ["Developer Tools", "Markdown", "Web App"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest", "Ollama"],
    accent: "#C99A4A",
    pattern: "lines",
    repoUrl: "https://github.com/Abudora-0/Preface",
    deployUrl: "https://prefacee.vercel.app",
    startedAt: "2026-08-19",
    shippedAt: "2026-08-23",
    commits: 20,
    features: [
      "Deterministic parser reads package.json, Cargo.toml, pyproject.toml and more",
      "GitHub repo import pulls description, license and language breakdown",
      "Eight switchable README templates and roughly eighty badge combinations",
      "Live GitHub accurate markdown preview, light and dark",
      "Optional AI pass runs locally by default",
    ],
    shots: [
      { src: "/shots/preface-1.webp", caption: "The pitch, with a live README preview" },
      { src: "/shots/preface-2.webp", caption: "The split screen builder" },
    ],
  },
  {
    slug: "roleify",
    name: "Roleify",
    tagline: "A CV builder that changes its entire personality for the room.",
    description:
      "Roleify is a CV builder that does not just fill in a template, it re themes its entire interface, color, type, layout and motion, to match whichever profession you are building for. Pick from six full role themes, from Programmer to Legal and Academic, arrange your CV in a bento box workspace with live preview, and export a themed PDF alongside a separate ATS safe plain text version for the systems that cannot handle personality.",
    domain: "Career",
    kinds: ["Tools", "Consumer"],
    tags: ["Career", "PDF export", "Web App"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React PDF"],
    accent: "#E0568F",
    pattern: "duotone",
    repoUrl: "https://github.com/Abudora-0/roleify",
    deployUrl: "https://roleify.vercel.app",
    startedAt: "2026-08-17",
    shippedAt: "2026-08-18",
    commits: 6,
    features: [
      "Six full role themes driven by a single CSS variable engine",
      "Bento box CV layout with a live split screen preview",
      "Themed PDF export plus a separate ATS safe plain text export",
      "Multiple saved profiles, each remembering its own theme",
      "Custom themed controls down to the scrollbar and favicon",
    ],
    shots: [
      { src: "/shots/roleify-1.webp", caption: "Six role themes on the landing page" },
      { src: "/shots/roleify-2.webp", caption: "The bento CV workspace" },
    ],
  },
  {
    slug: "wakaru",
    name: "Wakaru",
    tagline: "Translate, look things up, and read raw manga, no keys required.",
    description:
      "Wakaru is a translator, a 107 language dictionary, and a manga and manhwa reader built entirely on free, keyless APIs. Point it at a raw page and in browser OCR detects the speech bubbles, recognizes the text, and redraws a translation right back into them, no server round trip required. A companion browser extension carries the same reading power onto any site, and thirty eight curated regional dialects give translations texture that plain machine output usually misses.",
    domain: "Language",
    kinds: ["Consumer", "Extensions"],
    tags: ["Language & Media", "Browser Extension", "OCR"],
    stack: ["Next.js", "TypeScript", "Tesseract.js", "Playwright", "Docker"],
    accent: "#BE3A34",
    pattern: "stamp",
    repoUrl: "https://github.com/Abudora-0/Wakaru",
    deployUrl: "https://wakaruu.vercel.app",
    startedAt: "2026-08-24",
    shippedAt: "2026-09-12",
    commits: 32,
    features: [
      "In browser OCR reads raw manga and manhwa bubble by bubble",
      "Translation across around 100 languages plus 38 regional dialects",
      "107 language dictionary merging four independent free sources",
      "Companion extension reads pages in place on any site",
      "Three tier text to speech with 33 downloadable voices",
    ],
    shots: [
      { src: "/shots/wakaru-1.webp", caption: "Understand anything you read" },
      { src: "/shots/wakaru-2.webp", caption: "Dialect aware translation" },
      { src: "/shots/wakaru-3.webp", caption: "The multilingual dictionary" },
      { src: "/shots/wakaru-4.webp", caption: "The manga OCR reader" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const kinds = Array.from(
  new Set(projects.flatMap((project) => project.kinds))
).sort();

/** Every number here is counted from the data above, never typed by hand. */
export const stats = {
  projects: projects.length,
  commits: projects.reduce((total, p) => total + p.commits, 0),
  extensions: projects.filter((p) => p.kinds.includes("Extensions")).length,
  selfHosted: projects.filter((p) => p.kinds.includes("Self-hosted")).length,
  shots: projects.reduce((total, p) => total + p.shots.length, 0),
  weeks: (() => {
    const dates = projects.flatMap((p) => [
      new Date(p.startedAt).getTime(),
      new Date(p.shippedAt).getTime(),
    ]);
    const span = Math.max(...dates) - Math.min(...dates);
    return Math.round(span / (1000 * 60 * 60 * 24 * 7));
  })(),
};

export const timelineBounds = {
  start: projects.reduce(
    (min, p) => (p.startedAt < min ? p.startedAt : min),
    projects[0].startedAt
  ),
  end: projects.reduce(
    (max, p) => (p.shippedAt > max ? p.shippedAt : max),
    projects[0].shippedAt
  ),
};

export function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
