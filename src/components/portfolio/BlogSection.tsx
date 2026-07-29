import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaCalendar, FaClock, FaTag } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: "Building Modern Web Apps with React and TypeScript",
    excerpt: "A comprehensive guide to setting up a scalable React project with TypeScript, best practices for type safety, and tips for maintainable code architecture.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Dev"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
  },
  {
    title: "The Power of GSAP: Creating Award-Winning Animations",
    excerpt: "Discover how to use GSAP ScrollTrigger and SplitText to create premium, performant web animations that captivate users and elevate your portfolio.",
    date: "Feb 28, 2026",
    readTime: "12 min read",
    tags: ["GSAP", "Animation", "Frontend"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    title: "Full-Stack Development: From Frontend to Backend",
    excerpt: "Exploring the journey from frontend to full-stack development, covering essential backend concepts, database design, and API architecture patterns.",
    date: "Jan 10, 2026",
    readTime: "10 min read",
    tags: ["Full-Stack", "Backend", "Architecture"],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    title: "Clean Code Principles Every Developer Should Know",
    excerpt: "Practical clean code practices that improve readability, maintainability, and collaboration. From naming conventions to design patterns.",
    date: "Dec 5, 2025",
    readTime: "6 min read",
    tags: ["Clean Code", "Best Practices"],
    gradient: "from-fuchsia-400 via-pink-500 to-rose-500",
  },
];

function ArticleCard({
  title,
  excerpt,
  date,
  readTime,
  tags,
  gradient,
  index,
}: {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  gradient: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, rotateX: 5 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.6, delay: index * 0.1, ease: "power3.out" }
        );
      },
    });
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="group overflow-hidden rounded-2xl glass-strong border border-fuchsia-500/10 shadow-elegant transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
      style={{ opacity: 0, perspective: "800px" }}
    >
      {/* Gradient header */}
      <div className={`relative h-2 bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <FaCalendar className="text-fuchsia-400" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <FaClock className="text-fuchsia-400" />
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-fuchsia-500">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 text-[10px] font-medium text-fuchsia-500"
            >
              <FaTag className="text-[8px]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-fuchsia-500 transition-all hover:gap-3"
        >
          Read Article
          <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("[data-anim]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
            scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" id="blog">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-14 text-center">
          <span data-anim className="inline-block rounded-full glass border border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-500">
            Writing
          </span>
          <h2 data-anim className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Thoughts & <span className="text-gradient">Articles</span>
          </h2>
          <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Insights, tutorials, and reflections on software development and technology
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((article, i) => (
            <ArticleCard key={i} {...article} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full glass-strong border border-fuchsia-500/20 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            View All Articles
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
