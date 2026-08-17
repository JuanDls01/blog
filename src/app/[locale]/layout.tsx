import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/site";
import { Navbar } from "@/components/navigation/bar";
import { SiteShell } from "@/components/site/shell";

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogImage = `/og?title=${encodeURIComponent(t("ogTitle"))}`;

  return {
    title: {
      default: t("title"),
      template: "Juan De los Santos | %s",
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: baseUrl,
      siteName: "Juan De los Santos | Portfolio",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: t("ogTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ogImage],
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
      "Software Engineer",
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
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteShell nav={<Navbar />} skipToContentLabel={t("skipToContent")}>
        {children}
      </SiteShell>
    </NextIntlClientProvider>
  );
}
