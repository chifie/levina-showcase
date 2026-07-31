import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "SokoDigital",
    description:
      "A modern marketplace platform for Tanzania connecting buyers and sellers with seamless transactions, product management, and a complete seller dashboard.",
    tech: ["React", "FastAPI", "PostgreSQL", "TypeScript"],
    gradient: "from-slate-400 via-slate-500 to-slate-700",
    color: "#64748b",
    initials: "SD",
    github: "https://github.com",
    demo: "https://sokodigital.com",
  },
  {
    title: "DalaliMkononi",
    description:
      "A real estate marketplace platform for property listings, agent profiles, search filters, and seamless transaction management across Tanzania.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    gradient: "from-slate-600 via-slate-700 to-slate-900",
    color: "#475569",
    initials: "DM",
    github: "https://github.com",
    demo: "https://dalamaimkononi.com",
  },
  {
    title: "TanzaniaKiganjani",
    description:
      "A digital services platform connecting providers and clients for various services including consulting, delivery, and local business solutions.",
    tech: ["React", "NestJS", "MySQL", "Tailwind CSS"],
    gradient: "from-blue-500 via-slate-600 to-slate-800",
    color: "#3b82f6",
    initials: "TK",
    github: "https://github.com",
    demo: "https://tanzaniakiganjani.com",
  },
  {
    title: "Glory Burger Website",
    description:
      "A restaurant website with a modern UI, online ordering system, menu management, and an intuitive customer experience for Glory Burger.",
    tech: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-slate-500 via-slate-600 to-slate-800",
    color: "#5b6b84",
    initials: "GB",
    github: "https://github.com",
    demo: "https://gloryburger.com",
  },
  {
    title: "Glory Burger Mobile App",
    description:
      "A Flutter mobile application for food ordering with real-time cart management, order tracking, push notifications, and a seamless mobile dining experience.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    gradient: "from-slate-300 via-slate-400 to-slate-600",
    color: "#94a3b8",
    initials: "GM",
    github: "https://github.com",
    demo: "https://gloryburger.app",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated portfolio built with React, TypeScript, and GSAP featuring a slate-blue brand identity, smooth scroll animations, and a fully responsive layout.",
    tech: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    color: "#334155",
    initials: "PW",
    github: "https://github.com/chifie/levina-showcase",
    demo: "https://levinachifie.dev",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-project-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
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
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark"
          >
            Projects
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A selection of projects I have built with passion and precision
          </p>
        </div>

        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              data-project-card
              className="group flex h-full flex-col overflow-hidden rounded-3xl glass-strong border border-brand/10 shadow-elegant transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
            >
              <div
                className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient} lg:h-48`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div
                  className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-6xl font-bold text-white/90 drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 lg:text-7xl">
                    {project.initials}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-brand">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

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

                <div className="mt-5 flex gap-3 border-t border-brand/10 pt-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full glass border border-brand/20 px-4 py-2.5 text-center text-xs font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full bg-gradient-primary px-4 py-2.5 text-center text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
