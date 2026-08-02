import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
        <h1 className="text-2xl font-semibold tracking-tighter">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted">{t("description")}</p>
      </div>
      <Link
        href="/"
        className="self-start text-[13.5px] text-muted underline decoration-line underline-offset-[3px] hover:text-fg hover:decoration-fg transition-colors duration-150"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
