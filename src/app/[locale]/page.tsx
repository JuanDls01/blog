import Image from "next/image";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { SpotlightRow, RowArrow } from "@/components/spotlight/row";
import profilePic from "../../../public/me.jpg";

const experienceMeta = [
  { key: "geoactio", company: "GeoActio", period: "2025 — Now" },
  { key: "crombieAiLead", company: "Crombie", period: "2025" },
  { key: "crombiePuma", company: "Crombie / Puma", period: "2023 — 2025" },
  { key: "crombieFullstack", company: "Crombie", period: "2022 — 2023" },
];

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Tailwind CSS",
  "Node.js",
  "tRPC",
  "PostgreSQL",
  "AWS",
  "Vercel AI SDK",
  "Langchain",
];

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
  const workHref = getPathname({ href: "/work", locale });

  const projectsMeta = [
    {
      key: "estacionar",
      title: "EstacionAR",
      meta: "Next.js · Expo",
      href: "https://estacionar.me",
      external: true,
    },
    {
      key: "actioticket",
      title: "ActioTicket",
      meta: "Next.js",
      href: workHref,
    },
    {
      key: "aiCoe",
      title: "AI Center of Excellence",
      meta: "AI SDK",
      href: workHref,
    },
  ];

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
          <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] text-muted whitespace-nowrap max-sm:hidden">
            <span className="size-[7px] rounded-full bg-accent" />
            {t("openToOpportunities")}
          </span>
        </div>

        <div className="text-muted [&_strong]:text-fg [&_strong]:font-medium">
          <p>
            {t.rich("bioP1", {
              strong: (chunks) => <strong>{chunks}</strong>,
              geoactio: (chunks) => (
                <a
                  href="https://geoactio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg transition-colors duration-150"
                >
                  {chunks}
                </a>
              ),
              estacionar: (chunks) => (
                <a
                  href="https://estacionar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg transition-colors duration-150"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
          <p className="mt-3.5">{t("bioP2")}</p>
        </div>

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
      </section>

      <section className="reveal reveal-2 mt-16">
        <SectionTitle>{t("sections.projects")}</SectionTitle>
        <ul className="flex flex-col -mx-3">
          {projectsMeta.map((project) => (
            <li key={project.key}>
              <SpotlightRow
                href={project.href}
                {...(project.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-[14.5px] font-medium">
                    {project.title} <RowArrow />
                  </span>
                  <span className="block text-[13.5px] text-muted mt-0.5">
                    {t(`projects.${project.key}.description`)}
                  </span>
                </span>
                <span className="text-[13px] text-faint whitespace-nowrap">
                  {project.meta}
                </span>
              </SpotlightRow>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal reveal-3 mt-16">
        <SectionTitle>{t("sections.stack")}</SectionTitle>
        <p className="text-sm text-muted leading-8">
          {stack.map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < stack.length - 1 && (
                <span className="text-faint mx-1.5">·</span>
              )}
            </span>
          ))}
        </p>
      </section>

      <section className="reveal reveal-4 mt-16">
        <SectionTitle>{t("sections.contact")}</SectionTitle>
        <p className="text-muted mb-5">{t("contactIntro")}</p>
        <div className="flex items-center gap-5 flex-wrap">
          <a
            href="mailto:juanignaciodelossantos01@gmail.com"
            className="inline-flex items-center rounded-lg bg-fg text-bg text-sm font-medium px-3.5 py-2 transition-[scale,opacity] duration-150 ease-out-strong hover:opacity-85 active:scale-[0.96]"
          >
            {t("getInTouch")}
          </a>
          <Link
            href="/work"
            className="text-sm text-muted underline decoration-line underline-offset-[3px] hover:text-fg hover:decoration-fg transition-colors duration-150"
          >
            {t("seeFullExperience")}
          </Link>
        </div>
      </section>
    </>
  );
}
