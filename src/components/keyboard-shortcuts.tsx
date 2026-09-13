"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme";

const GO_TO: Record<string, string> = {
  w: "work",
  a: "about",
  c: "contact",
};

/**
 * The shortcuts the overlay advertises. Kept in its own component so the two
 * cannot drift apart without somebody noticing they are in the same folder.
 */
export function KeyboardShortcuts() {
  const router = useRouter();
  const { toggle } = useTheme();
  // Set by pressing g, cleared after a beat, which is what makes "g then w" work.
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        (target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable))
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (pending.current && GO_TO[key]) {
        pending.current = false;
        const id = GO_TO[key];
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push(`/#${id}`);
        return;
      }

      if (key === "g") {
        pending.current = true;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          pending.current = false;
        }, 1200);
        return;
      }

      if (key === "t") toggle();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [router, toggle]);

  return null;
}
