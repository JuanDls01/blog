import Image from "next/image";
import { Download, Github, Linkedin, Mail, X } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { getTrainingData } from "@/lib/intervals";
import { Kicker } from "@/components/ui/kicker";
import { MetaText } from "@/components/ui/meta-text";
import { TextLink } from "@/components/ui/text-link";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Training } from "./components/training";
import profilePic from "../../../public/me.jpg";
import dinoNight from "../../../public/pixels/dino-night.png";
import forest from "../../../public/pixels/forest.jpg";

export const revalidate = 3600;

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/JuanDls01/",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juanidlsdev/",
    icon: Linkedin,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/JuanDls01",
    icon: X,
  },
  {
    label: "Email",
    href: "mailto:juanignaciodelossantos01@gmail.com",
    icon: Mail,
  },
];

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const training = await getTrainingData();
  const cvHref = getPathname({ href: "/cv/download", locale });

  const experienceMeta = [
    { key: "geoactio", company: "GeoActio", period: `2025 — ${t("present")}` },
    { key: "crombieAiLead", company: "Crombie", period: "2025" },
  ];

  return (
    <>
      <section className="flex flex-col gap-5">
        <div aria-hidden className="reveal -mt-8">
          <Image
            src={forest}
            alt=""
            priority
            className="w-full rounded-xl aspect-[1200/352] object-cover object-[center_35%] [image-rendering:pixelated] dark:hidden"
          />
          <Image
            src={dinoNight}
            alt=""
            priority
            className="hidden w-full rounded-xl aspect-[1200/352] object-cover [image-rendering:pixelated] dark:block"
          />
        </div>
        <div className="reveal">
          <div className="relative -mt-15 w-fit">
            <Image
              src={profilePic}
              width={80}
              height={80}
              quality={95}
              alt="Juani De los Santos"
              className="rounded-full size-20 object-cover border-[3px] border-bg"
              priority
            />
            <span
              role="img"
              aria-label={t("availableStatus")}
              className="absolute bottom-[5px] right-[5px] flex size-3.5"
            >
              <span aria-hidden className="ripple absolute inset-0 rounded-full bg-green-500/40 dark:bg-green-400/40" />
              <span aria-hidden className="relative size-full rounded-full bg-green-500 dark:bg-green-400 border-2 border-bg" />
            </span>
          </div>
          <PageTitle className="mt-3 leading-tight">
            <span className="shine">Juani De los Santos</span>
          </PageTitle>
          <p className="text-sm text-muted mt-0.5">{t("role")}</p>
        </div>

        <p className="reveal reveal-1 text-muted [&_strong]:text-fg [&_strong]:font-medium">
          {t.rich("bio", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <p className="reveal reveal-2 flex items-baseline gap-2.5 text-[13px]">
          <span className="inline-flex items-center gap-1.5 shrink-0">
            <Kicker as="span" size="xs" className="leading-none">
              {t("nowLabel")}
            </Kicker>
          </span>
          <span className="text-muted">
            {t.rich("now", {
              geoactio: (chunks) => (
                <TextLink href="https://geoactio.com">{chunks}</TextLink>
              ),
              estacionar: (chunks) => (
                <TextLink href="https://estacionar.me">{chunks}</TextLink>
              ),
            })}
          </span>
        </p>

        <div className="reveal reveal-2 flex items-center gap-1 -ml-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="p-2 text-faint hover:text-fg hover:bg-surface rounded-lg transition-[color,background-color,scale] duration-150 active:scale-[0.96]"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
          <span aria-hidden className="w-px h-4 bg-line mx-1" />
          <a
            href={cvHref}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 -my-0.5 text-[13px] text-faint hover:text-fg hover:bg-surface rounded-lg transition-[color,background-color,scale] duration-150 active:scale-[0.96]"
          >
            <Download size={15} strokeWidth={1.75} />
            {tNav("downloadCv")}
          </a>
        </div>
      </section>

      <section className="reveal reveal-3 mt-16">
        <Kicker className="mb-5">{t("sections.experience")}</Kicker>
        <ul className="flex flex-col">
          {experienceMeta.map((job, i) => (
            <li
              key={`${job.company}-${job.key}`}
              className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 py-3.5 ${
                i === 0 ? "pt-0" : "border-t border-line"
              }`}
            >
              <span className="text-[14.5px] font-medium">
                {t(`experience.${job.key}.role`)} ·{" "}
                <span className="text-muted font-normal">{job.company}</span>
              </span>
              <MetaText nowrap className="pt-px">
                {job.period}
              </MetaText>
              <span className="col-span-full text-[13.5px] text-muted mt-1">
                {t(`experience.${job.key}.summary`)}
              </span>
            </li>
          ))}
        </ul>
        <TextLink href="/work" variant="quiet" className="inline-block mt-3">
          {t("seeFullExperience")}
        </TextLink>
      </section>

      <section className="reveal reveal-4 mt-16">
        <Kicker className="mb-5">{t("sections.beyond")}</Kicker>
        <p className="text-muted">{t("beyond.body")}</p>
        {training && (
          <>
            <div className="mt-7">
              <Training data={training} locale={locale} />
            </div>
            <MetaText as="p" className="mt-4">
              {t("beyond.stats", {
                recentKm: training.running.recentDistanceKm,
                recentRuns: training.running.recentRuns,
                ytdKm: training.running.ytdDistanceKm,
              })}
            </MetaText>
          </>
        )}
      </section>

      <section className="reveal reveal-5 mt-16">
        <Kicker className="mb-5">{t("sections.contact")}</Kicker>
        <p className="text-muted mb-5">{t("contactIntro")}</p>
        <Button href="mailto:juanignaciodelossantos01@gmail.com">
          {t("getInTouch")}
        </Button>
      </section>
    </>
  );
}
