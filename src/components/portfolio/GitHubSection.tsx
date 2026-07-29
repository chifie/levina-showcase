import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaCodeBranch, FaStar, FaUsers, FaCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_STATS = [
  { icon: FaCodeBranch, value: "15+", label: "Repositories", color: "#f97316" },
  { icon: FaCode, value: "500+", label: "Contributions", color: "#8B5CF6" },
  { icon: FaStar, value: "5+", label: "Stars Earned", color: "#F59E0B" },
  { icon: FaUsers, value: "10+", label: "Followers", color: "#06B6D4" },
];

// Simulated contribution data (52 weeks x 7 days)
function generateContributionData() {
  const data = [];
  for (let week = 0; week < 52; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const level = Math.random();
      weekData.push(
        level > 0.7 ? 4 : level > 0.5 ? 3 : level > 0.3 ? 2 : level > 0.15 ? 1 : 0
      );
    }
    data.push(weekData);
  }
  return data;
}

const CONTRIBUTION_DATA = generateContributionData();

function ContributionCell({
  level,
  index,
}: {
  level: number;
  index: number;
}) {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cell = cellRef.current;
    if (!cell) return;

    const trigger = ScrollTrigger.create({
      trigger: cell,
      start: "top 95%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cell,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            delay: index * 0.002,
            ease: "back.out(2)",
          }
        );
      },
    });

    return () => trigger.kill();
  }, [index]);

  const getColor = (lvl: number) => {
    if (lvl === 0) return "bg-muted";
    if (lvl === 1) return "bg-orange-200 dark:bg-orange-900/30";
    if (lvl === 2) return "bg-orange-300 dark:bg-orange-700/50";
    if (lvl === 3) return "bg-orange-400 dark:bg-orange-600/70";
    return "bg-orange-500 dark:bg-orange-500";
  };

  return (
    <div
      ref={cellRef}
      className={`h-[10px] w-[10px] rounded-[2px] ${getColor(level)} transition-all duration-200 hover:scale-150 hover:shadow-sm`}
      style={{ opacity: 0 }}
    />
  );
}

export default function GitHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

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

      // Stats stagger
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll("[data-stat]");
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
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
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glass border border-orange-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-orange-500"
          >
            Open Source
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p
            data-anim
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            My open source contributions and coding activity
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {GITHUB_STATS.map((stat, i) => (
            <div
              key={i}
              data-stat
              className="group rounded-2xl glass-strong border border-orange-500/10 p-5 text-center shadow-elegant transition-all duration-300 hover:shadow-glow"
              style={{ opacity: 0 }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <stat.icon />
              </span>
              <div className="font-heading text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div
          ref={graphRef}
          className="rounded-3xl glass-strong border border-orange-500/10 p-6 shadow-elegant md:p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaGithub className="text-lg text-muted-foreground" />
              <span className="text-sm font-medium">Contribution Graph</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className={`h-[10px] w-[10px] rounded-[2px] ${
                    lvl === 0
                      ? "bg-muted"
                      : lvl === 1
                        ? "bg-orange-200 dark:bg-orange-900/30"
                        : lvl === 2
                          ? "bg-orange-300 dark:bg-orange-700/50"
                          : lvl === 3
                            ? "bg-orange-400 dark:bg-orange-600/70"
                            : "bg-orange-500 dark:bg-orange-500"
                  }`}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Contribution grid */}
          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {CONTRIBUTION_DATA.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <ContributionCell
                    key={dayIndex}
                    level={day}
                    index={weekIndex * 7 + dayIndex}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
            <span className="text-xs text-muted-foreground">
              {new Date().getFullYear()} contributions in the last year
            </span>
            <a
              href="https://github.com/chifie"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-orange-500 transition-colors hover:text-orange-400"
            >
              <FaGithub />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
