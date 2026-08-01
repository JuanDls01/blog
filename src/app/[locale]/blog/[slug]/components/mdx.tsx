import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createElement } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { highlightCode } from "@/lib/shiki";
import { CopyButton } from "./copy";
import { Callout, Note, Tip, Warning, Danger, Info, Success } from "./callout";
import { cn, slugify } from "@/lib/utils";

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function flattenChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(flattenChildren).join("");
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    (children as React.ReactElement<{ children?: React.ReactNode }>).props
  ) {
    return flattenChildren(
      (children as React.ReactElement<{ children?: React.ReactNode }>).props.children
    );
  }
  return "";
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children, ...props }: { children?: React.ReactNode }) => {
    const slug = slugify(flattenChildren(children));
    return createElement(
      `h${level}`,
      { id: slug, className: "scroll-mt-20", ...props },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
          "aria-label": `Link to ${slug}`,
        }),
        children,
      ]
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

interface PreProps {
  children?: React.ReactNode;
}

// Server component: highlights fenced code blocks with Shiki at render time
async function Pre({ children }: PreProps) {
  const codeElement = children as
    | React.ReactElement<{ className?: string; children?: string }>
    | undefined;

  const rawCode =
    typeof codeElement?.props?.children === "string"
      ? codeElement.props.children.replace(/\n$/, "")
      : flattenChildren(children);
  const language =
    codeElement?.props?.className?.replace("language-", "") ?? "text";

  const html = await highlightCode(rawCode, language);

  return (
    <div className="relative group my-6">
      <CopyButton code={rawCode} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function RoundedImage({
  alt,
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      alt={alt ?? ""}
      className={cn(
        "rounded-lg my-6 mx-auto outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10",
        className
      )}
      {...props}
    />
  );
}

// Plain markdown images (![alt](src)) have no intrinsic size, so they can't go
// through next/image — use <Image> directly in MDX when dimensions are known.
function MarkdownImage({
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      loading="lazy"
      className={cn(
        "rounded-lg my-6 mx-auto max-w-full outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10",
        className
      )}
      {...props}
    />
  );
}

// Horizontal scroll for wide tables — overflow-x doesn't work on <table> itself
function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  );
}

// Quiet in-post table of contents: wrap a markdown list of anchor links
function Toc({ children }: { children: React.ReactNode }) {
  return (
    <nav className="toc" aria-label="Table of contents">
      {children}
    </nav>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  pre: Pre,
  table: Table,
  Image: RoundedImage,
  img: MarkdownImage,
  Toc,
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Info,
  Success,
};

interface MDXProps {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function CustomMDX({ source, components: customComponents }: MDXProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        // Our MDX comes from this repo, not from users — allow JSX expressions
        // like width={800} (next-mdx-remote v6 strips them by default)
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
      components={{ ...components, ...(customComponents || {}) }}
    />
  );
}
