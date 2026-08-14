import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { prefersReducedMotion } from "@/lib/motion";
import { PROJECTS, type Project } from "@/lib/projects";
import SectionHeader from "@/components/portfolio/SectionHeader";
import ProjectCardHeader from "@/components/portfolio/ProjectCardHeader";
import ProjectLightbox from "@/components/portfolio/ProjectLightbox";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<Project | null>(null);

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
          eyebrow={t("projects.eyebrow")}
          title={
            <>
              {t("projects.titleA")}{" "}
              <span className="text-gradient italic">{t("projects.titleB")}</span>
            </>
          }
          subtitle={t("projects.subtitle")}
        />

        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-warm" aria-hidden="true" />
            {t("projects.count", { count: PROJECTS.length })}
          </span>
        </div>

        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              data-project-card
              className="card-elegant group relative flex h-full flex-col overflow-hidden rounded-3xl hover:border-brand/30"
            >
              <ProjectCardHeader
                project={project}
                onExpand={project.screenshot ? () => setLightbox(project) : undefined}
              />

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
                      aria-label={t("projects.githubAria", { title: project.title })}
                      className="flex-1 rounded-full glass border border-brand/20 px-4 py-2.5 text-center text-xs font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <FaGithub className="text-sm" />
                        {t("projects.github")}
                      </span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("projects.demoAria", { title: project.title })}
                      className="flex-1 rounded-full bg-gradient-warm px-4 py-2.5 text-center text-xs font-semibold text-warm-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-warm focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <FaExternalLinkAlt className="text-sm" />
                        {t("projects.liveDemo")}
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

      {lightbox && <ProjectLightbox project={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
