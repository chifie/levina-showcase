import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaFigma,
  FaArrowDown,
  FaArrowRight,
  FaCode,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import chifieImage from "@/assets/chifie.png";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const FLOATING_ICONS = [
  { Icon: FaReact, color: "#61DAFB", size: 28, delay: 0, left: 14, top: 18, depth: 1.3 },
  { Icon: SiTypescript, color: "#3178C6", size: 24, delay: 1, left: 36, top: 12, depth: 1.1 },
  { Icon: SiTailwindcss, color: "#06B6D4", size: 26, delay: 2, left: 58, top: 20, depth: 1.4 },
  { Icon: FaNodeJs, color: "#339933", size: 22, delay: 3, left: 78, top: 14, depth: 1.2 },
  { Icon: SiNextdotjs, color: "#000000", size: 24, delay: 4, left: 20, top: 55, depth: 1.5 },
  { Icon: FaPython, color: "#3776AB", size: 20, delay: 0.5, left: 45, top: 60, depth: 1.1 },
  { Icon: FaDocker, color: "#2496ED", size: 22, delay: 1.5, left: 66, top: 52, depth: 1.3 },
  { Icon: FaFigma, color: "#F24E1E", size: 20, delay: 2.5, left: 86, top: 58, depth: 1.2 },
];

