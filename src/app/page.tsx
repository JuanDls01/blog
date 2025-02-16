"use client";

import { Badge } from "../components/ui/badge";

export default function Page() {
  return (
    <section className="flex flex-col gap-y-8">
      <h1 className="text-2xl font-semibold tracking-tighter">
        Hello, I&apos;m Juani De los Santos
      </h1>
      <span>
        I&apos;m a FullStack Software Engineer at Crombie.dev, where I build
        high-performing, robust, and high-traffic web applications using
        technologies like <Badge variant="outline">React</Badge>,{" "}
        <Badge variant="outline">Next.js</Badge> and{" "}
        <Badge variant="outline">TypeScript</Badge>. My constant curiosity and
        drive for new challenges keep me at the forefront of the latest
        technological advancements.
      </span>
      <div className="flex flex-col gap-y-4">
        <p>
          Throughout my career, I have worked on MVP projects for both internal
          and external clients, as well as on an e-commerce platform for one of
          the world&apos;s most renowned sports brands.
        </p>
        <p>
          Beyond my work as a developer, I&apos;m an industrial engineering
          student on the verge of graduating—a background that has honed my
          ability to deconstruct complex problems into simpler, manageable
          parts. While this analytical approach has been invaluable in my
          career, the friendships I&apos;ve made along the way are what I
          cherish the most.
        </p>
        <p>
          I look forward to embracing new challenges and opportunities that
          drive innovation and foster continuous growth.
        </p>
      </div>
    </section>
  );
}
