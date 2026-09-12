"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";

interface AccentContextValue {
  setAccent: (accent: string, accentSoft: string) => void;
  resetAccent: () => void;
}

const AccentContext = createContext<AccentContextValue | null>(null);

const DEFAULT_ACCENT = "#d9a441";
const DEFAULT_ACCENT_SOFT = "#3a2c14";

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const depthRef = useRef(0);

  const apply = useCallback((accent: string, accentSoft: string) => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-soft", accentSoft);
  }, []);

  const setAccent = useCallback(
    (accent: string, accentSoft: string) => {
      depthRef.current += 1;
      apply(accent, accentSoft);
    },
    [apply]
  );

  const resetAccent = useCallback(() => {
    depthRef.current = Math.max(0, depthRef.current - 1);
    if (depthRef.current === 0) {
      apply(DEFAULT_ACCENT, DEFAULT_ACCENT_SOFT);
    }
  }, [apply]);

  const value = useMemo(() => ({ setAccent, resetAccent }), [setAccent, resetAccent]);

  return (
    <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}
