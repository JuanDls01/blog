import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { CvDownloadTrigger } from "./trigger";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });

  return {
    title: t("downloadCv"),
    robots: { index: false, follow: false },
  };
}

export default async function CvPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  const tCv = await getTranslations({ locale, namespace: "cv" });
  const downloadHref = getPathname({ href: "/cv/download", locale });

  return (
    <section className="reveal flex flex-col items-start gap-4">
      <PageTitle>{t("downloadCv")}</PageTitle>
      <p className="text-muted">{tCv("downloadHint")}</p>
      <Button href={downloadHref}>{t("downloadCv")}</Button>
      <CvDownloadTrigger href={downloadHref} />
    </section>
  );
}
