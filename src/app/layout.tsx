import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Bricolage_Grotesque } from "next/font/google";
import { Motion } from "@/components/motion";
import { AccentProvider } from "@/components/accent-provider";
import { themeScript } from "@/components/theme";
import { CommandPalette } from "@/components/command-palette";
import { ShortcutsOverlay } from "@/components/shortcuts-overlay";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { DynamicTitle } from "@/components/dynamic-title";
import { PageTransition } from "@/components/page-transition";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

// Variable width axis, which is what the wordmark animates on hover.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

// Where the site actually lives. Only needs to be absolute so Next can resolve
// social image URLs; update it the day a custom domain points here.
const url = "https://abudora-summer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Abudora, Full Stack Developer",
    template: "%s, Abudora",
  },
  description:
    "The portfolio of Abudora, a full stack developer in Lahore. Nine products designed, built and deployed over a single summer.",
  keywords: [
    "Abudora",
    "Muhammad Abdullah",
    "full stack developer",
    "portfolio",
    "Next.js",
    "Lahore",
  ],
  authors: [{ name: "Muhammad Abdullah", url: "https://github.com/Abudora-0" }],
  creator: "Muhammad Abdullah",
  openGraph: {
    title: "Abudora, nine products in one summer",
    description:
      "Nine products designed, built and deployed over a single summer. Bookmarks, prayer times, manga OCR, and six more.",
    url,
    siteName: "Abudora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abudora, nine products in one summer",
    description:
      "Nine products designed, built and deployed over a single summer.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${bricolage.variable} h-full`}
      // The inline script below sets data-theme before React sees the document.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Motion>
          <AccentProvider>
            <div className="grain" />
            <CommandPalette />
            <ShortcutsOverlay />
            <KeyboardShortcuts />
            <DynamicTitle />
            <Nav />
            <PageTransition>{children}</PageTransition>
          </AccentProvider>
        </Motion>
      </body>
    </html>
  );
}
