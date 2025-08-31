import Link from "next/link";
import { formatDate, getBlogPosts } from "src/app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div className="space-y-4">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <article key={post.slug} className="group">
            <Link
              className="block p-4 -m-4 rounded-xl border border-transparent 
                         hover:border-neutral-700/50 hover:bg-neutral-800/20
                         transition-all duration-300 ease-out"
              href={`/blog/${post.slug}`}
            >
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-neutral-100 font-medium tracking-tight text-lg 
                                 group-hover:text-white transition-colors duration-200">
                    {post.metadata.title}
                  </h3>
                  <time className="text-neutral-400 text-sm tabular-nums shrink-0
                                   group-hover:text-neutral-300 transition-colors duration-200">
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                </div>
                
                {post.metadata.summary && (
                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2
                                group-hover:text-neutral-300 transition-colors duration-200">
                    {post.metadata.summary}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500 group-hover:text-neutral-400 
                                   transition-colors duration-200">
                    Read more
                  </span>
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="currentColor" 
                    className="text-neutral-500 group-hover:text-neutral-400 
                               group-hover:translate-x-0.5 transition-all duration-200"
                  >
                    <path d="M3.5 3V4H8.086L2.5 9.586L3.414 10.5L9 4.914V9.5H10V3H3.5Z"/>
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        ))}
    </div>
  );
}
