"use client";

import { useEffect, useRef } from "react";
import type { Heading } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { Kicker } from "@/components/ui/kicker";

export function Toc({ headings, label }: { headings: Heading[]; label: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const links = Array.from(list.querySelectorAll<HTMLAnchorElement>("a"));
    const targets = links
      .map((link) => {
        const id = decodeURIComponent(link.hash.slice(1));
        const heading = document.getElementById(id);
        return heading ? { link, heading } : null;
      })
      .filter((t): t is { link: HTMLAnchorElement; heading: HTMLElement } => t !== null);
    if (targets.length === 0) return;

    const setActive = () => {
      // Active = last heading that crossed the top third of the viewport
      const line = window.innerHeight * 0.3;
      let current = targets[0];
      for (const target of targets) {
        if (target.heading.getBoundingClientRect().top <= line) current = target;
      }
      for (const { link } of targets) {
        const active = link === current.link;
        link.toggleAttribute("data-active", active);
        if (active) {
          indicator.style.top = `${link.offsetTop}px`;
          indicator.style.height = `${link.offsetHeight}px`;
          indicator.style.opacity = "1";
        }
      }
    };

    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        setActive();
        raf = null;
      });
    };

    setActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [headings]);

  return (
    <nav
      aria-label={label}
      className="reveal reveal-2 sticky top-24 text-[13px] leading-normal"
    >
      <Kicker as="p" size="xs" className="mb-3">
        {label}
      </Kicker>
      <ul ref={listRef} className="toc-rail relative list-none border-l border-line pl-3.5">
        <span ref={indicatorRef} className="toc-indicator" aria-hidden />
        {headings.map((heading, i) => (
          <li key={`${heading.slug}-${i}`}>
            <a
              href={`#${heading.slug}`}
              className={cn(heading.level === 3 && "pl-3.5 text-[12.5px]")}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
