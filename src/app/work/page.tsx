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
        <h2 className="font-semibold text-xl tracking-tighter my-4">Crombie</h2>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Software Engineer Frontend (Nov 2023 - Present)"}
        </h3>
        <span className="text-sm">
          As part of the Puma Frontend team, I support{" "}
          <span className="inline-flex items-center gap-x-1">
            Puma <Icon.Puma />
          </span>{" "}
          ecommerce for the USA, Canada, UK, Japan, and India. Using Google
          Cloud Trace Explorer, I identified duplicate and sequential queries
          that reduced the LCP by 25%, boosting conversion rates. I implemented
          changes based on Puma&apos;s Design System to lower bounce rates and
          participated in the migration to Google Analytics 4. Additionally, I
          optimized the{" "}
          <Badge variant={"secondary"} className="px-1">
            \_app.tsx
          </Badge>{" "}
          bundle size by 20%, reducing page load times.
        </span>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Ssr. FullStack Developer (Jul 2023 - Nov 2023)"}
        </h3>
        <span className="text-sm">
          I led a team of 4 developers to create Crombie&apos;s new, dynamic
          website, coordinating planning and negotiating requirements with
          Marketing to meet critical deadlines. We leveraged WordPress as a CMS,
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            Next.js <Icon.NextJs />
          </Badge>{" "}
          for server-side rendering to improve performance and SEO, and
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            TypeScript <Icon.TypeScript />
          </Badge>{" "}
          for an optimal development experience. I set up automated deployments
          on{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            AWS <Icon.Aws />
          </Badge>{" "}
          using infrastructure as code, mentored new developers, and taught at
          Escuelita Crombie.
        </span>
        <h3 className="font-semibold text-base text-neutral-400/70 leading-none tracking-tight mt-4 mb-2">
          {"Jr. FullStack Developer (Nov 2022 - Jul 2023)"}
        </h3>
        <span className="text-sm">
          I contributed to the development of an MVP for managing electronic
          equipment and preventive maintenance through alerts and rules. I build
          a REST API with{" "}
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
          and developed user interfaces—including forms, paginated tables,
          filters, charts, and dashboards—using{" "}
          <Badge
            variant="outline"
            className="px-1 inline-flex items-center gap-x-1"
          >
            React <Icon.React />
          </Badge>{" "}
          , React Query, and Material UI, achieving over 80% test coverage.
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
