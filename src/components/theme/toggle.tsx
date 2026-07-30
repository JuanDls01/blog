"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative p-2 -mr-2 size-7.75 text-faint hover:text-fg transition-[color,scale] duration-150 active:scale-[0.96]"
    >
      <Sun
        size={15}
        strokeWidth={1.75}
        className={`absolute inset-0 m-auto transition-[opacity,scale,filter] duration-200 ease-out-strong ${
          mounted && resolvedTheme === "dark"
            ? "opacity-100 scale-100 blur-none"
            : "opacity-0 scale-25 blur-sm"
        }`}
      />
      <Moon
        size={15}
        strokeWidth={1.75}
        className={`absolute inset-0 m-auto transition-[opacity,scale,filter] duration-200 ease-out-strong ${
          mounted && resolvedTheme === "dark"
            ? "opacity-0 scale-25 blur-sm"
            : "opacity-100 scale-100 blur-none"
        }`}
      />
    </button>
  );
}
