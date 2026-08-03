import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { SKILL_CATEGORIES } from "@/lib/skills";
import SectionHeader from "@/components/portfolio/SectionHeader";
import SkillCard from "@/components/portfolio/SkillCard";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal(headerRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (gridRef.current) {
          gsap.set(gridRef.current.querySelectorAll("[data-category-card]"), {
            opacity: 1,
            y: 0,
          });
        }
        return;
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll("[data-category-card]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-title"
      className="relative py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/5 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-1/3 h-72 w-72 translate-x-1/2 rounded-full bg-brand-light/5 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          ref={headerRef}
          titleId="skills-title"
          eyebrow="Skills"
          title={
            <>
              Technical <span className="text-gradient italic">Competencies</span>
            </>
          }
          subtitle="A comprehensive set of tools and technologies I work with to deliver high-quality software products"
        />

        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-warm" aria-hidden="true" />
            {SKILL_CATEGORIES.reduce((sum, category) => sum + category.skills.length, 0)}{" "}
            technologies across {SKILL_CATEGORIES.length} categories
          </span>
        </div>

        <div ref={gridRef} className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <div
              key={catIndex}
              data-category-card
              aria-labelledby={`skills-category-${catIndex}-title`}
              className="card-elegant group relative flex h-full flex-col overflow-hidden rounded-3xl p-6"
              style={{ opacity: 0 }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="mb-4 flex items-center gap-3 border-b border-border/40 pb-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm text-warm-ink shadow-warm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <category.icon className="text-lg" />
                </span>
                <div className="flex-1">
                  <h3
                    id={`skills-category-${catIndex}-title`}
                    className="font-heading text-lg font-bold"
                  >
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {category.skills.length} technologies
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {category.skills.map((skill, i) => (
                  <SkillCard key={i} {...skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
