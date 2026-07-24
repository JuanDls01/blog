import { getBlogPosts } from "./blog/utils";
import { routing } from "src/i18n/routing";

export const baseUrl = "https://juanidls.dev";

function localizedUrl(path: string, locale: string) {
  return locale === routing.defaultLocale
    ? `${baseUrl}${path}`
    : `${baseUrl}/${locale}${path}`;
}

export default async function sitemap() {
  const today = new Date().toISOString().split("T")[0];

  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const localizedRoutes = ["", "/work"].flatMap((path) =>
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

  return [...localizedRoutes, { url: `${baseUrl}/blog`, lastModified: today }, ...blogs];
}
