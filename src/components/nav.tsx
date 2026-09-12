"use client";

import Link from "next/link";
import { SearchIcon } from "@/components/icons";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          data-cursor="link"
          className="font-display text-lg italic tracking-tight text-paper"
        >
          Abudora
        </Link>
        <nav className="hidden items-center gap-7 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="link"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          data-cursor="link"
          data-cursor-label="Search"
          onClick={() => window.dispatchEvent(new Event("palette:toggle"))}
          className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-paper"
        >
          <SearchIcon className="h-3.5 w-3.5" />
          <kbd className="font-mono text-[10px] tracking-widest">⌘K</kbd>
        </button>
      </div>
    </header>
  );
}
