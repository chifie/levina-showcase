import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    icon: FaCode,
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "2024 - Present",
    description: [
      "Building custom web applications for clients using modern tech stacks",
      "Developing responsive and performant frontend interfaces with React and Tailwind CSS",
      "Creating RESTful APIs and backend services with Node.js and NestJS",
      "Implementing database solutions with PostgreSQL and MySQL",
    ],
    color: "#d946ef",
  },
  {
    icon: FaGraduationCap,
    title: "Computer Science Student",
    company: "University",
    period: "2024 - Present",
    description: [
      "Studying core computer science concepts including algorithms, data structures, and software engineering",
      "Working on academic projects applying theoretical knowledge to practical applications",
      "Collaborating with peers on group projects and hackathons",
      "Maintaining strong academic performance while pursuing self-directed learning",
    ],
    color: "#8B5CF6",
  },
  {
    icon: FaCode,
    title: "Web Development Intern",
    company: "Personal Projects & Open Source",
    period: "2023 - 2024",
    description: [
      "Developed a full-stack inventory management system using PHP and MySQL",
      "Built an interactive burger ordering application with React and FastAPI",
      "Contributed to open source projects and learned version control with Git/GitHub",
      "Created responsive websites with modern CSS techniques and frameworks",
    ],
    color: "#06B6D4",
  },
  {
    icon: FaBriefcase,
    title: "Junior Developer",
    company: "Freelance Projects",
    period: "2023",
    description: [
      "Started taking on small freelance web development projects",
      "Built landing pages and simple web applications for local businesses",
      "Gained experience in client communication and project management",
      "Developed skills in HTML, CSS, JavaScript, and basic PHP",
    ],
    color: "#10B981",
  },
  {
    icon: FaGraduationCap,
    title: "Started Programming Journey",
    company: "Self-Taught",
    period: "2022 - 2023",
    description: [
      "Learned the fundamentals of programming through online courses and tutorials",
      "Started with Python and HTML/CSS, building foundational coding skills",
      "Completed various online certifications and coding challenges",
      "Discovered passion for web development and decided to pursue it professionally",
    ],
    color: "#F59E0B",
  },
];

function ExperienceCard({
  icon: Icon,
  title,
  company,
  period,
  description,
  color,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  company: string;
  period: string;
  description: string[];
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const line = lineRef.current;
    if (!card || !line) return;

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      once: true,
      onEnter: () => {
        // Card entrance from alternating sides
        const fromLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -50 : 50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.7, delay: 0.1, ease: "power3.out" }
        );

        // Line growth
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.5, delay: 0.2, ease: "power2.out", transformOrigin: "top center" });
      },
    });

    return () => trigger.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative mb-10 pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 last:mb-0"
      style={{ opacity: 0 }}
    >
      {/* Desktop: contents alternate between left and right */}
      <div className={index % 2 === 0 ? "md:col-start-1 md:pr-8 md:text-right" : "md:col-start-2 md:pl-8"}>
        <div className="group rounded-2xl glass-strong border border-fuchsia-500/10 p-6 shadow-elegant transition-all duration-300 hover:shadow-glow">
          <div className={`flex items-center gap-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
            <span
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
            >
              <Icon className="text-lg" />
            </span>
            <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
              <span
                className="inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
              >
                {period}
              </span>
            </div>
          </div>
          <div className={`mt-3 ${index % 2 === 0 ? "md:text-right" : ""}`}>
            <h3 className="font-heading text-lg font-bold">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{company}</p>
            <ul className={`mt-3 space-y-1.5 ${index % 2 === 0 ? "md:text-right" : ""}`}>
              {description.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-fuchsia-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

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

      // Timeline line animation
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: "top 90%",
              end: "bottom 10%",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glassborder border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-500">
            Experience
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            My <span className="text-gradient">Journey</span>
          </h2>
          <p
            data-anim
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            The experiences that shaped my skills and passion for development
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line (desktop center, mobile left) */}
          <div
            ref={timelineLineRef}
            className="absolute left-[18px] top-0 h-full w-[2px] origin-top md:left-1/2 md:-translate-x-px"
            style={{
              background: "linear-gradient(to bottom, rgba(217,70,239,0.4), rgba(217,70,239,0.15), transparent)",
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={i} {...exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
