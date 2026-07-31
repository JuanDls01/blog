"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightRowProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

export function SpotlightRow({ href, className, children, ...props }: SpotlightRowProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight group relative flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 rounded-[10px] p-3",
        "no-underline text-inherit active:bg-surface-hover",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function RowArrow() {
  return (
    <span
      aria-hidden
      className="text-faint text-[13px] opacity-0 -translate-x-1 transition-[opacity,translate] duration-200 ease-out-strong group-hover:opacity-100 group-hover:translate-x-0"
    >
      →
    </span>
  );
}
