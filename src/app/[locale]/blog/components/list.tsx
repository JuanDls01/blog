import { getTranslations } from "next-intl/server";
import { formatDate, getBlogPosts, type PostLocale } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { SpotlightRow, RowArrow } from "@/components/spotlight/row";
import { Badge } from "@/components/ui/badge";
import { MetaText } from "@/components/ui/meta-text";

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
                {!post.metadata.published && <Badge>{t("draft")}</Badge>}
                <RowArrow />
              </span>
              {post.metadata.summary && (
                <span className="block text-[13.5px] text-muted mt-0.5 line-clamp-2">
                  {post.metadata.summary}
                </span>
              )}
              <span className="block text-[12.5px] text-faint mt-1.5 tabular-nums">
                {[
                  t("readingTime", { minutes: post.readingMinutes }),
                  ...post.metadata.tags,
                ].join(" · ")}
              </span>
            </span>
            <MetaText as="time" nowrap>
              {formatDate(post.metadata.publishedAt, locale)}
            </MetaText>
          </SpotlightRow>
        </li>
      ))}
    </ul>
  );
}
