import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SpotlightRow, RowArrow } from "src/components/spotlight-row";
import profilePic from "../public/me.jpg";

const experience = [
  {
    role: "Frontend Engineer",
    company: "GeoActio",
    period: "2025 — Now",
    summary:
      "Public transport ticketing for Spain. Multi-brand theming and end-to-end purchase flows with Next.js.",
  },
  {
    role: "AI Lead Engineer",
    company: "Crombie",
    period: "2025",
    summary:
      "Led the Center of Excellence designing AI agents and workflows. Vercel AI SDK, AWS Bedrock, Langchain.",
  },
  {
    role: "Frontend Engineer",
    company: "Crombie / Puma",
    period: "2023 — 2025",
    summary:
      "Puma e-commerce in 5 markets. Cut LCP by 25% and bundle size by 20%.",
  },
  {
    role: "FullStack Developer",
    company: "Crombie",
    period: "2022 — 2023",
    summary:
      "Led a team of 4 building Crombie's site. React, Django, AWS with SST.",
  },
];

const projects = [
  {
    title: "EstacionAR",
    description: "Parking reservations for Argentina — currently building",
    meta: "Next.js · Expo",
    href: "https://estacionar.me",
    external: true,
  },
  {
    title: "ActioTicket",
    description: "Buy and manage public transport tickets across Spain",
    meta: "Next.js",
    href: "/work",
  },
  {
    title: "AI Center of Excellence",
    description: "Agent architectures and AI workflows for client solutions",
    meta: "AI SDK",
    href: "/work",
  },
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
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juanidlsdev/",
    icon: FiLinkedin,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/JuanDls01",
    icon: FaXTwitter,
  },
  {
    label: "Email",
    href: "mailto:juanignaciodelossantos01@gmail.com",
    icon: FiMail,
  },
];

export default function Page() {
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
            <p className="text-sm text-muted mt-0.5">AI Frontend Engineer</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] text-muted whitespace-nowrap max-sm:hidden">
            <span className="size-[7px] rounded-full bg-accent" />
            Open to opportunities
          </span>
        </div>

        <div className="text-muted [&_strong]:text-fg [&_strong]:font-medium">
          <p>
            I build fast, thoughtful web applications with{" "}
            <strong>React</strong>, <strong>Next.js</strong> and{" "}
            <strong>TypeScript</strong>. Currently at{" "}
            <a
              href="https://geoactio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg transition-colors duration-150"
            >
              GeoActio
            </a>
            , modernizing public transport ticketing in Spain, while building{" "}
            <a
              href="https://estacionar.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg transition-colors duration-150"
            >
              estacionar.me
            </a>
            , a parking reservation platform for Argentina.
          </p>
          <p className="mt-3.5">
            Before that I led AI engineering at Crombie&apos;s Center of
            Excellence and helped run Puma&apos;s e-commerce across five
            countries. My industrial engineering background shapes how I work:
            break the complex problem down, then ship the simple solution.
          </p>
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
              className="p-2 text-faint hover:text-fg hover:bg-surface rounded-lg transition-colors duration-150 active:scale-95"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </section>

      <section className="reveal reveal-1 mt-16">
        <SectionTitle>Experience</SectionTitle>
        <ul className="flex flex-col">
          {experience.map((job, i) => (
            <li
              key={`${job.company}-${job.role}`}
              className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 py-3.5 ${
                i === 0 ? "pt-0" : "border-t border-line"
              }`}
            >
              <span className="text-[14.5px] font-medium">
                {job.role} ·{" "}
                <span className="text-muted font-normal">{job.company}</span>
              </span>
              <span className="text-[13px] text-faint tabular-nums whitespace-nowrap pt-px">
                {job.period}
              </span>
              <span className="col-span-full text-[13.5px] text-muted mt-1">
                {job.summary}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal reveal-2 mt-16">
        <SectionTitle>Projects</SectionTitle>
        <ul className="flex flex-col -mx-3">
          {projects.map((project) => (
            <li key={project.title}>
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
                    {project.description}
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
        <SectionTitle>Stack</SectionTitle>
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
        <SectionTitle>Contact</SectionTitle>
        <p className="text-muted mb-5">
          Interested in working together, or just want to talk frontend and AI?
        </p>
        <div className="flex items-center gap-5 flex-wrap">
          <a
            href="mailto:juanignaciodelossantos01@gmail.com"
            className="inline-flex items-center rounded-lg bg-fg text-bg text-sm font-medium px-3.5 py-2 transition-[transform,opacity] duration-150 ease-out-strong hover:opacity-85 active:scale-[0.97]"
          >
            Get in touch
          </a>
          <Link
            href="/work"
            className="text-sm text-muted underline decoration-line underline-offset-[3px] hover:text-fg hover:decoration-fg transition-colors duration-150"
          >
            See full experience
          </Link>
        </div>
      </section>
    </>
  );
}
