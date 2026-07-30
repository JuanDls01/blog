import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { routing } from "src/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export type PostLocale = (typeof routing.locales)[number];

const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  publishedAt: z
    .union([z.string(), z.date()])
    .transform((value) =>
      value instanceof Date ? value.toISOString().split("T")[0] : value,
    )
    .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}/, "expected YYYY-MM-DD")),
  published: z.boolean().default(false),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type PostMetadata = z.infer<typeof frontmatterSchema>;

export type Post = {
  slug: string;
  /** Locale the content is actually written in (may differ from the requested one) */
  locale: PostLocale;
  /** True when the requested locale had no translation and another one is shown */
  isFallback: boolean;
  metadata: PostMetadata;
  content: string;
};

// Post files are named <slug>.<locale>.mdx, e.g. my-post.en.mdx
const FILE_PATTERN = /^(?<slug>.+)\.(?<locale>[a-z]{2})\.mdx$/;

// Drafts (published: false) render in `next dev` for previewing while writing,
// but are excluded from production builds, the sitemap and static params.
const showDrafts = process.env.NODE_ENV === "development";

function readPostFile(file: string): Post | null {
  const match = FILE_PATTERN.exec(file);
  if (!match?.groups) {
    throw new Error(
      `Invalid post filename "${file}": expected <slug>.<locale>.mdx (e.g. my-post.en.mdx)`,
    );
  }

  const { slug, locale } = match.groups;
  if (!routing.locales.includes(locale as PostLocale)) {
    throw new Error(
      `Post "${file}" uses unknown locale "${locale}". Known locales: ${routing.locales.join(", ")}`,
    );
  }

  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in "${file}":\n${issues}`);
  }

  if (!parsed.data.published && !showDrafts) {
    return null;
  }

  return {
    slug,
    locale: locale as PostLocale,
    isFallback: false,
    metadata: parsed.data,
    content: content.trim(),
  };
}

function getAllPosts(): Post[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPostFile)
    .filter((post): post is Post => post !== null);
}

/**
 * Posts for a locale, newest first. When a post has no translation in the
 * requested locale, the existing variant is returned with `isFallback: true`.
 */
export function getBlogPosts(locale: PostLocale): Post[] {
  const bySlug = new Map<string, Post[]>();
  for (const post of getAllPosts()) {
    const variants = bySlug.get(post.slug) ?? [];
    variants.push(post);
    bySlug.set(post.slug, variants);
  }

  return Array.from(bySlug.values())
    .map((variants) => {
      const exact = variants.find((v) => v.locale === locale);
      return exact ?? { ...variants[0], isFallback: true };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );
}

export function getPost(slug: string, locale: PostLocale): Post | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return Array.from(new Set(getAllPosts().map((post) => post.slug)));
}

export function formatDate(date: string, locale: PostLocale = "en") {
  const target = date.includes("T")
    ? new Date(date)
    : new Date(`${date}T00:00:00`);
  return target.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
