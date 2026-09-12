# Abudora, Summer Projects

Portfolio site for nine products shipped in one summer: Bento, Cortex, DarazSmart, Hidayah, Morphly, OmniKit, Preface, Roleify and Wakaru. Each one gets its own real accent color, pattern and case study page instead of a shared card template.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3210](http://localhost:3210) if using the bundled dev config, or whatever port `next dev` prints.

## Structure

- `src/data/projects.ts` is the single source of truth for all nine projects (tagline, stack, accent colors, repo and deploy links, features).
- `src/app/page.tsx` assembles the homepage: hero, about, the filterable work grid, and contact footer.
- `src/app/work/[slug]/page.tsx` renders each project's case study page.
- Screenshot slots live under `public/projects/<slug>/`. Until real captures are dropped in, each project shows a generated abstract cover built from its own accent color and pattern.

## Build

```bash
npm run build
npm run lint
```
