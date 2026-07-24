import { BlogPosts } from "src/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="reveal">
      <h1 className="text-[19px] font-semibold tracking-[-0.01em]">Blog</h1>
      <p className="text-muted mt-3 mb-8">
        Thoughts on software development, web performance, and the technologies
        I work with.
      </p>
      <BlogPosts />
    </section>
  );
}
