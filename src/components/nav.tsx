"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const navItems = {
  "/": { name: "Home" },
  "/work": { name: "Work" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex gap-1 -ml-2.5">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive =
            pathname === path ||
            (path !== "/" && pathname?.startsWith(path));
          return (
            <Link
              key={path}
              href={path}
              aria-current={isActive ? "page" : undefined}
              className={`px-2.5 py-1.5 rounded-lg text-sm transition-colors duration-150 active:scale-95 ${
                isActive
                  ? "text-fg font-medium"
                  : "text-muted hover:text-fg hover:bg-surface"
              }`}
            >
              {name}
            </Link>
          );
        })}
      </div>
      <ThemeToggle />
    </nav>
  );
}
