import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTitle } from "@/components/ui/page-title";
import { BlogPosts } from "./components/list";
import type { PostLocale } from "@/lib/posts";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="reveal">
      <PageTitle>{t("title")}</PageTitle>
      <p className="text-muted mt-3 mb-8">{t("intro")}</p>
      <BlogPosts locale={locale as PostLocale} />
    </section>
  );
}
