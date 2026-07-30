"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore
    }
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute top-1.5 right-1.5 p-1.5 rounded-[2px] text-gray-400 hover:text-gray-100 hover:bg-white/10 transition-[opacity,color,background-color] duration-150 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
    >
      <span className="relative block size-3.5">
        <Check
          className={`absolute inset-0 size-3.5 text-green-400 transition-[opacity,scale,filter] duration-200 ease-out-strong ${
            copied ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-25 blur-sm"
          }`}
        />
        <Copy
          className={`absolute inset-0 size-3.5 transition-[opacity,scale,filter] duration-200 ease-out-strong ${
            copied ? "opacity-0 scale-25 blur-sm" : "opacity-100 scale-100 blur-none"
          }`}
        />
      </span>
    </button>
  );
}
