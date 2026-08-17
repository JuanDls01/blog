import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  extractHeadings,
  formatDate,
  getAllSlugs,
  getBlogPosts,
  getPost,
  type Post,
  type PostLocale,
} from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { MetaText } from "@/components/ui/meta-text";
import { CustomMDX } from "./components/mdx";
import { Toc } from "./components/toc";

function blogPath(locale: string, slug?: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return slug ? `${prefix}/blog/${slug}` : `${prefix}/blog`;
}

function blogUrl(slug: string, locale: string) {
  return `${baseUrl}${blogPath(locale, slug)}`;
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

function AdjacentLink({
  post,
  locale,
  label,
  direction,
}: {
  post: Post;
  locale: string;
  label: string;
  direction: "previous" | "next";
}) {
  const next = direction === "next";

  return (
    <Link
      href={blogPath(locale, post.slug)}
      className={`group flex flex-col gap-0.5 rounded-[10px] p-3 -m-3 no-underline text-inherit transition-colors duration-150 hover:bg-surface active:bg-surface-hover ${next ? "items-end text-right" : "items-start"}`}
    >
      <span className="text-[11.5px] uppercase tracking-[0.06em] text-faint">
        {next ? `${label} →` : `← ${label}`}
      </span>
      <span className="font-medium text-[13.5px]">{post.metadata.title}</span>
    </Link>
  );
}

export default async function BlogPost({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const posts = getBlogPosts(locale as PostLocale);
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const headings = extractHeadings(post.content);
  // Posts are sorted newest first: previous = older, next = newer
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;

  return (
    <section className="relative">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
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
      <div className="reveal">
        <Link
          href={blogPath(locale)}
          className="group inline-flex items-center gap-1.5 text-[13.5px] text-faint hover:text-fg transition-colors duration-150"
        >
          <span
            aria-hidden
            className="transition-transform duration-200 ease-out-strong group-hover:-translate-x-0.5"
          >
            ←
          </span>
          {t("allEntries")}
        </Link>
        <header className="mt-7 pb-7 border-b border-line">
          <h1 className="title font-semibold text-[2rem] sm:text-[2.35rem] leading-[1.15] tracking-[-0.025em]">
            {post.metadata.title}
          </h1>
          <MetaText as="div" className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mt-3.5">
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt, locale as PostLocale)}
            </time>
            <span aria-hidden>·</span>
            <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
            {post.metadata.tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                {post.metadata.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </>
            )}
            {!post.metadata.published && <Badge>{t("draft")}</Badge>}
          </MetaText>
          {post.metadata.summary && (
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted [text-wrap:pretty]">
              {post.metadata.summary}
            </p>
          )}
        </header>
      </div>
      {post.isFallback && (
        <p className="text-[13.5px] text-muted border border-line rounded-lg px-4 py-3 mt-6">
          {t("fallbackNotice")}
        </p>
      )}
      <article className="prose reveal reveal-1">
        <CustomMDX source={post.content} />
      </article>
      {(older || newer) && (
        <nav
          aria-label={t("morePosts")}
          className="reveal reveal-2 mt-16 pt-6 border-t border-line grid grid-cols-2 gap-4"
        >
          <div>
            {older && (
              <AdjacentLink
                post={older}
                locale={locale}
                label={t("previous")}
                direction="previous"
              />
            )}
          </div>
          <div className="flex justify-end">
            {newer && (
              <AdjacentLink
                post={newer}
                locale={locale}
                label={t("next")}
                direction="next"
              />
            )}
          </div>
        </nav>
      )}
      {headings.length >= 2 && (
        <aside className="hidden min-[1180px]:block absolute left-full top-0 bottom-0 ml-12 w-[200px]">
          <Toc headings={headings} label={t("onThisPage")} />
        </aside>
      )}
    </section>
  );
}
