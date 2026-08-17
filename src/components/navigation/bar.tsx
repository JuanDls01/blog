"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/toggle";

const locales = ["en", "es"] as const;

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  const navItems = {
    "/": { name: t("home") },
    "/work": { name: t("work") },
    "/blog": { name: t("blog") },
  };

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
              className={`px-2.5 py-1.5 rounded-lg text-sm transition-[color,background-color,scale] duration-150 active:scale-[0.96] ${
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
      <div className="flex items-center gap-1">
        <div className="flex items-center text-[13px] tabular-nums">
          {locales.map((loc, i) => (
            <span key={loc} className="flex items-center">
              {i > 0 && <span className="text-faint px-0.5">·</span>}
              <Link
                href={pathname}
                locale={loc}
                aria-current={locale === loc ? "true" : undefined}
                className={`px-1.5 py-1 rounded-lg uppercase transition-[color,background-color,scale] duration-150 active:scale-[0.96] ${
                  locale === loc
                    ? "text-fg font-medium"
                    : "text-faint hover:text-fg hover:bg-surface"
                }`}
              >
                {loc}
              </Link>
            </span>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
