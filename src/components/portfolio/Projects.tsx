import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { prefersReducedMotion } from "@/lib/motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "SokoDigital",
    description:
      "A modern marketplace platform for Tanzania connecting buyers and sellers with seamless transactions, product management, and a complete seller dashboard.",
    tech: ["React", "FastAPI", "PostgreSQL", "TypeScript"],
    gradient: "from-[#f4d35e] via-[#ee964b] to-[#f95738]",
    color: "#f95738",
    ink: "dark",
    initials: "SD",
    github: "https://github.com/chifie/SokoDigital_frontend",
    demo: "https://soko-digital-frontend.vercel.app",
  },
  {
    title: "DalaliMkononi",
    description:
      "A real estate marketplace platform for property listings, agent profiles, search filters, and seamless transaction management across Tanzania.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    gradient: "from-[#ee964b] via-[#f4d35e] to-[#f95738]",
    color: "#ee964b",
    ink: "dark",
    initials: "DM",
    github: "https://github.com",
    demo: "https://dalamaimkononi.com",
  },
  {
    title: "TanzaniaKiganjani",
    description:
      "A digital services platform connecting providers and clients for various services including consulting, delivery, and local business solutions.",
    tech: ["React", "NestJS", "MySQL", "Tailwind CSS"],
    gradient: "from-[#f95738] via-[#0d3b66] to-[#082a4c]",
    color: "#f95738",
    ink: "light",
    initials: "TK",
    github: "https://github.com",
    demo: "https://tanzaniakiganjani.com",
  },
  {
    title: "Glory Burger Website",
    description:
      "A restaurant website with a modern UI, online ordering system, menu management, and an intuitive customer experience for Glory Burger.",
    tech: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-[#f4d35e] via-[#ee964b] to-[#0d3b66]",
    color: "#ee964b",
    ink: "dark",
    initials: "GB",
    github: "https://github.com",
    demo: "https://gloryburger.com",
  },
  {
    title: "Glory Burger Mobile App",
    description:
      "A Flutter mobile application for food ordering with real-time cart management, order tracking, push notifications, and a seamless mobile dining experience.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    gradient: "from-[#0d3b66] via-[#ee964b] to-[#f4d35e]",
    color: "#f4d35e",
    ink: "dark",
    initials: "GM",
    github: "https://github.com",
    demo: "https://gloryburger.app",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated portfolio built with React, TypeScript, and GSAP featuring a navy blue and cream brand identity, smooth scroll animations, and a fully responsive layout.",
    tech: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    gradient: "from-[#0d3b66] via-[#2c4a6e] to-[#082a4c]",
    color: "#0d3b66",
    ink: "light",
    initials: "PW",
    github: "https://github.com/chifie/levina-showcase",
    demo: "https://levinachifie.dev",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal(headerRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (gridRef.current) {
          gsap.set(gridRef.current.querySelectorAll("[data-project-card]"), {
            opacity: 1,
            y: 0,
            scale: 1,
          });
        }
        return;
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
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="relative overflow-hidden py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          ref={headerRef}
          titleId="projects-title"
          eyebrow="Projects"
          title={
            <>
              Featured <span className="text-gradient italic">Work</span>
            </>
          }
          subtitle="A selection of projects I have built with passion and precision"
        />

        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              data-project-card
              className="card-elegant group relative flex h-full flex-col overflow-hidden rounded-3xl hover:border-brand/30"
            >
              <div
                className={`shine-sweep relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient} lg:h-48`}
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
                  <span
                    className={`font-heading text-6xl font-bold drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 lg:text-7xl ${
                      project.ink === "dark" ? "text-warm-ink" : "text-white"
                    }`}
                  >
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
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-1 w-10 rounded-full bg-gradient-warm transition-all duration-500 group-hover:w-16" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand/40 transition-colors duration-300 group-hover:text-brand/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-brand">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: `color-mix(in srgb, ${project.color} 12%, transparent)`,
                        color: `light-dark(color-mix(in srgb, ${project.color} 40%, #0d3b66), var(--brand))`,
                        borderColor: `color-mix(in srgb, ${project.color} 25%, transparent)`,
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
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <FaGithub className="text-sm" />
                        GitHub
                      </span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full bg-gradient-warm px-4 py-2.5 text-center text-xs font-semibold text-warm-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-warm"
                    >
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <FaExternalLinkAlt className="text-sm" />
                        Live Demo
                      </span>
                    </a>
                  )}
                </div>

                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-3xl bg-gradient-to-t from-brand/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
