"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "abudora-theme";
const EVENT = "themechange";

/*
 * Runs before first paint, so the page never flashes the wrong palette while
 * React boots. Stringified deliberately: it has to be inline and synchronous
 * in <head>, which rules out shipping it as a normal client component.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

/*
 * The <html> element is the source of truth, since the inline script above
 * already wrote to it before React existed. useSyncExternalStore is the right
 * shape for that: read the DOM, subscribe to changes, and give the server a
 * stable answer so hydration matches.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onMedia = () => {
    // Only follow the system while the visitor has not chosen for themselves.
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    document.documentElement.dataset.theme = media.matches ? "light" : "dark";
    onChange();
  };
  media.addEventListener("change", onMedia);

  return () => {
    window.removeEventListener(EVENT, onChange);
    media.removeEventListener("change", onMedia);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark" as Theme);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode, or storage is full. The theme still applies for now.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { theme, toggle, ready };
}
