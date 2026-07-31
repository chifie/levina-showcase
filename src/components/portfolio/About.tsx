import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import chifieImage from "@/assets/chifie.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (photoRef.current) {
          gsap.set(photoRef.current, { opacity: 1, x: 0, scale: 1 });
        }
        return;
      }

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

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: -40, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photoRef.current,
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
    <section id="about" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark"
          >
            About
          </span>
          <div data-anim className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-primary" />
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Crafting Code with <span className="text-gradient italic">Purpose</span>
          </h2>
          <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Building high-quality software that solves real problems and delivers exceptional user
            experiences
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div ref={photoRef} className="mx-auto lg:col-span-2" style={{ opacity: 0 }}>
            <div className="group relative">
              <div
                className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[70px]"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-5 rounded-full animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(108,122,148,0.5) 55deg, transparent 140deg, rgba(159,176,196,0.4) 220deg, transparent 300deg, rgba(108,122,148,0.45) 360deg)",
                  animationDuration: "14s",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute -inset-10 rounded-full border border-dashed border-brand/20 animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "40s" }}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/70 shadow-glow" />
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light/70" />
                <span className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-dark/50" />
                <span className="absolute left-1/2 bottom-0 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand/40" />
              </div>
              <div
                className="relative h-72 w-64 overflow-hidden rounded-full p-[3px] shadow-glow transition-transform duration-500 hover:scale-[1.02] md:h-96 md:w-80"
                style={{ background: "linear-gradient(160deg, #8fa0b8, #4a5a72, #8fa0b8)" }}
              >
                <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
                  <img
                    src={chifieImage}
                    alt="Levina Chifie portrait"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: "center 35%" }}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={contentRef}
            className="relative overflow-hidden rounded-3xl glass-strong border border-brand/10 p-8 shadow-elegant lg:col-span-3 md:p-12"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute right-8 top-6 font-heading text-7xl font-bold text-brand/5 select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-heading text-2xl font-semibold">
              I&apos;m a dedicated Full Stack Software Developer
              <span className="inline-block animate-float-fast">⚡</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Web Development", "Mobile Development", "API Design", "UI Implementation"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full glass border border-brand/20 px-3.5 py-1.5 text-[11px] font-medium text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/10 hover:border-brand/40"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With a strong foundation in software engineering, I specialize in building modern,
                scalable web and mobile applications. I transform complex requirements into clean,
                maintainable code and intuitive user interfaces that users love.
              </p>
              <p>
                I work across the entire stack — from designing polished front-end experiences with
                React and Next.js, to building robust back-end APIs with FastAPI and NestJS. My
                focus is on writing code that is not only functional but also performant, secure,
                and easy to maintain.
              </p>
              <p>
                Mobile development is another core strength. I build cross-platform mobile
                applications with Flutter and Dart, delivering native-quality experiences on both
                iOS and Android from a single codebase.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Full Stack", detail: "Web + Mobile + API" },
                { title: "Clean Code", detail: "Tested & Maintainable" },
                { title: "User First", detail: "Polished Experiences" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl glass border border-brand/10 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-brand/30"
                >
                  <div className="font-heading text-sm font-bold text-brand">{item.title}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
