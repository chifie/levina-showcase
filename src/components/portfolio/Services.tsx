import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGlobe, FaServer, FaMobileAlt, FaPaintBrush, FaArrowRight } from "react-icons/fa";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: FaGlobe,
    title: "Web Application Development",
    description:
      "Building modern, responsive web applications with React, Next.js, and TypeScript. From landing pages to complex full-featured platforms, I deliver clean code and exceptional user experiences.",
    color: "#6c7a94",
  },
  {
    icon: FaServer,
    title: "Backend API Development",
    description:
      "Designing and implementing robust RESTful APIs and backend services with FastAPI, NestJS, and Node.js. Built for scalability, security, and performance.",
    color: "#5f6b80",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Application Development",
    description:
      "Creating cross-platform mobile applications with Flutter and Dart. Native-quality performance and pixel-perfect UI across iOS and Android from a single codebase.",
    color: "#71809a",
  },
  {
    icon: FaPaintBrush,
    title: "UI Implementation",
    description:
      "Translating designs into pixel-perfect, responsive interfaces using Tailwind CSS, modern CSS techniques, and component-driven architecture for consistent, maintainable results.",
    color: "#4a5a72",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (prefersReducedMotion()) {
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
      },
    });

    return () => trigger.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="card-elegant group relative overflow-hidden rounded-3xl p-8"
      style={{ opacity: 0 }}
    >
      <div
        className="absolute top-0 right-0 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: color }}
      />
      <span
        className="absolute right-6 top-5 font-heading text-5xl font-bold text-brand/10 transition-colors duration-500 group-hover:text-brand/20 select-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <div className="flex items-start justify-between">
          <span
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
              aria-hidden="true"
            />
            <Icon className="relative text-xl" />
          </span>
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:bg-brand/10"
            style={{ color, borderColor: `color-mix(in srgb, ${color} 25%, transparent)` }}
            aria-hidden="true"
          >
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>

        <h3 className="mt-5 font-heading text-xl font-bold transition-colors group-hover:text-brand">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        >
          Learn more
          <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark"
          >
            Services
          </span>
          <div data-anim className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-primary" />
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            What I <span className="text-gradient italic">Do</span>
          </h2>
          <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            I deliver end-to-end software solutions across web, mobile, and backend platforms with a
            focus on quality and user experience
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
