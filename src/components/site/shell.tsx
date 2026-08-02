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
      <header className="scroll-edge sticky top-0 z-50 bg-nav backdrop-blur-lg backdrop-saturate-150">
        <div className="max-w-170 mx-auto px-6">{nav}</div>
      </header>

      <main className="max-w-170 w-full mx-auto px-6 pt-14 pb-10 flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </>
  );
}
