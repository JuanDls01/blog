import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageTitle } from "@/components/ui/page-title";
import { TextLink } from "@/components/ui/text-link";
import dinoNight from "../../../public/pixels/dino-night.png";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="reveal flex flex-col gap-6">
      <Image
        src={dinoNight}
        alt=""
        aria-hidden
        priority
        className="w-full rounded-xl border border-line [image-rendering:pixelated]"
      />
      <div>
        <PageTitle>{t("title")}</PageTitle>
        <p className="mt-2 text-muted">{t("description")}</p>
      </div>
      <TextLink href="/" variant="quiet" className="self-start">
        {t("backHome")}
      </TextLink>
    </section>
  );
}
