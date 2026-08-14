import { createFileRoute, Link } from "@tanstack/react-router";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-posts";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Articles — Levina Chifie" },
      {
        name: "description",
        content:
          "Articles by Levina Chifie on software development, mobile engineering with Flutter, REST API design with FastAPI, and interface design.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Articles — Levina Chifie" },
      {
        property: "og:description",
        content:
          "Articles by Levina Chifie on software development, mobile engineering, REST API design, and interface design.",
      },
      { property: "og:url", content: "https://levinachifie.dev/blog" },
      { property: "og:image", content: "https://levinachifie.dev/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://levinachifie.dev/blog" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Back to home">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm text-warm-ink font-bold shadow-warm transition-transform duration-300 group-hover:rotate-3">
              L
            </span>
            <span className="text-gradient font-heading text-lg font-bold tracking-tight">
              Levina Chifie
            </span>
          </Link>
          <Link
            to="/"
            hash="contact"
            className="rounded-full glass border border-brand/20 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-brand/40 hover:text-brand"
          >
            {t("blog.contact")}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark">
            {t("blog.eyebrow")}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            {t("blog.titleA")} <span className="text-gradient italic">{t("blog.titleB")}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("blog.subtitle")}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium text-brand-dark"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="card-elegant group flex h-full flex-col overflow-hidden rounded-3xl hover:border-brand/30"
            >
              <div
                className="relative h-40 overflow-hidden lg:h-44"
                style={{ background: `linear-gradient(135deg, ${post.color}, ${post.color}88)` }}
              >
                <span className="absolute left-5 top-5 rounded-full bg-warm-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-warm-ink backdrop-blur-sm">
                  {post.category}
                </span>
                <span className="absolute inset-0 flex items-center justify-center font-heading text-6xl font-bold italic text-warm-ink/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110 lg:text-7xl">
                  “
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-warm transition-all duration-500 group-hover:w-16" />
                <h2 className="font-heading text-xl font-bold leading-snug transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>

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

                <span className="mt-5 inline-flex items-center gap-2 border-t border-brand/10 pt-5 text-xs font-semibold text-brand">
                  {t("blog.readArticle")}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
