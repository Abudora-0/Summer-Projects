"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BASE = "Abudora, Full Stack Developer";
/** Section titles stay short, and match the "Bento, Abudora" shape used by project pages. */
const SUFFIX = "Abudora";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Selected Work" },
  { id: "contact", label: "Contact" },
];

/**
 * Names the section you are actually looking at in the tab title, so a pinned
 * tab or a crowded window says something more useful than the same string all
 * the way down. Home only: project pages already carry their own titles.
 */
export function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    document.title = BASE;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = SECTIONS.find((s) => s.id === entry.target.id);
          document.title = match ? `${match.label}, ${SUFFIX}` : BASE;
        }
      },
      { rootMargin: "-25% 0px -70% 0px" }
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // Back at the very top there is no section, so restore the plain title.
    const onScroll = () => {
      if (window.scrollY < 200) document.title = BASE;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      // Deliberately not resetting the title here. On a client side navigation
      // this cleanup runs after Next has already set the new route's title, so
      // writing to it would stamp the home title onto every project page.
    };
  }, [pathname]);

  return null;
}
