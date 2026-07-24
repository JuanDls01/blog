import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function BlogNav() {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex gap-1 -ml-2.5">
        <Link
          href="/"
          className="px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-fg hover:bg-surface transition-colors duration-150 active:scale-95"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-fg hover:bg-surface transition-colors duration-150 active:scale-95"
        >
          Work
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}
