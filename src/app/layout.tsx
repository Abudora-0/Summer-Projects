import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { AccentProvider } from "@/components/accent-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { CommandPalette } from "@/components/command-palette";
import { PageTransition } from "@/components/page-transition";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Abudora - Summer Projects",
  description:
    "Nine products shipped in one summer. A portfolio by Abudora, full stack developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <AccentProvider>
          <div className="grain" />
          <CustomCursor />
          <CommandPalette />
          <Nav />
          <PageTransition>{children}</PageTransition>
        </AccentProvider>
      </body>
    </html>
  );
}
