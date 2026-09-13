"use client";

import { useEffect, useState } from "react";

const TZ = "Asia/Karachi";

function parts() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
  });
  const hour = Number(
    now.toLocaleString("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false })
  );
  return { time, hour };
}

/*
 * What he is plausibly doing right now, which is a friendlier thing to publish
 * than a green "available" dot that means nothing.
 */
function statusFor(hour: number) {
  if (hour >= 2 && hour < 8) return { label: "Asleep, probably", dot: "var(--fg-faint)" };
  if (hour >= 8 && hour < 12) return { label: "Awake, caffeinating", dot: "var(--accent)" };
  if (hour >= 12 && hour < 18) return { label: "Deep in something", dot: "var(--accent)" };
  if (hour >= 18 && hour < 23) return { label: "Prime building hours", dot: "var(--accent)" };
  return { label: "Still building, unwisely", dot: "var(--accent)" };
}

export function LocalTime({ compact = false }: { compact?: boolean }) {
  // Null until mounted: the server has no idea what time it is where you are,
  // and rendering a guess is how you get a hydration mismatch.
  const [state, setState] = useState<{ time: string; hour: number } | null>(null);

  useEffect(() => {
    // The first read waits a frame rather than running inline, so this stays a
    // subscription to the clock rather than a render triggered by an effect.
    const frame = requestAnimationFrame(() => setState(parts()));
    const id = setInterval(() => setState(parts()), 1000 * 20);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, []);

  if (!state) {
    return (
      <span className="font-mono text-xs text-faint" suppressHydrationWarning>
        {compact ? "--:--" : "Lahore, --:--"}
      </span>
    );
  }

  const status = statusFor(state.hour);

  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: status.dot }}
        />
        Lahore {state.time}
      </span>
    );
  }

  return (
    <div>
      <div className="font-display text-4xl italic tabular-nums text-fg sm:text-5xl">
        {state.time}
      </div>
      <div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: status.dot }}
        />
        {status.label}
      </div>
    </div>
  );
}
