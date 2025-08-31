import { Icon } from "@/src/components/icons";
import { Badge } from "@/src/components/ui/badge";

export const metadata = {
  title: "Experience",
  description: "An overview of my professional journey",
};

const WorkPage = () => {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My work</h1>
      <p className="text-base">
        Passionate about building impactful digital solutions and enhancing user
        experiences, I&apos;ve contributed to projects spanning software
        engineering, mentoring, and team collaboration. This is an overview of
        my professional journey:
      </p>
      <hr className="my-6 border-neutral-800" />
      <div>
        <h2 className="font-semibold text-xl tracking-tighter my-4">
          GeoActio
        </h2>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Software Engineer Frontend (Jul 2025 - Present)"}
        </h3>
        <span className="text-sm">
          Currently developing the ActioTicket web application using{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            Next.js <Icon.NextJs />
          </Badge>{" "}
          , a platform that enables users to purchase and manage public
          transportation tickets in Spain. Building intuitive user interfaces
          with{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            TypeScript <Icon.TypeScript />
          </Badge>{" "}
          and implementing comprehensive unit testing to ensure code quality and
          application reliability. Contributing to modernizing public
          transportation ticketing systems with digital solutions.
        </span>
      </div>
      <hr className="my-6 border-neutral-800" />
      <div>
        <h2 className="font-semibold text-xl tracking-tighter my-4">Crombie</h2>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"AI Lead Engineer - Center of Excellence (May 2025 - Jul 2025)"}
        </h3>
        <span className="text-sm">
          Served as Technical Lead of Crombie&apos;s CoE, a new team focused on
          designing AI-driven solutions based on client needs. Proposed
          technical designs for client solutions, from intelligent agents with
          custom tools to workflows with greater execution control. Translated
          solutions into requirements for team task division. Utilized
          technologies such as{" "}
          <Badge variant="outline" className="px-1">
            Vercel AI SDK
          </Badge>
          ,{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            AWS <Icon.Aws />
          </Badge>{" "}
          Bedrock, Lambdas, DynamoDB, and Langchain.
        </span>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Software Engineer Frontend (Nov 2023 - May 2025)"}
        </h3>
        <span className="text-sm">
          Part of an interdisciplinary team managing{" "}
          <span className="inline-flex items-center gap-x-1">
            Puma <Icon.Puma />
          </span>{" "}
          e-commerce in the U.S., Canada, UK, Japan, and India. Used{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            Next.js <Icon.NextJs />
          </Badge>{" "}
          with Server-Side Rendering (SSR) to optimize SEO and Client-Side
          Rendering (CSR) to enhance interactivity. Employed Google Cloud Trace
          Explorer to detect duplicate queries, reducing Largest Contentful
          Paint (LCP) by 25% and improving conversion rates. Reduced bundle size
          by 20% by dynamically importing unnecessary files. Developed
          middlewares in a custom Next.js server using Node.js and Express.
        </span>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Ssr. FullStack Developer (Jun. 2023 - Nov. 2023)"}
        </h3>
        <span className="text-sm">
          Led a team of 4 developers to build Crombie&apos;s new website, using{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            Next.js <Icon.NextJs />
          </Badge>{" "}
          with App Router for server-side rendering, improving performance and
          SEO. Added styles and animations with Tailwind CSS. Used{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            TypeScript <Icon.TypeScript />
          </Badge>{" "}
          to improve code quality. Configured Bitbucket pipelines for automated
          deployments in{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            AWS <Icon.Aws />
          </Badge>{" "}
          and managed infrastructure with SST (Serverless Stack).
        </span>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Jr. FullStack Developer (Nov 2022 - Jun 2023)"}
        </h3>
        <span className="text-sm">
          Developed an MVP for equipment management and preventive maintenance.
          Built a REST API using{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            Python <Icon.Python />
          </Badge>{" "}
          and{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            Django <Icon.Django />
          </Badge>{" "}
          Rest Framework and developed interactive user interfaces (forms,
          tables, dashboards, and charts) using{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            React <Icon.React />
          </Badge>{" "}
          , Vite, React Query, and Material UI. Achieved over 80% test coverage
          in unit tests.
        </span>
      </div>
      <hr className="my-6 border-neutral-800" />
      <div>
        <h2 className="font-semibold text-xl tracking-tighter my-4">CAGSA</h2>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight my-4">
          {"Industrial Engineer Intern (Jan 2021 - Jan 2022)"}
        </h3>
        <p className="text-sm">
          I assisted in inventory management and developed an Excel-based system
          for managing costs and pricing of GAUSS retail products. I also
          redesigned the plant floor layout to implement a Just-In-Time (JIT)
          methodology using KANBAN cards.
        </p>
      </div>
    </section>
  );
};

export default WorkPage;
