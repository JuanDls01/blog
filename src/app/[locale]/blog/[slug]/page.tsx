import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  formatDate,
  getAllSlugs,
  getPost,
  type PostLocale,
} from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/site";
import { CustomMDX } from "./components/mdx";

function blogUrl(slug: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${baseUrl}${prefix}/blog/${slug}`;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Metadata | undefined {
  const post = getPost(slug, locale as PostLocale);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image ?? `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: blogUrl(slug, locale),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, blogUrl(slug, l)]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: blogUrl(slug, locale),
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const post = getPost(slug, locale as PostLocale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="reveal">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: blogUrl(slug, locale),
            inLanguage: post.locale,
            author: {
              "@type": "Person",
              name: "Juan De los Santos",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-[-0.01em]">
        {post.metadata.title}
      </h1>
      <div className="flex items-center gap-3 mt-2 mb-8 text-sm">
        <p className="text-sm text-faint tabular-nums">
          {formatDate(post.metadata.publishedAt, locale as PostLocale)}
        </p>
        {!post.metadata.published && (
          <span className="text-[11px] font-medium uppercase tracking-wider text-faint border border-line rounded px-1.5 py-0.5">
            {t("draft")}
          </span>
        )}
      </div>
      {post.isFallback && (
        <p className="text-[13.5px] text-muted border border-line rounded-lg px-4 py-3 mb-8">
          {t("fallbackNotice")}
        </p>
      )}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
