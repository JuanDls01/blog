import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { MetaText } from "@/components/ui/meta-text";
import { PageTitle } from "@/components/ui/page-title";

type PositionMeta = {
  key: string;
};

type JobMeta = {
  company: string;
  period: string;
  positions: PositionMeta[];
};

const jobsMeta: JobMeta[] = [
  {
    company: "EstacionAR",
    period: "2026 — Now",
    positions: [{ key: "estacionarFounder" }],
  },
  {
    company: "GeoActio",
    period: "Jul 2025 — Now",
    positions: [{ key: "geoactioFrontend" }],
  },
  {
    company: "Crombie",
    period: "Nov 2022 — Jul 2025",
    positions: [
      { key: "crombieAiLead" },
      { key: "crombiePuma" },
      { key: "crombieInstructor" },
      { key: "crombieSsrFullstack" },
      { key: "crombieJrFullstack" },
    ],
  },
  {
    company: "CAGSA",
    period: "Jan 2021 — Jan 2022",
    positions: [{ key: "cagsaIntern" }],
  },
];

const educationMeta = [
  {
    key: "unl",
    school: "Universidad Nacional del Litoral",
    period: "2017 — 2026",
  },
  { key: "henry", school: "Henry Bootcamp", period: "2022" },
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "work" });

  return {
    title: t("title"),
    description: t("intro"),
  };
}

const WorkPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <section className="reveal">
      <PageTitle>{t("title")}</PageTitle>
      <p className="text-muted mt-3">{t("intro")}</p>

      <div className="mt-10 flex flex-col gap-10">
        {jobsMeta.map((job) => (
          <div key={job.company}>
            <div className="flex items-baseline justify-between gap-4 pb-4 mb-4 border-b border-line">
              <Kicker>{job.company}</Kicker>
              <MetaText nowrap>{job.period}</MetaText>
            </div>
            <ul className="flex flex-col gap-6">
              {job.positions.map((position) => (
                <li key={position.key}>
                  <p className="text-[14.5px] font-medium">
                    {t(`positions.${position.key}.role`)}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {(
                      t.raw(`positions.${position.key}.highlights`) as string[]
                    ).map((highlight) => (
                      <li
                        key={highlight}
                        className="text-[13.5px] text-muted pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-faint"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <Kicker className="mb-4">{t("sections.education")}</Kicker>
          <ul className="flex flex-col gap-6">
            {educationMeta.map((item) => (
              <li key={item.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[14.5px] font-medium">
                    {t(`education.${item.key}.degree`)} ·{" "}
                    <span className="text-muted font-normal">
                      {item.school}
                    </span>
                  </p>
                  <MetaText nowrap>{item.period}</MetaText>
                </div>
                <p className="text-[13.5px] text-muted mt-1">
                  {t(`education.${item.key}.note`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
