"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/": {
    name: "home",
  },
  "/work": {
    name: "work",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside>
      <div>
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-1 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                pathname === path ||
                (path === "/blog" && pathname?.startsWith("/blog"));
              return (
                <Link
                  key={path}
                  href={path}
                  className={`
                    relative transition-all duration-300 ease-out flex align-middle 
                    py-2 px-3 mx-1 text-sm font-medium
                    ${
                      isActive
                        ? "text-blue-400 font-semibold"
                        : "text-neutral-400 hover:text-neutral-200"
                    }
                  `}
                >
                  {name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
