import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PositionMeta = {
  key: string;
  period: string;
};

type JobMeta = {
  company: string;
  positions: PositionMeta[];
};

const jobsMeta: JobMeta[] = [
  {
    company: "EstacionAR",
    positions: [{ key: "estacionarFounder", period: "2026 — Now" }],
  },
  {
    company: "GeoActio",
    positions: [{ key: "geoactioFrontend", period: "Jul 2025 — Now" }],
  },
  {
    company: "Crombie",
    positions: [
      { key: "crombieAiLead", period: "May 2025 — Jul 2025" },
      { key: "crombiePuma", period: "Nov 2023 — May 2025" },
      { key: "crombieInstructor", period: "Jul 2023 — Nov 2023" },
      { key: "crombieSsrFullstack", period: "May 2023 — Nov 2023" },
      { key: "crombieJrFullstack", period: "Nov 2022 — May 2023" },
    ],
  },
  {
    company: "CAGSA",
    positions: [{ key: "cagsaIntern", period: "Jan 2021 — Jan 2022" }],
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
      <h1 className="text-[19px] font-semibold tracking-[-0.01em]">
        {t("title")}
      </h1>
      <p className="text-muted mt-3">{t("intro")}</p>

      <div className="mt-10 flex flex-col gap-10">
        {jobsMeta.map((job) => (
          <div key={job.company}>
            <h2 className="text-[13px] font-medium uppercase tracking-[0.05em] text-faint mb-4">
              {job.company}
            </h2>
            <ul className="flex flex-col gap-6">
              {job.positions.map((position) => (
                <li key={position.key}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[14.5px] font-medium">
                      {t(`positions.${position.key}.role`)}
                    </h3>
                    <span className="text-[13px] text-faint tabular-nums whitespace-nowrap">
                      {position.period}
                    </span>
                  </div>
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
          <h2 className="text-[13px] font-medium uppercase tracking-[0.05em] text-faint mb-4">
            {t("sections.education")}
          </h2>
          <ul className="flex flex-col gap-6">
            {educationMeta.map((item) => (
              <li key={item.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[14.5px] font-medium">
                    {t(`education.${item.key}.degree`)} ·{" "}
                    <span className="text-muted font-normal">
                      {item.school}
                    </span>
                  </h3>
                  <span className="text-[13px] text-faint tabular-nums whitespace-nowrap">
                    {item.period}
                  </span>
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
