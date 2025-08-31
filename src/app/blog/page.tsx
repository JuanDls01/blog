import { BlogPosts } from "src/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-3xl tracking-tight text-neutral-100">
          My Blog
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Thoughts on software development, web performance, and the technologies I work with.
        </p>
      </div>
      <BlogPosts />
    </section>
  );
}
