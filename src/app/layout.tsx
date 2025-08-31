import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { Navbar } from "src/components/nav";
import Footer from "src/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Juan De los Santos | AI Frontend Engineer",
    template: "Juan De los Santos | %s",
  },
  description:
    "I'm Juan De los Santos, an AI Frontend Engineer with over 3 years of experience building scalable web applications with React, Next.js, and TypeScript. I specialize in integrating AI-driven solutions, performance optimization, and creating intelligent user experiences. Currently developing public transportation systems at GeoActio.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Juan De los Santos | AI Frontend Engineer",
    description:
      "AI Frontend Engineer with over 3 years of experience in React, Next.js, and AI-driven solutions. Explore my projects, experience, and insights on intelligent web development.",
    url: baseUrl,
    siteName: "Juan De los Santos | Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "AI Frontend Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Artificial Intelligence",
    "Web Performance",
    "AI-driven Solutions",
    "Vercel AI SDK",
    "AWS Bedrock",
    "Juan De los Santos",
  ],
};

const cx = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <body className="antialiased">
        <div className="fixed inset-0 -z-10 min-h-screen">
          <div className="absolute inset-0 min-h-full bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 opacity-50" />
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-neutral-800/50">
          <div className="max-w-2xl mx-auto px-4 md:px-6 py-2">
            <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
              <Navbar />
            </div>
          </div>
        </div>

        <main className="relative flex-auto min-w-0 flex flex-col max-w-2xl mx-auto p-4 md:px-6">
          <div className="animate-in fade-in duration-1000 slide-in-from-bottom-8 delay-150">
            {children}
          </div>

          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 delay-300">
            <Footer />
          </div>

          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
