# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (runs on localhost:3000)
- `npm run build` - Build the production application
- `npm start` - Start production server

## Architecture Overview

This is a Next.js 14+ portfolio/blog site using the App Router with the following structure:

### Core Technologies

- **Next.js (canary)** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **MDX** for blog content via next-mdx-remote
- **Geist font** (sans and mono variants)
- **Vercel Analytics & Speed Insights**

### Key Architecture Patterns

**Blog System:**

- Blog posts are MDX files stored in `src/content/`
- Each MDX file has frontmatter with `title`, `publishedAt`, `summary`, and optional `image`
- Blog utilities in `src/app/blog/utils.ts` handle parsing frontmatter and file reading
- Dynamic routes use `[slug]/page.tsx` pattern with `generateStaticParams()`

**Content Structure:**

- `src/app/blog/utils.ts` - Core blog utilities (getBlogPosts, formatDate, parseFrontmatter)
- `src/components/posts.tsx` - BlogPosts component that renders sorted blog list
- `src/components/mdx.tsx` - CustomMDX component for rendering blog content
- Blog posts automatically generate SEO metadata, JSON-LD schema, and OG images

**Layout & Navigation:**

- Root layout in `src/app/layout.tsx` includes global metadata, fonts, and analytics
- Navigation component in `src/components/nav.tsx`
- Footer component in `src/components/footer.tsx`
- Max-width container with responsive margin (max-w-xl, mx-4 on mobile, lg:mx-auto on desktop)

**SEO & Performance:**

- Comprehensive SEO setup with metadata, robots.txt, sitemap
- Dynamic OG image generation at `/og` route
- RSS feed support
- Schema.org JSON-LD for blog posts
- Optimized for Core Web Vitals

### File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages and utilities
│   ├── work/              # Work/portfolio page
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── mdx.tsx           # MDX renderer
│   ├── nav.tsx           # Navigation
│   ├── posts.tsx         # Blog post list
│   └── footer.tsx        # Site footer
└── content/              # MDX blog posts
```

### Adding Blog Posts

Create new `.mdx` files in `src/content/` with frontmatter:

```yaml
---
title: "Post Title"
publishedAt: "2024-01-01"
summary: "Brief description"
image: "/path/to/image" # optional
---
```

The system automatically handles routing, metadata generation, and listing.

## RULES

- NEVER write code without concrete functionality
- NEVER mention Claude in commits
- ALWAYS apply ESLint + Prettier
