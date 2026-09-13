"use client";

import { useEffect } from "react";
import { useAccent } from "@/components/accent-provider";

/**
 * Paints the whole page in one project's accent for as long as its page is
 * mounted. Renders nothing: it exists so a server component page can still
 * drive the client side accent.
 */
export function ProjectAccentSync({ accent }: { accent: string }) {
  const { setAccent, resetAccent } = useAccent();

  useEffect(() => {
    setAccent(accent);
    return () => resetAccent();
  }, [accent, setAccent, resetAccent]);

  return null;
}
