/**
 * Screenshots this portfolio for its own README.
 *
 * Separate from capture.mjs because it points at a local dev or production
 * server rather than the nine deployed sites, and because the readme wants
 * both themes of the same page.
 *
 *   npm run build && npm run start -- -p 3311
 *   node scripts/capture-self.mjs http://localhost:3311
 */
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

import { chromium } from "playwright-core";
import sharp from "sharp";

const ORIGIN = process.argv[2] ?? "http://localhost:3311";
const OUT = resolve(process.cwd(), "docs");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  `${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe`,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const SHOTS = [
  { file: "hero-dark", path: "/", theme: "dark" },
  { file: "hero-light", path: "/", theme: "light" },
  { file: "work-index", path: "/", theme: "dark", scrollTo: "#work" },
  { file: "about", path: "/", theme: "dark", scrollTo: "#about" },
  { file: "project-page", path: "/work/wakaru", theme: "dark" },
];

const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium found. Set CHROME_PATH and run this again.");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const shot of SHOTS) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  // Written before the page loads, so the inline theme script reads it and the
  // first paint is already the theme we want rather than a flash of the other.
  await context.addInitScript((theme) => {
    localStorage.setItem("abudora-theme", theme);
  }, shot.theme);

  const page = await context.newPage();
  await page.goto(`${ORIGIN}${shot.path}`, { waitUntil: "networkidle", timeout: 45000 });

  if (shot.scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ behavior: "instant" });
    }, shot.scrollTo);
  }

  // Long enough for the entrance animations to finish playing.
  await page.waitForTimeout(2600);

  const png = await page.screenshot({ type: "png" });
  await sharp(png)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(resolve(OUT, `${shot.file}.webp`));

  console.log(`ok  ${shot.file}.webp`);
  await context.close();
}

await browser.close();
console.log(`\n${SHOTS.length} written into docs/`);
