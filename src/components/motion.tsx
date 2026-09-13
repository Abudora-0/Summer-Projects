"use client";

import { MotionConfig } from "framer-motion";

/**
 * Framer animates with rAF rather than CSS transitions, so the reduced motion
 * rules in globals.css do not reach it. This does, for every motion component
 * in the tree at once: transforms are dropped, opacity still resolves, so
 * nothing that fades in is left stranded at invisible.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
