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
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border border-brand/20 animate-spin-slow" />
              <div
                className="absolute -inset-8 rounded-full border border-brand/10 animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "30s" }}
              />
              <div className="relative h-72 w-64 overflow-hidden rounded-full bg-gradient-to-br from-brand-light to-brand-dark p-1 shadow-glow md:h-96 md:w-80">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
                  <img
                    src={chifieImage}
                    alt="Levina Chifie portrait"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: "center 35%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={contentRef}
            className="rounded-3xl glass-strong border border-brand/10 p-8 shadow-elegant lg:col-span-3 md:p-12"
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
                React and Next.js, to building robust back-end APIs with FastAPI and NestJS. My
                focus is on writing code that is not only functional but also performant, secure,
                and easy to maintain.
              </p>
              <p>
                Mobile development is another core strength. I build cross-platform mobile
                applications with Flutter and Dart, delivering native-quality experiences on both
                iOS and Android from a single codebase.
              </p>
              <p>
                I am passionate about solving challenging problems, staying current with emerging
                technologies, and continuously improving my craft. Whether it is architecting a new
                system, optimizing an existing codebase, or delivering pixel-perfect UI
                implementations, I approach every project with precision and dedication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
