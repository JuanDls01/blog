"use client";

import { useEffect } from "react";

export function CvDownloadTrigger({ href }: { href: string }) {
  useEffect(() => {
    window.location.href = href;
    const timeout = setTimeout(() => window.close(), 1500);
    return () => clearTimeout(timeout);
  }, [href]);

  return null;
}
