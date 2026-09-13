/**
 * Captures the screenshots the portfolio shows for each of the nine projects.
 *
 * Committed rather than kept as a scratch file, because the images are
 * committed too, and a picture nobody can regenerate goes stale the first time
 * one of the nine sites gets a redesign.
 *
 *   npm run shots            capture everything
 *   npm run shots -- wakaru  capture one project
 *
 * Notes on the choices here:
 *
 * playwright-core ships no browser of its own, so this hunts for a Chromium
 * already on the machine. The ms-playwright cache is checked first because the
 * Wakaru project already downloaded one, which saves a 150MB re-download.
 *
 * Scrollbars are hidden because several of these sites style their own, and a
 * bright scrollbar down the edge of every card reads as a rendering artifact
 * rather than a design. sRGB is forced so the nine accent colors the portfolio
 * pulls from these shots stay accurate.
 *
 * Shots are taken well after networkidle. Most of these sites animate their
 * content in on load, and a capture at networkidle catches them mid fade.
 */
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

import { chromium } from "playwright-core";
import sharp from "sharp";

const OUT = resolve(process.cwd(), "public/shots");
const WIDTH = 1440;
const HEIGHT = 900;
const SETTLE_MS = 2600;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  // The headless shell first: it is the one binary here that reliably starts.
  // The full chromium in the same cache fails with a side by side configuration
  // error on this machine, and nothing on this script needs a headful browser.
  `${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe`,
  `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1234/chrome-win64/chrome.exe`,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

/*
 * Two of these sites put a sign in wall immediately behind the front door
 * (Cortex is Google OAuth, Bento's sheet is behind a lock screen), so only
 * their public pages are listed. Nothing here signs in as anybody.
 */
const TARGETS = [
  {
    slug: "bento",
    origin: "https://bentto.vercel.app",
    shots: [
      { path: "/", label: "The landing page, a contact sheet for the web" },
      { path: "/lock", label: "The lock screen" },
    ],
  },
  {
    slug: "cortex",
    origin: "https://cortexlms.vercel.app",
    shots: [{ path: "/", label: "Sign in, with the semester pitch alongside" }],
  },
  {
    slug: "darazsmart",
    origin: "https://darazsmart.vercel.app",
    shots: [
      { path: "/", label: "Trending deals on the home feed" },
      { path: "/search?q=headphones", label: "Search with the filter rail" },
      { path: "/coupons", label: "The coupon collector" },
    ],
  },
  {
    slug: "hidayah",
    origin: "https://hidayyah.vercel.app",
    shots: [
      { path: "/", label: "Prayer times, computed on device" },
      { path: "/quran", label: "The Quran index" },
      { path: "/tasbih", label: "The tasbih counter" },
    ],
  },
  {
    slug: "morphly",
    origin: "https://morphlyy.vercel.app",
    shots: [
      { path: "/", label: "Paste text, export a real Office file" },
      { path: "/workspace", label: "The conversion workspace" },
    ],
  },
  {
    slug: "omnikit",
    origin: "https://omniikit.vercel.app",
    shots: [
      {
        path: "/",
        label: "One kit for every quick fix",
        // A pro tip toast floats in on load and parks itself over the corner.
        hide: ['div[class*="z-[120]"]'],
      },
      { path: "/tools/qr-code", label: "A tool running in the browser" },
    ],
  },
  {
    slug: "preface",
    origin: "https://prefacee.vercel.app",
    shots: [
      { path: "/", label: "The pitch, with a live README preview" },
      { path: "/builder", label: "The split screen builder" },
    ],
  },
  {
    slug: "roleify",
    origin: "https://roleify.vercel.app",
    shots: [
      { path: "/", label: "Six role themes on the landing page" },
      { path: "/builder", label: "The bento CV workspace" },
    ],
  },
  {
    slug: "wakaru",
    origin: "https://wakaruu.vercel.app",
    shots: [
      { path: "/", label: "Understand anything you read" },
      { path: "/translate", label: "Dialect aware translation" },
      { path: "/dictionary", label: "The multilingual dictionary" },
      { path: "/read", label: "The manga OCR reader" },
    ],
  },
];

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = only.length
  ? TARGETS.filter((t) => only.includes(t.slug))
  : TARGETS;

if (targets.length === 0) {
  console.error(`No project matched ${only.join(", ")}`);
  process.exit(1);
}

const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium found. Set CHROME_PATH to one and run this again.");
  process.exit(1);
}
console.log(`browser  ${executablePath}\n`);

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
  colorScheme: "dark",
  reducedMotion: "reduce",
});

let written = 0;
const failed = [];

for (const target of targets) {
  // A rerun should replace a project's shots, not pile up beside them.
  for (const file of readdirSync(OUT).filter((f) => f.startsWith(`${target.slug}-`))) {
    rmSync(resolve(OUT, file));
  }

  for (const [i, shot] of target.shots.entries()) {
    const name = `${target.slug}-${i + 1}`;
    const url = `${target.origin}${shot.path}`;
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(SETTLE_MS);

      // Toasts and cookie bars are true to life but they are not the product.
      if (shot.hide?.length) {
        await page.addStyleTag({
          content: `${shot.hide.join(", ")} { display: none !important; }`,
        });
        await page.waitForTimeout(250);
      }

      const png = await page.screenshot({ type: "png" });

      await sharp(png)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(resolve(OUT, `${name}.webp`));

      written += 1;
      console.log(`ok       ${name}.webp   ${url}`);
    } catch (error) {
      // One flaky site should not take the whole batch down with it.
      failed.push({ name, url, message: error.message.split("\n")[0] });
      console.log(`skipped  ${name}         ${url}`);
      console.log(`         ${error.message.split("\n")[0]}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();

console.log(`\n${written} written into public/shots/`);
if (failed.length) {
  console.log(`${failed.length} failed:`);
  for (const f of failed) console.log(`  ${f.name}  ${f.url}  ${f.message}`);
}
