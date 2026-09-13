"use client";

import { usePathname } from "next/navigation";

/**
 * Fades each route in as it mounts.
 *
 * Deliberately CSS rather than AnimatePresence. With exit animations, Framer
 * would animate the outgoing route to opacity zero, React would swap the
 * children underneath it, and the incoming route would inherit that exited
 * state and never animate back in, leaving a blank page until a reload. The
 * keyed div restarts a one shot animation instead, and its resting state is
 * visible, so there is nothing here that can strand the page invisible.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
