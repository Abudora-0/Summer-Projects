"use client";

import { useEffect } from "react";
import { useAccent } from "@/components/accent-provider";

export function ProjectAccentSync({
  accent,
  accentSoft,
}: {
  accent: string;
  accentSoft: string;
}) {
  const { setAccent, resetAccent } = useAccent();

  useEffect(() => {
    setAccent(accent, accentSoft);
    return () => resetAccent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent, accentSoft]);

  return null;
}
