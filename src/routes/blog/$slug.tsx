import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.post.title} — Levina Chifie`
      : "Article — Levina Chifie";
    const description =
      loaderData?.post.excerpt ?? "An article by Levina Chifie on software development.";
    const url = loaderData
      ? `https://levinachifie.dev/blog/${loaderData.post.slug}`
      : "https://levinachifie.dev/blog";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://levinachifie.dev/og-image.png" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: loaderData
            ? JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.post.title,
                description: loaderData.post.excerpt,
                datePublished: loaderData.post.date,
                author: {
                  "@type": "Person",
                  name: "Levina Chifie",
                  url: "https://levinachifie.dev",
                },
              })
            : "",
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Back to home">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm text-warm-ink font-bold shadow-warm transition-transform duration-300 group-hover:rotate-3">
              L
            </span>
            <span className="text-gradient font-heading text-lg font-bold tracking-tight">
              Levina Chifie
            </span>
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full glass border border-brand/20 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-brand/40 hover:text-brand"
          >
            <FaArrowLeft className="text-xs" />
            All articles
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <article className="card-elegant rounded-3xl p-8 md:p-12">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-warm-ink backdrop-blur-sm"
            style={{ background: `color-mix(in srgb, ${post.color} 30%, transparent)` }}
          >
            {post.category}
          </span>

          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FaCalendarAlt className="text-brand" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaClock className="text-brand" />
              {post.readTime}
            </span>
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

          <div className="space-y-5 leading-relaxed text-muted-foreground">
            {post.content.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "text-foreground text-base" : "text-sm"}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-10 text-center">
          <Link
            to="/"
            hash="blog"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-warm px-8 py-3.5 text-sm font-semibold text-warm-ink shadow-warm transition-all duration-300 hover:scale-105 hover:shadow-elegant"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
            Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
