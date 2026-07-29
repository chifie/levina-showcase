import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaJs,
  FaPython,
  FaPhp,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiDart,
  SiNextdotjs,
  SiFlutter,
  SiTailwindcss,
  SiNestjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiGnubash,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: FaCode,
    skills: [
      { name: "JavaScript", icon: FaJs, level: 85, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, level: 75, color: "#3178C6" },
      { name: "Dart", icon: SiDart, level: 40, color: "#0175C2" },
      { name: "Python", icon: FaPython, level: 50, color: "#3776AB" },
      { name: "PHP", icon: FaPhp, level: 80, color: "#777BB4" },
    ],
  },
  {
    title: "Frontend",
    icon: FaReact,
    skills: [
      { name: "React", icon: FaReact, level: 85, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, level: 70, color: "#000000" },
      { name: "Flutter", icon: SiFlutter, level: 35, color: "#02569B" },
      { name: "HTML5", icon: FaHtml5, level: 95, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, level: 92, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 88, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    icon: FaNodeJs,
    skills: [
      { name: "NestJS", icon: SiNestjs, level: 60, color: "#E0234E" },
      { name: "Express.js", icon: SiExpress, level: 70, color: "#000000" },
      { name: "Node.js", icon: FaNodeJs, level: 75, color: "#339933" },
      { name: "REST API", icon: FaCode, level: 80, color: "#6366F1" },
      { name: "FastAPI", icon: FaPython, level: 45, color: "#009688" },
    ],
  },
  {
    title: "Databases",
    icon: SiPostgresql,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: 55, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, level: 75, color: "#4479A1" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: FaDocker,
    skills: [
      { name: "Docker", icon: FaDocker, level: 40, color: "#2496ED" },
      { name: "Git", icon: FaGitAlt, level: 85, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, level: 82, color: "#181717" },
      { name: "VS Code", icon: FaCode, level: 90, color: "#007ACC" },
    ],
  },
  {
    title: "Currently Learning",
    icon: FaPython,
    learning: true,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: 55, color: "#4169E1" },
      { name: "System Design", icon: SiGnubash, level: 35, color: "#6B7280" },
      { name: "Software Architecture", icon: FaCode, level: 30, color: "#6B7280" },
      { name: "Clean Code", icon: FaCode, level: 65, color: "#6B7280" },
      { name: "DevOps", icon: FaDocker, level: 35, color: "#6B7280" },
    ],
  },
];

function SkillCard({
  name,
  icon: Icon,
  level,
  color,
  index,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  level: number;
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const bar = barRef.current;
    if (!card || !bar) return;

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        // Card entrance
        gsap.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.04,
            ease: "power3.out",
          }
        );

        // Progress bar fill
        gsap.fromTo(bar, { width: "0%" }, { width: `${level}%`, duration: 1, delay: 0.3 + index * 0.04, ease: "power2.out" });
      },
    });

    return () => trigger.kill();
  }, [index, level]);

  return (
    <div
      ref={cardRef}
      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-orange-500/5"
      style={{ opacity: 0 }}
    >
      <span
        className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-6"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
      >
        <Icon className="text-lg" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate">{name}</span>
          <span className="text-xs font-semibold text-muted-foreground ml-2">{level}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            ref={barRef}
            className="h-full rounded-full transition-all"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}88)`, width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/3 h-72 w-72 translate-x-1/2 rounded-full bg-orange-400/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-orange-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-orange-500"
          >
            Skills
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            My <span className="text-gradient">Toolkit</span>
          </h2>
          <p
            data-anim
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            A curated collection of technologies I work with and skills I&apos;m growing into
          </p>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <div
              key={catIndex}
              className="rounded-3xl glass-strong border border-orange-500/10 p-6 shadow-elegant transition-all duration-300 hover:shadow-glow"
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3 border-b border-border/40 pb-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow">
                  <category.icon className="text-lg" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold">{category.title}</h3>
                  {category.learning && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-orange-500">
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                {category.skills.map((skill, i) => (
                  <SkillCard key={i} {...skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
