import "../global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { baseUrl } from "../sitemap";
import { BlogNav } from "src/components/blog-nav";
import { SiteShell } from "src/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Juan De los Santos | Software Engineer",
    template: "Juan De los Santos | %s",
  },
  description:
    "I'm Juan De los Santos, a Software Engineer building scalable web applications with React, Next.js, and TypeScript.",
  metadataBase: new URL(baseUrl),
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
};

export default function BlogLayout({
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
          <SiteShell nav={<BlogNav />}>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
