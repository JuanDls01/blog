import { getTranslations } from "next-intl/server";
import { formatDate, getBlogPosts, type PostLocale } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { SpotlightRow, RowArrow } from "@/components/spotlight/row";

function blogHref(slug: string, locale: PostLocale) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}/blog/${slug}`;
}

export async function BlogPosts({ locale }: { locale: PostLocale }) {
  const posts = getBlogPosts(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <ul className="flex flex-col -mx-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <SpotlightRow href={blogHref(post.slug, locale)}>
            <span className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[14.5px] font-medium">
                {post.metadata.title}
                {!post.metadata.published && (
                  <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-faint border border-line rounded px-1.5 py-0.5">
                    {t("draft")}
                  </span>
                )}
                <RowArrow />
              </span>
              {post.metadata.summary && (
                <span className="block text-[13.5px] text-muted mt-0.5 line-clamp-2">
                  {post.metadata.summary}
                </span>
              )}
            </span>
            <time className="text-[13px] text-faint tabular-nums whitespace-nowrap">
              {formatDate(post.metadata.publishedAt, locale)}
            </time>
          </SpotlightRow>
        </li>
      ))}
    </ul>
  );
}
