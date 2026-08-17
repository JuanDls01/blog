# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers, and fellow engineers evaluating Juani De los Santos professionally. The blog notes are secondary artifacts of that same audience — written to be read by other engineers, not just personal notebook entries.

## Product Purpose

A personal portfolio and blog for Juani De los Santos, a software engineer. It presents his experience, current work, and technical writing to demonstrate his engineering ability and win professional opportunities (roles, collaborations, contact).

## Positioning

An industrial-engineering-trained software engineer who builds complex, scalable systems end to end (Next.js, NestJS, AWS) — framed as "break the complex problem down, then ship the simple solution." Differentiator versus a typical frontend-only portfolio: full-stack and infra breadth (frontend, backend, AI agent workflows, cloud infra) backed by an engineering-process background.

## Operating Context

- Content is authored as MDX/Markdown files in `src/content/`, bilingual by filename convention (`.en.mdx`, `.es.mdx`).
- Experience, bio, and UI strings are sourced from `src/i18n/messages/{en,es}.json`, not hardcoded in components.
- The "Beyond code" section pulls live running-training data from intervals.icu via an API key (`INTERVALS_API_KEY`); the section renders without metrics when unset.
- Deployed on Vercel at juanidls.dev; uses Vercel Analytics/Speed Insights, dynamic OG image generation, sitemap/robots/JSON-LD for SEO.

## Capabilities and Constraints

- Must stay bilingual (en/es) via `next-intl` — no English-only surfaces.
- MDX support with syntax highlighting (Shiki), math (KaTeX), and remark-gfm.
- Light/dark theming via `next-themes`.
- Tailwind v4, Geist font family.

## Brand Commitments

- Name: Juani De los Santos.
- Pixel-art banner motif (currently a forest/dino-night pair on the homepage hero, swapped for light/dark) is a committed visual direction — future work should preserve the pixel-art style. The specific dino graphic itself is not locked and can be swapped for a different pixel-art scene/character.
- Contact channels: email (juanignaciodelossantos01@gmail.com), GitHub, LinkedIn, X/Twitter.

## Evidence on Hand

- Real work history and project descriptions are already written into `src/i18n/messages/{en,es}.json` (GeoActio, EstacionAR, ActioTicket/Crombie AI Lead, Puma, Crombie website, prior industrial-engineering internship). Treat these as factual; do not invent additional employers, metrics, or testimonials.
- Live running/training stats via intervals.icu (real data, not placeholder).
- Existing blog posts: frontend technical interview notes (en), system design interview notes (es), an image-handling note (es).
- No testimonials, case studies, or press are on hand — do not fabricate any.

## Product Principles

1. Substance over decoration — the writing and work history carry the credibility; visuals should support scanability for a recruiter skimming quickly.
2. Bilingual parity — every surface and content decision must work for both en and es audiences, not just be translated as an afterthought.
3. Real data only — running stats, work history, and project claims come from real sources (intervals.icu, actual roles); never fabricate evidence.
4. Engineer-to-engineer credibility — blog content should read as genuinely useful technical writing, not resume filler.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
