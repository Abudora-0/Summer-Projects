"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (target) {
        setScale(target.dataset.cursor === "project" ? 2.6 : 1.7);
        setLabel(target.dataset.cursorLabel ?? null);
      } else {
        setScale(1);
        setLabel(null);
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden items-center justify-center rounded-full mix-blend-difference [@media(pointer:fine)]:flex"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
        width: "var(--cursor-size)",
        height: "var(--cursor-size)",
        background: "var(--paper)",
        opacity: visible ? 1 : 0,
      }}
      animate={{ scale }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 22 } }}
    >
      {label && (
        <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-ink">
          {label}
        </span>
      )}
    </motion.div>
  );
}
