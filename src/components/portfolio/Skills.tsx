import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { SKILL_CATEGORIES } from "@/lib/skills";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";

gsap.registerPlugin(ScrollTrigger);

function SkillCard({
  name,
  icon: Icon,
  level,
  color,
  index,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  level: number;
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const bar = barRef.current;
    if (!card || !bar) return;

    if (prefersReducedMotion()) {
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      gsap.set(bar, { width: `${level}%` });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.04, ease: "power3.out" },
        );

        gsap.fromTo(
          bar,
          { width: "0%" },
          { width: `${level}%`, duration: 1, delay: 0.3 + index * 0.04, ease: "power2.out" },
        );
      },
    });

    return () => trigger.kill();
  }, [index, level]);

  return (
    <div
      ref={cardRef}
      className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-brand/5"
      style={{ opacity: 0 }}
    >
      <span
        className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
      >
        <Icon className="text-lg" />
      </span>
      <div className="flex-1 min-w-0">
        <div>
          <span className="text-sm font-medium truncate">{name}</span>
        </div>
        <div
          className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label={`${name} proficiency`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={level}
        >
          <div
            ref={barRef}
            className="h-full rounded-full transition-all"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}bb, ${color})`,
              backgroundSize: "200% 100%",
              width: "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal(headerRef);

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <div
              key={catIndex}
              className="card-elegant group relative overflow-hidden rounded-3xl p-6"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="mb-4 flex items-center gap-3 border-b border-border/40 pb-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <category.icon className="text-lg" />
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold">{category.title}</h3>
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
