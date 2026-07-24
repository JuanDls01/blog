import { formatDate, getBlogPosts } from "src/app/blog/utils";
import { SpotlightRow, RowArrow } from "src/components/spotlight-row";

export function BlogPosts() {
  const allBlogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <ul className="flex flex-col -mx-3">
      {allBlogs.map((post) => (
        <li key={post.slug}>
          <SpotlightRow href={`/blog/${post.slug}`}>
            <span className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[14.5px] font-medium">
                {post.metadata.title} <RowArrow />
              </span>
              {post.metadata.summary && (
                <span className="block text-[13.5px] text-muted mt-0.5 line-clamp-2">
                  {post.metadata.summary}
                </span>
              )}
            </span>
            <time className="text-[13px] text-faint tabular-nums whitespace-nowrap">
              {formatDate(post.metadata.publishedAt, false)}
            </time>
          </SpotlightRow>
        </li>
      ))}
    </ul>
  );
}
