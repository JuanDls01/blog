"use client";

import Image from "next/image";
import { Badge } from "../components/ui/badge";
import profilePic from "../public/me.jpg";

export default function Page() {
  return (
    <section className="flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-8">
        <div className="relative">
          <Image
            src={profilePic}
            width={120}
            height={120}
            quality={95}
            alt="Profile Image - Juani De los Santos"
            className="rounded-full ring-4 ring-neutral-800/50 shadow-2xl"
            priority
          />
          <div
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full 
                          border-4 border-neutral-900 animate-pulse"
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Hello, I&apos;m{" "}
            <span
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 
                            bg-clip-text text-transparent"
            >
              Juani De los Santos
            </span>
          </h1>
          <span className="text-neutral-300 text-lg leading-relaxed">
            I&apos;m an AI Frontend Engineer currently working at GeoActio,
            specializing in building high-performing, scalable web applications
            with <Badge variant="outline">React</Badge>,{" "}
            <Badge variant="outline">Next.js</Badge>, and{" "}
            <Badge variant="outline">TypeScript</Badge>. With over 3 years of
            experience in digital product development, I focus on performance
            optimization, user experience, and integrating AI-driven solutions
            into modern web applications.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 text-neutral-200 leading-relaxed">
        <span>
          Throughout my career, I&apos;ve led teams and contributed to
          high-impact projects, from developing public transportation ticketing
          systems in Spain to optimizing e-commerce platforms for global sports
          brands like Puma across multiple markets including the U.S., Canada,
          UK, Japan, and India.
        </span>
        <span>
          My recent experience as AI Lead Engineer at Crombie&apos;s Center of
          Excellence has positioned me at the intersection of frontend
          development and artificial intelligence, where I design AI-driven
          solutions using cutting-edge technologies like Vercel AI SDK, AWS
          Bedrock, and Langchain. This unique combination allows me to create
          intelligent, user-centric applications that push the boundaries of
          what&apos;s possible on the web.
        </span>
        <span>
          Beyond my technical expertise, my industrial engineering background
          provides me with a systematic approach to problem-solving, helping me
          break down complex challenges into manageable, scalable solutions.
          I&apos;m passionate about leveraging technology to create meaningful
          impact and drive innovation in every project I undertake.
        </span>
      </div>
    </section>
  );
}
