import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {t("title")}
      </h1>
      <p className="mb-4">{t("description")}</p>
    </section>
  );
}
