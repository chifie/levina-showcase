import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";
import { prefersReducedMotion } from "@/lib/motion";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-posts";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";

gsap.registerPlugin(ScrollTrigger);

function PostCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  color,
  index,
}: {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (prefersReducedMotion()) {
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
      },
    });

    return () => trigger.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="card-elegant group flex h-full flex-col overflow-hidden rounded-3xl hover:border-brand/30"
      style={{ opacity: 0 }}
    >
      <div
        className="shine-sweep relative h-40 overflow-hidden lg:h-44"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
      >
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <span
          className="absolute right-5 top-5 font-heading text-4xl font-bold text-warm-ink/15 transition-colors duration-500 group-hover:text-warm-ink/30 select-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute left-5 top-5 rounded-full bg-warm-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-warm-ink backdrop-blur-sm">
          {category}
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-heading text-6xl font-bold italic text-warm-ink/90 drop-shadow-lg transition-all duration-500 group-hover:scale-110 lg:text-7xl">
          “
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="mb-3 h-1 w-10 rounded-full bg-gradient-warm transition-all duration-500 group-hover:w-16" />
        <h3 className="font-heading text-xl font-bold leading-snug transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <FaCalendarAlt className="text-brand" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaClock className="text-brand" />
            {readTime}
          </span>
        </div>

        <div className="mt-5 flex gap-3 border-t border-brand/10 pt-5">
          <a
            href="#blog"
            onClick={(e) => e.preventDefault()}
            className="flex-1 rounded-full glass border border-brand/20 px-4 py-2.5 text-center text-xs font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal(headerRef);

  return (
    <section
      id="blog"
      ref={sectionRef}
      aria-labelledby="blog-title"
      className="relative overflow-hidden py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 translate-x-1/2 rounded-full bg-brand/5 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          ref={headerRef}
          titleId="blog-title"
          eyebrow="Blog"
          title={
            <>
              Thoughts &amp; <span className="text-gradient italic">Insights</span>
            </>
          }
          subtitle="Articles on software development, design, and the craft of building great products"
        >
          <div data-anim className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/10 hover:border-brand/40"
              >
                {category}
              </span>
            ))}
          </div>
        </SectionHeader>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {BLOG_POSTS.map((post, i) => (
            <PostCard key={i} {...post} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#blog"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-warm px-8 py-3.5 text-sm font-semibold text-warm-ink shadow-warm transition-all duration-300 hover:scale-105 hover:shadow-elegant"
          >
            View All Articles
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
