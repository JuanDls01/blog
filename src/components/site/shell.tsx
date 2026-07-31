import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./footer";

export function SiteShell({
  nav,
  children,
}: {
  nav: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="aurora fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden
      />

      <header className="scroll-edge sticky top-0 z-50 bg-nav backdrop-blur-lg backdrop-saturate-150">
        <div className="max-w-155 mx-auto px-6">{nav}</div>
      </header>

      <main className="max-w-155 w-full mx-auto px-6 pt-14 pb-10 flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </>
  );
}
