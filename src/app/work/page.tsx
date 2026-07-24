export const metadata = {
  title: "Experience",
  description: "An overview of my professional journey",
};

type Position = {
  role: string;
  period: string;
  highlights: string[];
};

type Job = {
  company: string;
  positions: Position[];
};

const jobs: Job[] = [
  {
    company: "EstacionAR",
    positions: [
      {
        role: "Founder & Engineer",
        period: "2026 — Now",
        highlights: [
          "Building estacionar.me, a parking reservation platform for Argentina: drivers discover and book parking spots, operators manage their garages.",
          "Owning the full product: an Expo (React Native) driver app, a Next.js operator dashboard and a Hono + tRPC API.",
          "PostgreSQL with PostGIS and Drizzle ORM, deployed to AWS (Lambda, RDS, S3, CloudFront) with SST.",
        ],
      },
    ],
  },
  {
    company: "GeoActio",
    positions: [
      {
        role: "Frontend Engineer",
        period: "Jul 2025 — Now",
        highlights: [
          "Building ActioTicket, a SaaS platform modernizing public transport ticketing in Spain, serving operators like Navarra and Sabadell.",
          "Designed a multi-brand theme architecture with Next.js, TypeScript and Material UI, with custom styling per operator.",
          "Implemented the end-to-end origin–destination ticket purchase flow — routes, dates, fares and checkout — for the Navarra operator.",
          "Refactored key components with the Composite pattern, improving reuse across brands, and kept unit test coverage above 80% with Vitest and React Testing Library.",
        ],
      },
    ],
  },
  {
    company: "Crombie",
    positions: [
      {
        role: "AI Lead Engineer · Center of Excellence",
        period: "May 2025 — Jul 2025",
        highlights: [
          "Technical lead of a new team designing AI-driven solutions: intelligent agents with custom tools and controlled workflows.",
          "Translated solution designs into requirements for team task division.",
          "Vercel AI SDK, AWS Bedrock, Lambdas, DynamoDB, Langchain.",
        ],
      },
      {
        role: "Frontend Engineer",
        period: "Nov 2023 — May 2025",
        highlights: [
          "Puma e-commerce across the U.S., Canada, UK, Japan and India with Next.js (SSR + CSR) and Sanity as headless CMS.",
          "Improved LCP from 4.5s to 3.8s by tracing duplicate server requests with Google Cloud Trace, and cut bundle size by 20% with dynamic imports.",
          "Implemented technical SEO (rendering strategy, dynamic metadata, structured data, sitemaps) and GA4 e-commerce tracking.",
          "Built and maintained a shared Storybook component library across markets; unit and E2E testing with React Testing Library and Cypress.",
        ],
      },
      {
        role: "Software Development Instructor",
        period: "Jul 2023 — Nov 2023",
        highlights: [
          "Taught JavaScript, TypeScript and React in the second edition of Escuelita Crombie, the company's internal dev school.",
        ],
      },
      {
        role: "Ssr. FullStack Developer",
        period: "May 2023 — Nov 2023",
        highlights: [
          "Led a team of 4 building Crombie's website with Next.js App Router, Tailwind CSS and TypeScript.",
          "Configured Bitbucket pipelines for automated AWS deployments, managing infrastructure with SST.",
          "Ran code reviews and mentored new developers.",
        ],
      },
      {
        role: "Jr. FullStack Developer",
        period: "Nov 2022 — May 2023",
        highlights: [
          "MVP for equipment management and preventive maintenance: REST API with Python and Django REST Framework.",
          "Interactive UIs (forms, tables, dashboards, charts) with React, Vite, React Query and Material UI. Over 80% unit test coverage.",
        ],
      },
    ],
  },
  {
    company: "CAGSA",
    positions: [
      {
        role: "Industrial Engineer Intern",
        period: "Jan 2021 — Jan 2022",
        highlights: [
          "Inventory management and an Excel-based cost and pricing system for GAUSS retail products.",
          "Redesigned the plant floor layout to implement Just-In-Time with KANBAN cards.",
        ],
      },
    ],
  },
];

const education = [
  {
    school: "Universidad Nacional del Litoral",
    degree: "Industrial Engineering",
    period: "2017 — 2026",
    note: "Systems thinking, process optimization and project management applied to software.",
  },
  {
    school: "Henry Bootcamp",
    degree: "Full Stack Web Developer",
    period: "2022",
    note: "Intensive full-time program: JavaScript, React, Node.js, SQL.",
  },
];

const WorkPage = () => {
  return (
    <section className="reveal">
      <h1 className="text-[19px] font-semibold tracking-[-0.01em]">Work</h1>
      <p className="text-muted mt-3">
        I&apos;ve contributed to projects spanning software engineering, AI
        solutions, mentoring and team leadership. This is an overview of my
        professional journey.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {jobs.map((job) => (
          <div key={job.company}>
            <h2 className="text-[13px] font-medium uppercase tracking-[0.05em] text-faint mb-4">
              {job.company}
            </h2>
            <ul className="flex flex-col gap-6">
              {job.positions.map((position) => (
                <li key={position.role}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[14.5px] font-medium">
                      {position.role}
                    </h3>
                    <span className="text-[13px] text-faint tabular-nums whitespace-nowrap">
                      {position.period}
                    </span>
                  </div>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {position.highlights.map((highlight) => (
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
            Education
          </h2>
          <ul className="flex flex-col gap-6">
            {education.map((item) => (
              <li key={item.school}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[14.5px] font-medium">
                    {item.degree} ·{" "}
                    <span className="text-muted font-normal">
                      {item.school}
                    </span>
                  </h3>
                  <span className="text-[13px] text-faint tabular-nums whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                <p className="text-[13.5px] text-muted mt-1">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
