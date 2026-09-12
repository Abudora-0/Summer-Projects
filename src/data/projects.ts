export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  tags: string[];
  stack: string[];
  accent: string;
  accentSoft: string;
  pattern: "grid" | "rings" | "stripes" | "geo" | "blob" | "dots" | "lines" | "duotone" | "stamp";
  repoUrl: string;
  deployUrl: string;
  deployNote?: string;
  lastShipped: string;
  features: string[];
  screenshotCount: number;
  hasRealScreenshots: boolean;
}

export const projects: Project[] = [
  {
    slug: "bento",
    name: "Bento",
    tagline: "Your bookmarks, laid out like a photographer's contact sheet.",
    description:
      "Bento is a self hosted bookmark manager that refuses to look like a spreadsheet. Every saved page becomes a numbered frame on a photographic contact sheet, complete with a real screenshot, drag to arrange ordering, and a loupe view for zooming in close. A companion browser extension captures the active tab in one keystroke, and everything from tags to accounts is enforced at the database layer so your sheet stays yours.",
    domain: "Productivity",
    tags: ["Productivity", "Browser Extension", "Self-hosted"],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "SQLite / Turso", "Plasmo MV3"],
    accent: "#E4A455",
    accentSoft: "#3A2E1C",
    pattern: "grid",
    repoUrl: "https://github.com/Abudora-0/Bento",
    deployUrl: "https://bentto.vercel.app",
    lastShipped: "September 2026",
    features: [
      "One-key capture of the active tab, screenshot included",
      "Four switchable grid layouts plus a zoomable loupe view",
      "Chrome, Firefox and Safari bookmark import",
      "Command palette, tags, folders and shareable filter links",
      "Per-account isolation enforced in SQL, not just the UI",
    ],
    screenshotCount: 4,
    hasRealScreenshots: true,
  },
  {
    slug: "cortex",
    name: "Cortex",
    tagline: "The academic dashboard UET Lahore students actually needed.",
    description:
      "Cortex pulls a UET student's entire academic life, official GPA and CGPA, timetable, assignments, attendance and faculty directory, into one dashboard synced straight from the university's own LMS. A GPA Lab lets you drag ungraded courses around to test hypothetical marks before results land, and an attendance calculator tells you exactly how many classes you can still miss before hitting the 75 percent debar line.",
    domain: "Academic",
    tags: ["Academic", "Dashboard"],
    stack: ["Next.js 16", "Prisma 7", "Auth.js", "TipTap", "Postgres / Neon"],
    accent: "#5B7FE0",
    accentSoft: "#1D2440",
    pattern: "rings",
    repoUrl: "https://github.com/Abudora-0/Cortex",
    deployUrl: "https://cortex-two-omega.vercel.app",
    lastShipped: "Summer 2026",
    features: [
      "Live GPA and CGPA using UET's own relative grading scheme",
      "GPA Lab for testing hypothetical marks before results post",
      "Attendance tracker built around the 75 percent debar line",
      "Assignment board with one-tap Classroom and Eduko links",
      "LMS sync via a bookmarklet that never stores your password",
    ],
    screenshotCount: 3,
    hasRealScreenshots: false,
  },
  {
    slug: "darazsmart",
    name: "DarazSmart",
    tagline: "A price detective for every Daraz search you make.",
    description:
      "DarazSmart sits between you and Daraz.pk, comparing live listings, tracking price drops, and collecting working coupons so you stop overpaying by habit. It reads straight from Daraz's own public catalog API with no headless browser in sight, then layers on a virtual cart, wishlist, side-by-side comparison for up to four products, and email alerts the moment a tracked item gets cheaper.",
    domain: "Commerce",
    tags: ["Commerce", "Web App"],
    stack: ["Next.js 16", "Prisma + Neon", "Upstash Redis", "NextAuth", "Recharts"],
    accent: "#FF6A4D",
    accentSoft: "#3E1F17",
    pattern: "stripes",
    repoUrl: "https://github.com/Abudora-0/darazsmart",
    deployUrl: "https://darazsmart.vercel.app",
    lastShipped: "September 2026",
    features: [
      "Live catalog search with relevance scoring, no scraping browser needed",
      "Price history charts and automated email price-drop alerts",
      "Coupon collector with one-click copy",
      "Wishlist plus a four-way product comparison view",
      "Command palette search and a flash-free light/dark theme",
    ],
    screenshotCount: 3,
    hasRealScreenshots: false,
  },
  {
    slug: "hidayah",
    name: "Hidayah",
    tagline: "Prayer times, the Quran, and a Qibla, computed on your device.",
    description:
      "Hidayah is an Islamic companion app built to work fully offline. It computes prayer times on-device across twelve calculation authorities, wakes you for prayer with background push notifications that survive Vercel's cron limits, and carries the complete Quran in Uthmani script with ten English and eight Urdu translations, per-ayah tafsir, and seven reciters. Three hand-tuned themes, Emerald, Lapis and Ink, were audited against WCAG AA across sixty six separate contrast checks.",
    domain: "Faith & Wellbeing",
    tags: ["Faith & Wellbeing", "PWA", "Offline-first"],
    stack: ["Next.js 16", "TypeScript", "Framer Motion", "Web Push + QStash", "PWA"],
    accent: "#1C8A63",
    accentSoft: "#12291F",
    pattern: "geo",
    repoUrl: "https://github.com/Abudora-0/Hidayah",
    deployUrl: "https://hidayyah.vercel.app",
    lastShipped: "August 2026",
    features: [
      "On-device prayer times across twelve calculation methods",
      "Full Quran with tafsir, translations, and seven reciters",
      "Qibla compass and a Hijri calendar of Islamic occasions",
      "Background prayer alerts that work around Vercel's cron limits",
      "Three WCAG AA audited themes, fully usable offline",
    ],
    screenshotCount: 4,
    hasRealScreenshots: false,
  },
  {
    slug: "morphly",
    name: "Morphly",
    tagline: "Paste anything. Get back a real Word, Excel or PowerPoint file.",
    description:
      "Morphly takes whatever you paste, tidy Markdown or raw, messy AI chatbot output, and turns it into an actual .docx, .xlsx or .pptx file with native structure, not an HTML file wearing a costume. One shared parsing pipeline feeds three format generators, an optional local-LLM pass cleans up unstructured text before conversion, and every image gets fetched through an SSRF-hardened pipeline. No accounts, no database, nothing ever leaves the server it runs on.",
    domain: "Documents",
    tags: ["Documents", "Web App"],
    stack: ["Next.js 16", "docx / exceljs / pptxgenjs", "remark", "Ollama (optional)"],
    accent: "#8B6BE0",
    accentSoft: "#241B3D",
    pattern: "blob",
    repoUrl: "https://github.com/Abudora-0/Morphly",
    deployUrl: "https://morphlyy.vercel.app",
    lastShipped: "August 2026",
    features: [
      "Real native .docx, .xlsx and .pptx output, not HTML in disguise",
      "One shared schema powering all three format generators",
      "Optional local-LLM cleanup pass for messy pasted text",
      "SSRF-hardened image embedding with strict allowlists",
      "No accounts and no database, everything stays server-side",
    ],
    screenshotCount: 3,
    hasRealScreenshots: false,
  },
  {
    slug: "omnikit",
    name: "OmniKit",
    tagline: "Forty three tools, one self-hosted toolbox, zero accounts.",
    description:
      "OmniKit bundles forty three everyday tools, image editing, PDF surgery, QR codes, hashing, JWT decoding, and more, into a single self-hostable web app that processes everything in memory or in your browser. A companion Python worker handles the heavier async jobs, AI background removal and video or audio downloading, over a Redis-backed queue, so the core toolkit stays fast while the demanding stuff runs in the background.",
    domain: "Utilities",
    tags: ["Utilities", "Self-hosted", "Docker"],
    stack: ["Next.js 15 (monorepo)", "Python worker", "Redis queue", "Docker", "Sharp / pdf-lib"],
    accent: "#2DD4CF",
    accentSoft: "#122F2E",
    pattern: "dots",
    repoUrl: "https://github.com/Abudora-0/omnikit",
    deployUrl: "https://web-eight-eta-40.vercel.app",
    deployNote: "Hosted demo covers image, PDF and utility tools; downloaders require self-hosting.",
    lastShipped: "Summer 2026",
    features: [
      "Forty three tools across image, PDF and everyday utilities",
      "In-browser and in-memory processing, nothing lingers on disk",
      "Python worker queue for AI background removal and downloads",
      "Full Docker Compose setup for self-hosting the entire stack",
      "Command palette and live job progress tracking",
    ],
    screenshotCount: 3,
    hasRealScreenshots: false,
  },
  {
    slug: "preface",
    name: "Preface",
    tagline: "Dump your project in. Get a README that actually fits.",
    description:
      "Preface reads a pasted project dump, package.json, file tree, source files, or an imported GitHub repo, and turns it into a structured, accurate README without the copy-paste template guesswork. Pick from eight templates, drop in any of roughly eighty shields.io badges, and watch a live GitHub-accurate preview update as you go. An optional AI pass runs against a local Ollama model by default, so the whole thing works without ever sending your code anywhere.",
    domain: "Developer Tools",
    tags: ["Developer Tools", "Web App"],
    stack: ["Next.js 16", "TypeScript", "react-markdown", "Ollama (optional)"],
    accent: "#C99A4A",
    accentSoft: "#332615",
    pattern: "lines",
    repoUrl: "https://github.com/Abudora-0/Preface",
    deployUrl: "https://prefacee.vercel.app",
    lastShipped: "Summer 2026",
    features: [
      "Deterministic parser reads package.json, Cargo.toml, pyproject.toml and more",
      "GitHub repo import pulls description, license and language breakdown",
      "Eight switchable README templates and roughly eighty badge combinations",
      "Live GitHub-accurate markdown preview, light and dark",
      "Optional AI pass runs locally through Ollama by default",
    ],
    screenshotCount: 3,
    hasRealScreenshots: false,
  },
  {
    slug: "roleify",
    name: "Roleify",
    tagline: "A CV builder that changes its entire personality for the room.",
    description:
      "Roleify is a CV builder that does not just fill in a template, it re-themes its entire interface, color, type, layout and motion, to match whichever profession you are building for. Pick from six full role themes, from Programmer to Legal and Academic, arrange your CV in a bento-box workspace with live preview, and export a themed PDF alongside a separate ATS-safe plain text version for the systems that cannot handle personality.",
    domain: "Career",
    tags: ["Career", "Web App"],
    stack: ["Next.js 16", "Framer Motion", "react-pdf", "Tailwind CSS v4"],
    accent: "#E0568F",
    accentSoft: "#3A1B29",
    pattern: "duotone",
    repoUrl: "https://github.com/Abudora-0/roleify",
    deployUrl: "https://roleify.vercel.app",
    lastShipped: "Summer 2026",
    features: [
      "Six full role themes driven by a single CSS variable engine",
      "Bento-box CV layout with a live split-screen preview",
      "Themed PDF export plus a separate ATS-safe plain text export",
      "Multiple saved profiles, each remembering its own theme",
      "Custom-themed controls down to the scrollbar and favicon",
    ],
    screenshotCount: 3,
    hasRealScreenshots: false,
  },
  {
    slug: "wakaru",
    name: "Wakaru",
    tagline: "Translate, look things up, and read raw manga, no keys required.",
    description:
      "Wakaru is a translator, a 107-language dictionary, and a manga and manhwa reader built entirely on free, keyless APIs. Point it at a raw page and in-browser OCR detects the speech bubbles, recognizes the text, and redraws a translation right back into them, no server round trip required. A companion browser extension carries the same reading power onto any site, and thirty eight curated regional dialects give translations texture that plain machine output usually misses.",
    domain: "Language & Media",
    tags: ["Language & Media", "Browser Extension", "OCR"],
    stack: ["Next.js 16", "WXT MV3", "Tesseract.js OCR", "TypeScript", "Playwright"],
    accent: "#BE3A34",
    accentSoft: "#331715",
    pattern: "stamp",
    repoUrl: "https://github.com/Abudora-0/Wakaru",
    deployUrl: "https://wakaruu.vercel.app",
    lastShipped: "September 2026",
    features: [
      "In-browser OCR reads raw manga and manhwa bubble by bubble",
      "Translation across around 100 languages plus 38 regional dialects",
      "107-language dictionary merging four independent free sources",
      "Companion extension reads pages in place on any site",
      "Three-tier text to speech with 33 downloadable voices",
    ],
    screenshotCount: 5,
    hasRealScreenshots: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();
