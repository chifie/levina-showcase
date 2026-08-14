import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import chifieImage from "@/assets/chifie.webp";
import SectionHeader from "@/components/portfolio/SectionHeader";
import OrbitRing from "@/components/portfolio/OrbitRing";
import { useSectionHeaderReveal } from "@/hooks/use-section-header-reveal";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useSectionHeaderReveal(headerRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (photoRef.current) {
          gsap.set(photoRef.current, { opacity: 1, x: 0, scale: 1 });
        }
        return;
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            clearProps: "transform",
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
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-title"
      className="relative py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/5 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          ref={headerRef}
          titleId="about-title"
          eyebrow={t("about.eyebrow")}
          title={
            <>
              {t("about.titleA")} <span className="text-gradient italic">{t("about.titleB")}</span>
            </>
          }
          subtitle={t("about.subtitle")}
        />

        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div ref={photoRef} className="mx-auto lg:col-span-2" style={{ opacity: 0 }}>
            <div className="group relative">
              <div
                className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[70px]"
                aria-hidden="true"
              />
              <OrbitRing />
              <div
                className="relative h-72 w-64 overflow-hidden rounded-full p-[3px] shadow-glow transition-transform duration-500 hover:scale-[1.02] md:h-96 md:w-80"
                style={{ background: "linear-gradient(160deg, #3e5f8e, #0d3b66, #3e5f8e)" }}
              >
                <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
                  <img
                    src={chifieImage}
                    alt={t("about.alt")}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={384}
                    style={{ objectPosition: "center 35%" }}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={contentRef}
            className="card-elegant relative overflow-hidden rounded-3xl p-8 lg:col-span-3 md:p-12"
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
              {t("about.intro")}
              <span className="inline-block animate-float-fast">⚡</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(
                ["about.tag.web", "about.tag.mobile", "about.tag.api", "about.tag.ui"] as const
              ).map((key) => (
                <span
                  key={key}
                  className="rounded-full glass border border-brand/20 px-3.5 py-1.5 text-[11px] font-medium text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/10 hover:border-brand/40"
                >
                  {t(key)}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {(
                [
                  { titleKey: "about.stat.fullstack", detailKey: "about.stat.fullstackDetail" },
                  { titleKey: "about.stat.clean", detailKey: "about.stat.cleanDetail" },
                  { titleKey: "about.stat.user", detailKey: "about.stat.userDetail" },
                ] as const
              ).map((item) => (
                <div
                  key={item.titleKey}
                  className="rounded-2xl glass border border-brand/10 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-brand/30"
                >
                  <div className="font-heading text-sm font-bold text-brand">
                    {t(item.titleKey)}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{t(item.detailKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
