"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";

interface AccentContextValue {
  setAccent: (accent: string) => void;
  resetAccent: () => void;
}

const AccentContext = createContext<AccentContextValue | null>(null);

/*
 * One hex is all a project needs. Every tint derived from it lives in
 * globals.css as a color-mix against the current background, so the same
 * accent reads correctly in both themes without a second hand picked value.
 */
export function AccentProvider({ children }: { children: React.ReactNode }) {
  // Hovering from one row straight onto another fires the new enter before the
  // old leave. Counting depth stops that from flickering back to the default.
  const depth = useRef(0);

  const setAccent = useCallback((accent: string) => {
    depth.current += 1;
    document.documentElement.style.setProperty("--accent", accent);
  }, []);

  const resetAccent = useCallback(() => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) {
      document.documentElement.style.removeProperty("--accent");
    }
  }, []);

  const value = useMemo(() => ({ setAccent, resetAccent }), [setAccent, resetAccent]);

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}
