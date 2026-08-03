import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import type { Skill } from "@/lib/skills";

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps extends Skill {
  index: number;
}

export default function SkillCard({ name, icon: Icon, level, color, index }: SkillCardProps) {
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
        aria-hidden="true"
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
