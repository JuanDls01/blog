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
    default: "Juan De los Santos | Software Engineer",
    template: "Juan De los Santos | %s",
  },
  description:
    "I'm Juan De los Santos, a Frontend Software Engineer with experience in React, Next.js, and high-traffic eCommerce platforms. I specialize in web performance, scalable architectures, and modern frontend technologies. Explore my projects and insights on web development.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Juan De los Santos | Software Engineer",
    description:
      "Frontend Software Engineer with experience in React, Next.js, and high-traffic eCommerce platforms. Explore my projects, experience, and insights on modern web development.",
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
    "Frontend Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Performance",
    "eCommerce Development",
    "SEO",
    "CWV",
    "Juan De los Santos",
  ],
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
