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
      className="absolute top-2.5 right-2.5 p-1.5 rounded-md text-gray-400 hover:text-gray-100 hover:bg-white/10 transition-all duration-150 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
