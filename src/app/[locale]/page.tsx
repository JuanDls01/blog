import Image from "next/image";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTrainingData } from "@/lib/intervals";
import { Training } from "./components/training";
import profilePic from "../../../public/me.jpg";

export const revalidate = 3600;

const experienceMeta = [
  { key: "geoactio", company: "GeoActio", period: "2025 — Now" },
  { key: "crombieAiLead", company: "Crombie", period: "2025" },
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg transition-colors duration-150"
    >
      {children}
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-medium uppercase tracking-[0.05em] text-faint mb-5">
      {children}
    </h2>
  );
}

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
  const training = await getTrainingData();

  return (
    <>
      <section className="reveal flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Image
            src={profilePic}
            width={56}
            height={56}
            quality={95}
            alt="Juani De los Santos"
            className="rounded-full border border-line size-14 object-cover"
            priority
          />
          <div>
            <h1 className="text-[19px] font-semibold tracking-[-0.01em] leading-tight">
              <span className="shine">Juani De los Santos</span>
            </h1>
            <p className="text-sm text-muted mt-0.5">{t("role")}</p>
          </div>
        </div>

        <p className="text-muted [&_strong]:text-fg [&_strong]:font-medium">
          {t.rich("bio", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <p className="flex items-baseline gap-2.5 text-[14px]">
          <span className="inline-flex items-center gap-1.5 shrink-0">
            <span className="size-[7px] rounded-full bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] leading-none text-faint">
              {t("nowLabel")}
            </span>
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

        <div className="flex items-center gap-1 -ml-2">
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
        </div>
      </section>

      <section className="reveal reveal-1 mt-16">
        <SectionTitle>{t("sections.experience")}</SectionTitle>
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
              <span className="text-[13px] text-faint tabular-nums whitespace-nowrap pt-px">
                {job.period}
              </span>
              <span className="col-span-full text-[13.5px] text-muted mt-1">
                {t(`experience.${job.key}.summary`)}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/work"
          className="inline-block mt-3 text-[13.5px] text-muted underline decoration-line underline-offset-[3px] hover:text-fg hover:decoration-fg transition-colors duration-150"
        >
          {t("seeFullExperience")}
        </Link>
      </section>

      <section className="reveal reveal-2 mt-16">
        <SectionTitle>{t("sections.beyond")}</SectionTitle>
        <p className="text-muted">{t("beyond.body")}</p>
        {training && (
          <>
            <div className="mt-7">
              <Training data={training} locale={locale} />
            </div>
            <p className="mt-4 text-[13px] text-faint tabular-nums">
              {t("beyond.stats", {
                recentKm: training.running.recentDistanceKm,
                recentRuns: training.running.recentRuns,
                ytdKm: training.running.ytdDistanceKm,
              })}
            </p>
          </>
        )}
      </section>

      <section className="reveal reveal-3 mt-16">
        <SectionTitle>{t("sections.contact")}</SectionTitle>
        <p className="text-muted mb-5">{t("contactIntro")}</p>
        <a
          href="mailto:juanignaciodelossantos01@gmail.com"
          className="inline-flex items-center rounded-lg bg-fg text-bg text-sm font-medium px-3.5 py-2 transition-[scale,opacity] duration-150 ease-out-strong hover:opacity-85 active:scale-[0.96]"
        >
          {t("getInTouch")}
        </a>
      </section>
    </>
  );
}
