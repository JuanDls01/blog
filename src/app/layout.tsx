import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
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
    "I'm Juan De los Santos, an AI Frontend Engineer building scalable web applications with React, Next.js, and TypeScript. I specialize in AI-driven solutions, performance optimization, and intelligent user experiences. Currently modernizing public transport ticketing at GeoActio and building estacionar.me, a parking reservation platform for Argentina.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div
            className="aurora fixed inset-0 -z-10 overflow-hidden pointer-events-none"
            aria-hidden
          />

          <header className="scroll-edge sticky top-0 z-50 bg-nav backdrop-blur-lg backdrop-saturate-150">
            <div className="max-w-155 mx-auto px-6">
              <Navbar />
            </div>
          </header>

          <main className="max-w-155 mx-auto px-6 pt-14 pb-10">
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
