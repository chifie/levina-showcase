import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaRocket, FaGraduationCap, FaHeart } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 10, suffix: "+", label: "Projects Completed", Icon: FaCode },
  { value: 12, suffix: "", label: "Technologies", Icon: FaRocket },
  { value: 500, suffix: "+", label: "GitHub Contributions", Icon: FaGraduationCap },
  { value: 3, suffix: "+", label: "Years Learning", Icon: FaHeart },
];

const TIMELINE = [
  {
    year: "2024 - Present",
    title: "Computer Science Student",
    subtitle: "University",
    desc: "Pursuing a degree in Computer Science, building a strong foundation in algorithms, data structures, and software engineering principles.",
    side: "left",
  },
  {
    year: "2024",
    title: "Full-Stack Development",
    subtitle: "Self-Taught Journey",
    desc: "Deep diving into modern web development with React, Next.js, TypeScript, Tailwind CSS, and backend technologies like NestJS and PostgreSQL.",
    side: "right",
  },
  {
    year: "2023",
    title: "Started Coding Journey",
    subtitle: "First Steps",
    desc: "Began learning programming with Python and PHP, building my first web applications and discovering my passion for software development.",
    side: "left",
  },
  {
    year: "2022",
    title: "First Project",
    subtitle: "Getting Started",
    desc: "Built my first complete web project and realized the power of technology to solve real-world problems. This marked the beginning of my development journey.",
    side: "right",
  },
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

        // Animate the card in
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: "power3.out" }
        );

        // Animate counter
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
          }
        );
      },
    });

    return () => trigger.kill();
  }, [value, suffix, index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl glass-strong border border-orange-500/10 p-7 shadow-elegant transition-all duration-300 hover:shadow-glow"
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

function TimelineItem({
  year,
  title,
  subtitle,
  desc,
  side,
  index,
}: {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  side: "left" | "right";
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    const dot = dotRef.current;
    if (!item || !dot) return;

    const trigger = ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: side === "left" ? -40 : 40,
            y: 20,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
          }
        );

        gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, delay: index * 0.1 + 0.2, ease: "back.out(2)" });
      },
    });

    return () => trigger.kill();
  }, [side, index]);

  return (
    <div
      ref={itemRef}
      className="relative mb-10 pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
      style={{ opacity: 0 }}
    >
      {/* Desktop: alternate sides */}
      <div className={side === "right" ? "md:col-start-2" : "md:col-start-1 md:text-right"}>
        <div className="rounded-2xl glass-strong border border-orange-500/10 p-6 shadow-elegant transition-all duration-300 hover:shadow-glow">
          <span className="inline-block rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-white shadow-glow">
            {year}
          </span>
          <h3 className="mt-3 font-heading text-xl font-bold">{title}</h3>
          <p className="text-sm font-medium text-orange-500">{subtitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>

      {/* Dot on timeline */}
      <div
        ref={dotRef}
        className="absolute left-0 top-6 z-10 h-4 w-4 rounded-full border-2 border-orange-500 bg-background md:left-1/2 md:-translate-x-1/2"
        style={{ scale: 0 }}
      />
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
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
          }
        );
      }

      // About content reveal
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
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-orange-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-orange-500"
          >
            About
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Crafting Code with{" "}
            <span className="text-gradient">Creativity</span>
          </h2>
          <p
            data-anim
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            A passionate developer on a mission to build meaningful digital experiences
          </p>
        </div>

        {/* About content */}
        <div
          ref={contentRef}
          className="mx-auto mb-20 max-w-4xl rounded-3xl glass-strong border border-orange-500/10 p-8 shadow-elegant md:p-12"
        >
          <p className="font-heading text-2xl font-semibold">
            Hello, I&apos;m Levina Chifie{" "}
            <span className="inline-block animate-float-fast">✨</span>
          </p>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A passionate Computer Science student with a deep love for technology, creativity,
              and modern web development. I enjoy transforming ideas into beautiful, responsive,
              and interactive digital experiences that feel both elegant and functional.
            </p>
            <p>
              I specialize in building scalable web applications using modern technologies like{" "}
              <span className="font-medium text-foreground">
                React, Next.js, TypeScript, Node.js, NestJS, and PostgreSQL
              </span>
              . My approach combines clean architecture with pixel-perfect design.
            </p>
            <p>
              Currently focused on deepening my expertise in{" "}
              <span className="font-medium text-foreground">
                System Design, Software Architecture, and DevOps
              </span>
              , I&apos;m always exploring new ways to write cleaner, more maintainable code.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me learning new technologies, contributing
              to open source, or working on creative side projects that push my boundaries.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <div className="mb-12 text-center">
            <h3 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              My <span className="text-gradient">Journey</span>
            </h3>
            <p className="mt-2 text-muted-foreground">The path that brought me here</p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-orange-500/50 via-orange-500/30 to-transparent md:left-1/2 md:-translate-x-px" />

            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