function MagneticButton({
  children,
  href,
  primary,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  className?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    if (prefersReducedMotion()) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-pointer ${className} ${
        primary
          ? "bg-gradient-primary text-white shadow-glow hover:shadow-elegant"
          : "glass-strong border border-brand/20 hover:border-brand/40 hover:shadow-glow"
      }`}
    >
      <span
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(profileRef.current, { clipPath: "ellipse(50% 50% at 50% 50%)" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const headline = headlineRef.current;
      if (headline) {
        const words = headline.textContent?.split(" ") || [];
        headline.innerHTML = "";
        headline.style.display = "inline-block";

        words.forEach((word, i) => {
          const span = document.createElement("span");
          span.className = "inline-block mr-[0.3em]";
          span.textContent = word;
          span.style.opacity = "0";
          span.style.transform = "translateY(60px) rotateX(30deg)";
          span.style.perspective = "800px";
          headline.appendChild(span);
        });

        const spans = headline.querySelectorAll("span");
        tl.to(spans, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
        });
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2",
        );
      }

      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.1",
        );
      }

      if (buttonsRef.current) {
        const btns = buttonsRef.current.querySelectorAll("a");
        tl.fromTo(
          btns,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.1",
        );
      }

      if (socialsRef.current) {
        const links = socialsRef.current.querySelectorAll("a");
        tl.fromTo(
          links,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.1",
        );
      }

      const heroBadges = photoFrameRef.current?.querySelectorAll("[data-hero-badge]");
      if (heroBadges && heroBadges.length > 0) {
        tl.fromTo(
          heroBadges,
          { opacity: 0, scale: 0.6, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "back.out(1.7)" },
          "-=0.2",
        );
      }

      if (profileRef.current) {
        tl.fromTo(
          profileRef.current,
          { clipPath: "ellipse(0% 0% at 50% 50%)" },
          { clipPath: "ellipse(50% 50% at 50% 50%)", duration: 1.2, ease: "power4.out" },
          "-=0.4",
        );
      }

      if (photoFrameRef.current) {
        gsap.to(photoFrameRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (iconsRef.current) {
        const icons = iconsRef.current.querySelectorAll<HTMLDivElement>("[data-icon]");
        icons.forEach((icon, i) => {
          const delay = parseFloat(icon.dataset.delay || "0");
          gsap.to(icon, {
            y: -20 - Math.random() * 20,
            x: Math.random() * 10 - 5,
            rotation: Math.random() * 10 - 5,
            duration: 2 + Math.random() * 2,
            delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: 60,
          y: -40,
          scale: 1.1,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: -50,
          y: 60,
          scale: 0.9,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) return;

    const iconEls: HTMLDivElement[] = [];
    const iconTweenersX: ((v: number) => void)[] = [];
    const iconTweenersY: ((v: number) => void)[] = [];

    let frameTiltX: ((v: number) => void) | null = null;
    let frameTiltY: ((v: number) => void) | null = null;
    if (photoFrameRef.current) {
      frameTiltX = gsap.quickTo(photoFrameRef.current, "rotationY", {
        duration: 0.6,
        ease: "power2.out",
      });
      frameTiltY = gsap.quickTo(photoFrameRef.current, "rotationX", {
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (iconsRef.current) {
      const icons = iconsRef.current.querySelectorAll<HTMLDivElement>("[data-icon]");
      icons.forEach((icon) => {
        iconEls.push(icon);
        const depth = parseFloat(icon.dataset.depth || "1");
        iconTweenersX.push(gsap.quickTo(icon, "x", { duration: 0.8, ease: "power2.out" }));
        iconTweenersY.push(gsap.quickTo(icon, "y", { duration: 0.8, ease: "power2.out" }));
      });
    }

    const blob1X = blob1Ref.current
      ? gsap.quickTo(blob1Ref.current, "x", { duration: 1.2, ease: "power2.out" })
      : null;
    const blob1Y = blob1Ref.current
      ? gsap.quickTo(blob1Ref.current, "y", { duration: 1.2, ease: "power2.out" })
      : null;
    const blob2X = blob2Ref.current
      ? gsap.quickTo(blob2Ref.current, "x", { duration: 1.2, ease: "power2.out" })
      : null;
    const blob2Y = blob2Ref.current
      ? gsap.quickTo(blob2Ref.current, "y", { duration: 1.2, ease: "power2.out" })
      : null;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      iconEls.forEach((icon, i) => {
        const depth = parseFloat(icon.dataset.depth || "1");
        iconTweenersX[i](x * 15 * depth);
        iconTweenersY[i](y * 15 * depth);
      });

      if (frameTiltX) frameTiltX(x * 6);
      if (frameTiltY) frameTiltY(y * -6);

      if (blob1X) blob1X(x * 20 + 60);
      if (blob1Y) blob1Y(y * 20 - 40);
      if (blob2X) blob2X(x * -15 - 50);
      if (blob2Y) blob2Y(y * -15 + 60);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div
        ref={blob1Ref}
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(108,122,148,0.25), transparent 70%)" }}
      />
      <div
        ref={blob2Ref}
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(74,90,114,0.2), transparent 70%)" }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div ref={iconsRef} className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLOATING_ICONS.map(({ Icon, color, size, delay, left, top, depth }, i) => (
          <div
            key={i}
            data-icon
            data-delay={delay}
            data-depth={depth}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              color,
              opacity: 0.15,
              transition: "opacity 0.3s",
            }}
          >
            <Icon size={size} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center lg:gap-16">
          <div className="flex-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium text-brand-dark">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse-soft" />
              Available for opportunities
            </div>

            <h1
              ref={headlineRef}
              className="font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            >
              Hi, I&apos;m Levina.
            </h1>

            <p
              ref={subtitleRef}
              className="mt-3 font-heading text-2xl font-semibold md:text-3xl lg:text-4xl"
            >
              Full Stack Software Developer
              <span className="text-gradient italic">&amp; Mobile App Developer</span>
            </p>

            <p
              ref={descriptionRef}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 md:text-lg"
            >
              I build modern, scalable web and mobile applications with clean architecture, elegant
              design, and robust backend systems that deliver real value.
            </p>

            <div
              ref={buttonsRef}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <MagneticButton href="#projects" primary>
                View Projects
                <span className="text-sm">→</span>
              </MagneticButton>
              <MagneticButton href="#contact">
                Contact Me
                <FaArrowRight className="text-sm" />
              </MagneticButton>
              <MagneticButton href="#" primary={false}>
                Download CV
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </MagneticButton>
            </div>

            <div
              ref={socialsRef}
              className="mt-10 flex items-center gap-3 justify-center lg:justify-start"
            >
              {[
                { Icon: FaGithub, href: "https://github.com/chifie", label: "GitHub" },
                {
                  Icon: FaLinkedin,
                  href: "https://linkedin.com/in/levinachifie",
                  label: "LinkedIn",
                },
                { Icon: FaEnvelope, href: "mailto:levinachifie@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-full glass border border-brand/10 transition-all duration-300 hover:scale-110 hover:bg-gradient-primary hover:text-white hover:border-transparent hover:shadow-glow"
                >
                  <Icon className="text-lg transition-transform duration-300 group-hover:rotate-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex-shrink-0 lg:mt-0">
            <div ref={photoFrameRef} className="relative" style={{ perspective: "1000px" }}>
              <div
                className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[80px]"
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
                ref={profileRef}
                className="relative h-72 w-64 overflow-hidden rounded-full p-[3px] shadow-glow md:h-96 md:w-80"
                style={{
                  clipPath: "ellipse(0% 0% at 50% 50%)",
                  background: "linear-gradient(160deg, #8fa0b8, #4a5a72, #8fa0b8)",
                }}
              >
                <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
                  <img
                    src={chifieImage}
                    alt="Levina Chifie - Full Stack Software Developer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={320}
                    height={384}
                    style={{ objectPosition: "center 35%" }}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                </div>
              </div>{" "}
              <div
                data-hero-badge
                className="absolute -left-4 -top-2 flex items-center gap-1.5 rounded-full glass-strong border border-brand/20 px-3 py-1.5 shadow-elegant animate-float-slow"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                <p className="text-[10px] font-semibold text-brand-dark">Open to work</p>
              </div>
              <div
                data-hero-badge
                className="absolute -right-2 -bottom-2 rounded-2xl glass-strong border border-brand/20 px-4 py-2.5 shadow-elegant animate-float-slow"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow">
                    <FaCode className="text-xs" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark">3+ Years</p>
                    <p className="text-[10px] text-muted-foreground">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-brand"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Scroll Down</span>
            <FaArrowDown className="animate-bounce text-brand-light transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
