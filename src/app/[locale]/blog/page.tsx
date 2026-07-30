import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogPosts } from "src/components/posts";
import type { PostLocale } from "src/lib/posts";

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
      <h1 className="text-[19px] font-semibold tracking-[-0.01em]">
        {t("title")}
      </h1>
      <p className="text-muted mt-3 mb-8">{t("intro")}</p>
      <BlogPosts locale={locale as PostLocale} />
    </section>
  );
}
