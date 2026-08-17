import { getTranslations } from "next-intl/server";

export const identity = {
  firstName: "Juan Ignacio",
  lastName: "De los Santos",
  email: "juanignaciodelossantos01@gmail.com",
  phone: "+5493424621194",
  location: "CABA, Argentina",
  linkedin: "linkedin.com/in/juanidlsdev",
  portfolio: "juanidls.dev",
};

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "NestJS",
  "AWS",
  "PostgreSQL",
  "AI / LLM tooling",
  "Tailwind CSS",
];

export const educationMeta = [
  { key: "unl", school: "Universidad Nacional del Litoral", period: "2017 — 2026" },
  { key: "henry", school: "Henry Bootcamp", period: "2022" },
] as const;

export const languagesMeta = [{ key: "spanish" }, { key: "english" }] as const;

export const experienceMeta = [
  { key: "geoactio", company: "GeoActio", period: "Jul 2025 — Now" },
  { key: "crombie", company: "Crombie", period: "Nov 2022 — Jul 2025" },
] as const;

export const projectsMeta = [
  { key: "estacionar", tags: ["Expo", "Next.js", "Hono", "tRPC", "PostGIS"] },
  { key: "actioticket", tags: ["Next.js", "TypeScript", "MUI"] },
  { key: "aiCoe", tags: ["Vercel AI SDK", "Bedrock", "Langchain"] },
  { key: "puma", tags: ["Next.js", "Sanity", "GA4"] },
] as const;

export async function getCvContent(locale: string) {
  const t = await getTranslations({ locale, namespace: "cv" });
  const tWork = await getTranslations({ locale, namespace: "work" });

  return {
    role: t("role"),
    sections: {
      profile: t("sections.profile"),
      experience: t("sections.experience"),
      projects: t("sections.projects"),
      skills: t("sections.skills"),
      education: t("sections.education"),
      languages: t("sections.languages"),
      contact: t("sections.contact"),
    },
    profileSummary: t("profileSummary"),
    experience: experienceMeta.map((job) => ({
      ...job,
      role: t(`experience.${job.key}.role`),
      bullets: t.raw(`experience.${job.key}.bullets`) as string[],
    })),
    projects: projectsMeta.map((project) => ({
      ...project,
      title: t(`projects.${project.key}.title`),
      description: t(`projects.${project.key}.description`),
    })),
    education: educationMeta.map((item) => ({
      ...item,
      degree: tWork(`education.${item.key}.degree`),
    })),
    languages: languagesMeta.map((item) => ({
      ...item,
      name: t(`languages.${item.key}.name`),
      level: t(`languages.${item.key}.level`),
    })),
  };
}

export type CvContent = Awaited<ReturnType<typeof getCvContent>>;
