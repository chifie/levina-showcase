import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { prefersReducedMotion } from "@/lib/motion";
import { PROJECTS } from "@/lib/projects";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";

gsap.registerPlugin(ScrollTrigger);

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

        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-warm" aria-hidden="true" />
            {PROJECTS.length} featured projects
          </span>
        </div>

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
                {project.screenshot ? (
                  <img
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110 select-none"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
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
                  </>
                )}
                {project.mobileScreenshot && (
                  <div
                    className="absolute right-4 bottom-4 w-[72px] overflow-hidden rounded-[1.05rem] border-2 border-white/70 shadow-lg transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:border-white sm:w-[84px]"
                    aria-hidden="true"
                  >
                    <span className="absolute left-1/2 top-1.5 z-10 h-1 w-5 -translate-x-1/2 rounded-full bg-white/70" />
                    <img
                      src={project.mobileScreenshot}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="block w-full select-none object-cover object-top"
                      style={{ aspectRatio: "9 / 18" }}
                    />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub className="text-lg" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={`View ${project.title} live demo`}
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
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="flex-1 rounded-full glass border border-brand/20 px-4 py-2.5 text-center text-xs font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow focus-visible:outline-2 focus-visible:outline-offset-2"
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
                      aria-label={`View ${project.title} live demo`}
                      className="flex-1 rounded-full bg-gradient-warm px-4 py-2.5 text-center text-xs font-semibold text-warm-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-warm focus-visible:outline-2 focus-visible:outline-offset-2"
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
