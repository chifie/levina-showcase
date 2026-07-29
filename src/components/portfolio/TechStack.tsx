import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, FaPhp, FaJava,
} from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiNestjs, SiExpress, SiPostgresql, SiMysql,
  SiMongodb, SiFirebase, SiVuedotjs, SiGraphql, SiDart, SiFlutter, SiSwift,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const TECH_CATEGORIES = [
  {
    name: "Frontend",
    icon: FaReact,
    items: [
      { icon: FaReact, label: "React", color: "#61DAFB" },
      { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
      { icon: SiVuedotjs, label: "Vue.js", color: "#4FC08D" },
      { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
      { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
      { icon: FaHtml5, label: "HTML5", color: "#E34F26" },
      { icon: FaCss3Alt, label: "CSS3", color: "#1572B6" },
    ],
  },
  {
    name: "Backend",
    icon: FaNodeJs,
    items: [
      { icon: SiNestjs, label: "NestJS", color: "#E0234E" },
      { icon: SiExpress, label: "Express.js", color: "#000000" },
      { icon: FaNodeJs, label: "Node.js", color: "#339933" },
      { icon: FaPython, label: "Python", color: "#3776AB" },
      { icon: FaPhp, label: "PHP", color: "#777BB4" },
      { icon: SiGraphql, label: "GraphQL", color: "#E10098" },
    ],
  },
  {
    name: "Database & Cloud",
    icon: SiPostgresql,
    items: [
      { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
      { icon: SiMysql, label: "MySQL", color: "#4479A1" },
      { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
      { icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
      { icon: FaDocker, label: "Docker", color: "#2496ED" },
    ],
  },
  {
    name: "Mobile & More",
    icon: SiFlutter,
    items: [
      { icon: SiDart, label: "Dart", color: "#0175C2" },
      { icon: SiFlutter, label: "Flutter", color: "#02569B" },
      { icon: SiSwift, label: "Swift", color: "#F05138" },
      { icon: FaFigma, label: "Figma", color: "#F24E1E" },
      { icon: FaGitAlt, label: "Git", color: "#F05032" },
    ],
  },
];

function TechIcon({
  icon: Icon,
  label,
  color,
  index,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: index * 0.03, ease: "back.out(1.7)" }
        );
      },
    });
  }, [index]);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center gap-1.5 p-2"
      style={{ opacity: 0 }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-xl shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1"
        style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
      >
        <Icon className="text-lg" />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("[data-anim]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
            scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-14 text-center">
          <span data-anim className="inline-block rounded-full glass border border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-500">
            Tech Stack
          </span>
          <h2 data-anim className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Built with the <span className="text-gradient">Best Tools</span>
          </h2>
          <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every project is crafted using modern, battle-tested technologies
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TECH_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="rounded-2xl glass-strong border border-fuchsia-500/10 p-6 shadow-elegant transition-all duration-300 hover:shadow-glow"
            >
              <div className="mb-4 flex items-center gap-3 border-b border-border/40 pb-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-glow">
                  <cat.icon className="text-sm" />
                </span>
                <h3 className="font-heading text-base font-bold">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.items.map((item, j) => (
                  <TechIcon key={j} {...item} index={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
