import { getAllSlugs, getPost } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/site";

function localizedUrl(path: string, locale: string) {
  return locale === routing.defaultLocale
    ? `${baseUrl}${path}`
    : `${baseUrl}/${locale}${path}`;
}

export default async function sitemap() {
  const today = new Date().toISOString().split("T")[0];

  const localizedRoutes = ["", "/work", "/blog"].flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: today,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(path, l)])
        ),
      },
    }))
  );

  const blogs = getAllSlugs().flatMap((slug) =>
    routing.locales.flatMap((locale) => {
      const post = getPost(slug, locale as (typeof routing.locales)[number]);
      if (!post) return [];
      return [
        {
          url: localizedUrl(`/blog/${slug}`, locale),
          lastModified: post.metadata.publishedAt,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [l, localizedUrl(`/blog/${slug}`, l)])
            ),
          },
        },
      ];
    })
  );

  return [...localizedRoutes, ...blogs];
}
