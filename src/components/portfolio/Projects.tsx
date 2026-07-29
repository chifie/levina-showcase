import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "SokoDigital Marketplace",
    description:
      "A modern digital marketplace platform connecting buyers and sellers with seamless transactions, real-time messaging, and a beautiful user interface.",
    tech: ["React", "NestJS", "PostgreSQL", "TypeScript"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    color: "#d946ef",
    initials: "SM",
  },
  {
    title: "Glory Burger App",
    description:
      "A full-featured burger ordering application with custom menu builder, cart management, order tracking, and an admin dashboard for restaurant management.",
    tech: ["React", "FastAPI", "PostgreSQL", "Tailwind"],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    color: "#ec4899",
    initials: "GB",
  },
  {
    title: "Inventory Management System",
    description:
      "A comprehensive inventory tracking system with real-time stock updates, barcode scanning, supplier management, and detailed analytics reporting.",
    tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    color: "#8b5cf6",
    initials: "IM",
  },
  {
    title: "Portfolio Website",
    description:
      "Award-winning personal portfolio showcasing modern web development with GSAP animations, responsive design, and premium user experience.",
    tech: ["React", "GSAP", "Tailwind CSS", "TypeScript"],
    gradient: "from-fuchsia-400 via-pink-500 to-rose-500",
    color: "#d946ef",
    initials: "PW",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Horizontal scroll
      const cards = cardsWrapperRef.current;
      const container = containerRef.current;

      if (cards && container && !pinnedRef.current) {
        pinnedRef.current = true;

        const cardsWidth = cards.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = cardsWidth - viewportWidth;

        if (scrollDistance > 0) {
          gsap.to(cards, {
            x: -scrollDistance,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top top",
              end: () => `+=${scrollDistance + 200}`,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }
      }

      // Individual card reveals on mobile (fallback)
      if (window.innerWidth < 768) {
        const cardEls = cardsWrapperRef.current?.querySelectorAll("[data-project-card]");
        if (cardEls) {
          cardEls.forEach((card, i) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top 85%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 40 },
                  { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out" }
                );
              },
            });
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/5 blur-[120px]" />

      <div ref={containerRef} className="mx-auto max-w-6xl px-6">
        {/* Section header - always visible */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-500">
            Projects
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p
            data-anim
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            A selection of projects I&apos;ve built with passion and precision
          </p>
        </div>
      </div>

      {/* Desktop: Horizontal scroll area */}
      <div className="hidden md:block">
        <div
          ref={cardsWrapperRef}
          className="horizontal-scroll gap-8 px-6"
          style={{ paddingLeft: "calc((100vw - 72rem) / 2 + 1.5rem)", paddingRight: "calc((100vw - 72rem) / 2 + 1.5rem)" }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              data-project-card
              className="group w-[420px] flex-shrink-0 lg:w-[480px]"
            >
              <div className="relative overflow-hidden rounded-3xl glass-strong border border-fuchsia-500/10 shadow-elegant transition-all duration-500 hover:shadow-glow hover:-translate-y-2">
                {/* Project image area */}
                <div
                  className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.gradient} lg:h-64`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />

                  {/* Project initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-7xl font-bold text-white/90 drop-shadow-lg transition-all duration-500 group-hover:scale-110 lg:text-8xl">
                      {project.initials}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition-all duration-400 group-hover:opacity-100">
                    <a
                      href="#"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/40 hover:scale-110"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/40 hover:scale-110"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6 lg:p-7">
                  <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-fuchsia-500">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-3 py-1 text-[11px] font-medium"
                        style={{
                          background: `color-mix(in srgb, ${project.color} 12%, transparent)`,
                          color: project.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-5 flex gap-3">
                    <a
                      href="#"
                      className="flex-1 rounded-full bg-gradient-primary px-4 py-2.5 text-center text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
                    >
                      Live Demo
                    </a>
                    <a
                      href="#"
                      className="flex-1 rounded-full glass border border-fuchsia-500/20 px-4 py-2.5 text-center text-xs font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Grid layout */}
      <div className="mx-auto max-w-6xl px-6 md:hidden">
        <div className="grid gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              data-project-card
              className="group overflow-hidden rounded-3xl glass-strong border border-fuchsia-500/10 shadow-elegant transition-all duration-500 hover:shadow-glow"
              style={{ opacity: 0 }}
            >
              {/* Project image area */}
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-6xl font-bold text-white/90 drop-shadow-lg">
                    {project.initials}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-lg font-bold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{ background: `color-mix(in srgb, ${project.color} 12%, transparent)`, color: project.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <a href="#" className="flex-1 rounded-full bg-gradient-primary px-3 py-2 text-center text-xs font-semibold text-white">
                    Live Demo
                  </a>
                  <a href="#" className="flex-1 rounded-full glass border border-fuchsia-500/20 px-3 py-2 text-center text-xs font-semibold">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
