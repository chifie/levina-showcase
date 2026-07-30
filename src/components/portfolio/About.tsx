import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaRocket } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 10, suffix: "+", label: "Projects Delivered", Icon: FaCode },
  { value: 8, suffix: "", label: "Technologies Mastered", Icon: FaRocket },
  { value: 500, suffix: "+", label: "Commits on GitHub", Icon: FaCode },
  { value: 3, suffix: "+", label: "Years of Development", Icon: FaRocket },
];

function StatCard({
  value,
  suffix,
  label,
  Icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const numberEl = numberRef.current;
    if (!card || !numberEl) return;

    let animated = false;

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (animated) return;
        animated = true;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: "power3.out" },
        );

        gsap.fromTo(
          numberEl,
          { textContent: 0 },
          {
            textContent: value,
            duration: 1.5,
            delay: 0.3 + index * 0.1,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: () => {
              const current = parseInt(numberEl.textContent || "0");
              numberEl.textContent = current + suffix;
            },
          },
        );
      },
    });

    return () => trigger.kill();
  }, [value, suffix, index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl glass-strong border border-fuchsia-500/10 p-7 shadow-elegant transition-all duration-300 hover:shadow-glow"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
      <div className="relative">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-glow mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="text-lg" />
        </span>
        <div className="font-heading text-4xl font-bold text-gradient md:text-5xl">
          <span ref={numberRef}>0</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("[data-anim]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll("[data-stat]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-fuchsia-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-500"
          >
            About
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Crafting Code with <span className="text-gradient">Purpose</span>
          </h2>
          <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Building high-quality software that solves real problems and delivers exceptional user
            experiences
          </p>
        </div>

        <div
          ref={contentRef}
          className="mx-auto mb-20 max-w-4xl rounded-3xl glass-strong border border-fuchsia-500/10 p-8 shadow-elegant md:p-12"
        >
          <p className="font-heading text-2xl font-semibold">
            I&apos;m a dedicated Full Stack Software Developer
            <span className="inline-block animate-float-fast">⚡</span>
          </p>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              With a strong foundation in software engineering, I specialize in building modern,
              scalable web and mobile applications. I transform complex requirements into clean,
              maintainable code and intuitive user interfaces that users love.
            </p>
            <p>
              I work across the entire stack — from designing polished front-end experiences with
              React and Next.js, to building robust back-end APIs with FastAPI and NestJS. My focus
              is on writing code that is not only functional but also performant, secure, and easy
              to maintain.
            </p>
            <p>
              Mobile development is another core strength. I build cross-platform mobile
              applications with Flutter and Dart, delivering native-quality experiences on both iOS
              and Android from a single codebase.
            </p>
            <p>
              I am passionate about solving challenging problems, staying current with emerging
              technologies, and continuously improving my craft. Whether it is architecting a new
              system, optimizing an existing codebase, or delivering pixel-perfect UI
              implementations, I approach every project with precision and dedication.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
