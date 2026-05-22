import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaArrowUp,
  FaDownload,
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaServer,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaGitAlt,
  FaGithubAlt,
  FaPython,
  FaJs,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiTailwindcss, SiPostgresql } from "react-icons/si";
import { useTheme } from "@/hooks/use-theme";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return null;
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[400px] w-[400px] rounded-full opacity-60 mix-blend-screen transition-transform duration-300"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background: "var(--gradient-glow)",
      }}
    />
  );
}

function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setW(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-primary transition-[width] duration-150"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

function AnimatedBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-soft"
    >
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[var(--rose)] opacity-30 blur-3xl animate-blob" />
      <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--lavender)] opacity-30 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[var(--rose-gold)] opacity-25 blur-3xl animate-blob [animation-delay:-12s]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:32px_32px]" />
    </div>
  );
}

function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${scrolled ? "glass-strong shadow-elegant mx-4" : "bg-transparent"}`}
      >
        <a href="#home" className="flex items-center gap-2 font-display text-xl font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            L
          </span>
          <span className="text-gradient">Levina Chifie</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:scale-105 hover:shadow-glow"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-4 mt-2 rounded-2xl glass-strong p-3 shadow-elegant md:hidden">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  onClick={() => setOpen(false)}
                  href={`#${n.id}`}
                  className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary/10"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Typing() {
  const words = ["Full-Stack Developer", "Creative Coder", "UI/UX Enthusiast", "Lifelong Learner"];
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del && text === current) {
        setTimeout(() => setDel(true), 1500);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setI((p) => p + 1);
        return;
      }
      setText(current.substring(0, text.length + (del ? -1 : 1)));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return (
    <span className="text-gradient font-semibold">
      {text}
      <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-primary align-middle" />
    </span>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-7xl lg:text-8xl">
            Hi, I'm{" "}
            <span className="text-gradient animate-gradient bg-gradient-primary [background-clip:text] [-webkit-background-clip:text] text-transparent">
              Levina Chifie
            </span>
          </h1>
          <div className="mt-6 text-xl md:text-2xl">
            <Typing />
          </div>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            A passionate Computer Science student and future Full-Stack Developer creating modern
            and elegant digital experiences.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:shadow-elegant"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-semibold transition-all hover:scale-105 hover:shadow-glow"
            >
              Contact Me
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold transition-all hover:bg-primary/10"
            >
              <FaDownload /> Download CV
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3">
            {[
              { Icon: FaGithub, href: "https://github.com/chifie" },
              { Icon: FaLinkedin, href: "https://linkedin.com/in/levinachifie" },
              { Icon: FaEnvelope, href: "mailto:levinachifie@gmail.com" },
            ].map(({ Icon, href }, k) => (
              <a
                key={k}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full glass transition-all hover:scale-110 hover:bg-gradient-primary hover:text-primary-foreground hover:shadow-glow"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="mb-14 text-center"
    >
      <span className="inline-block rounded-full glass px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary">
        {tag}
      </span>
      <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

function About() {
  const stats = [
    { v: "10+", l: "Technologies" },
    { v: "3+", l: "Projects Built" },
    { v: "∞", l: "Curiosity" },
    { v: "24/7", l: "Learning" },
  ];
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader tag="About" title="Crafting code with creativity" />
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-3"
          >
            <div className="glow-border rounded-3xl glass-strong p-8 shadow-elegant md:p-10">
              <p className="font-display text-2xl">Hello, I'm Levina Chifie ✨</p>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  A passionate Computer Science student with a deep love for technology, creativity,
                  and modern web development. I enjoy transforming ideas into beautiful, responsive,
                  and interactive digital experiences that feel both elegant and functional.
                </p>
                <p>
                  I work with technologies like{" "}
                  <span className="text-foreground font-medium">
                    React, Tailwind CSS, PHP, HTML, CSS, Git, and GitHub
                  </span>
                  , while continuously learning{" "}
                  <span className="text-foreground font-medium">
                    Python, PostgreSQL, JavaScript
                  </span>{" "}
                  to strengthen my backend development journey.
                </p>
                <p>
                  I'm passionate about becoming a skilled Full-Stack Developer and building modern
                  applications that combine clean design, smooth user experience, and powerful
                  functionality.
                </p>
                <p>
                  Beyond coding, I love growth, creativity, learning new things, and challenging
                  myself to become better every day.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-2 gap-4 lg:col-span-2"
          >
            {stats.map((s, k) => (
              <div
                key={k}
                className="group rounded-3xl glass p-6 text-center shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-gradient font-display text-4xl font-semibold">{s.v}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
            <div className="col-span-2 rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-glow">
              <p className="font-display text-xl">"Design meets code, beautifully."</p>
              <p className="mt-2 text-sm opacity-90">— My daily motto</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  { name: "React", icon: FaReact, level: 85, learning: false },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 90, learning: false },
  { name: "HTML", icon: FaHtml5, level: 95, learning: false },
  { name: "CSS", icon: FaCss3Alt, level: 92, learning: false },
  { name: "PHP", icon: FaPhp, level: 80, learning: false },
  { name: "Git", icon: FaGitAlt, level: 78, learning: false },
  { name: "GitHub", icon: FaGithubAlt, level: 82, learning: false },
  { name: "PostgreSQL", icon: SiPostgresql, level: 45, learning: true },
  { name: "Python", icon: FaPython, level: 50, learning: true },
  { name: "JavaScript", icon: FaJs, level: 55, learning: true },
];

function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          tag="Skills"
          title="My toolkit"
          sub="A blend of tools I love and skills I'm growing into."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, k) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: k * 0.05 }}
                className="group glow-border rounded-2xl glass-strong p-6 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-2xl text-primary-foreground shadow-glow transition-transform group-hover:rotate-6 group-hover:scale-110">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                      {s.learning && <span className="text-xs text-primary">Learning</span>}
                    </div>
                  </div>
                  <span className="font-display text-2xl text-gradient">{s.level}%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-primary"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Glory Burger Website",
    desc: "Modern burger ordering website with elegant UI and backend integration.",
    tech: ["React", "FastAPI", "PostgreSQL"],
    accent: "from-[oklch(0.78_0.14_12)] to-[oklch(0.72_0.16_320)]",
  },
  {
    title: "Glory Stock Inventory",
    desc: "Inventory management system for tracking products and stock.",
    tech: ["PHP", "MySQL"],
    accent: "from-[oklch(0.72_0.16_320)] to-[oklch(0.78_0.1_300)]",
  },
  {
    title: "Rental House Management",
    desc: "System for managing rental houses, tenants, and payments.",
    tech: ["PHP", "MySQL"],
    accent: "from-[oklch(0.78_0.1_300)] to-[oklch(0.78_0.14_12)]",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          tag="Projects"
          title="Selected work"
          sub="A glimpse into what I've been building."
        />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, k) => (
            <motion.article
              key={k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: k * 0.1 }}
              className="group glow-border overflow-hidden rounded-3xl glass-strong shadow-elegant transition-all hover:-translate-y-2 hover:shadow-glow"
            >
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-bold text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href="#"
                    className="flex-1 rounded-full bg-gradient-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    Live Demo
                  </a>
                  <a
                    href="#"
                    className="flex-1 rounded-full glass px-4 py-2 text-center text-xs font-semibold transition-transform hover:scale-105"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    Icon: FaCode,
    title: "Frontend Development",
    desc: "Pixel-perfect, responsive interfaces built with React and Tailwind.",
  },
  {
    Icon: FaServer,
    title: "Backend Development",
    desc: "Clean APIs and data layers using PHP, Python and PostgreSQL.",
  },
  {
    Icon: FaMobileAlt,
    title: "Responsive Web Design",
    desc: "Fluid layouts that feel beautiful on every device.",
  },
  {
    Icon: FaPaintBrush,
    title: "UI/UX Design",
    desc: "Elegant, intuitive design with attention to every detail.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader tag="Services" title="What I offer" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, k) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: k * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-7 shadow-elegant transition-all hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity group-hover:opacity-40" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-2xl text-primary-foreground shadow-glow transition-transform group-hover:scale-110 group-hover:rotate-6">
                <s.Icon />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          tag="Contact"
          title="Let's create something beautiful"
          sub="Have an idea or opportunity? I'd love to hear from you."
        />
        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-4 lg:col-span-2"
          >
            {[
              {
                Icon: FaEnvelope,
                label: "Email",
                val: "levinachifie@gmail.com",
                href: "mailto:levinachifie@gmail.com",
              },
              { Icon: FaGithub, label: "GitHub", val: "chifie", href: "https://github.com/chifie" },
              {
                Icon: FaLinkedin,
                label: "LinkedIn",
                val: "levinachifie",
                href: "https://linkedin.com/in/levinachifie",
              },
              { Icon: FaMapMarkerAlt, label: "Location", val: "Available worldwide" },
            ].map((c, k) => (
              <a
                key={k}
                href={c.href ?? "#"}
                target={c.href ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl glass-strong p-5 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:rotate-6">
                  <c.Icon />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="font-medium">{c.val}</div>
                </div>
              </a>
            ))}
          </motion.div>
          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            className="glow-border rounded-3xl glass-strong p-8 shadow-elegant lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: "name", label: "Your name", type: "text" },
                { name: "email", label: "Email address", type: "email" },
              ].map((f) => (
                <label key={f.name} className="relative block">
                  <input
                    required
                    type={f.type}
                    name={f.name}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-background/50 px-4 pt-6 pb-2 text-sm outline-none transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
                  />
                  <span className="pointer-events-none absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                    {f.label}
                  </span>
                </label>
              ))}
            </div>
            <label className="relative mt-5 block">
              <input
                required
                name="subject"
                placeholder=" "
                className="peer w-full rounded-xl border border-border bg-background/50 px-4 pt-6 pb-2 text-sm outline-none transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
              />
              <span className="pointer-events-none absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                Subject
              </span>
            </label>
            <label className="relative mt-5 block">
              <textarea
                required
                name="message"
                rows={5}
                placeholder=" "
                className="peer w-full resize-none rounded-xl border border-border bg-background/50 px-4 pt-6 pb-2 text-sm outline-none transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
              />
              <span className="pointer-events-none absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                Your message
              </span>
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] hover:shadow-elegant"
            >
              {sent ? "✨ Message sent!" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-2 font-display text-xl font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              L
            </span>
            <span className="text-gradient">Levina Chifie</span>
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Designed with passion and creativity by Levina.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest">
            Quick links
          </h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest">Connect</h4>
          <div className="mt-3 flex gap-2">
            {[
              { Icon: FaGithub, href: "https://github.com/chifie" },
              { Icon: FaLinkedin, href: "https://linkedin.com/in/levinachifie" },
              { Icon: FaEnvelope, href: "mailto:levinachifie@gmail.com" },
            ].map(({ Icon, href }, k) => (
              <a
                key={k}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:scale-110 hover:bg-gradient-primary hover:text-primary-foreground"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Levina Chifie. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingSocial() {
  return (
    <div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {[
        { Icon: FaGithub, href: "https://github.com/chifie" },
        { Icon: FaLinkedin, href: "https://linkedin.com/in/levinachifie" },
        { Icon: FaEnvelope, href: "mailto:levinachifie@gmail.com" },
      ].map(({ Icon, href }, k) => (
        <a
          key={k}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:scale-110 hover:bg-gradient-primary hover:text-primary-foreground hover:shadow-glow"
        >
          <Icon />
        </a>
      ))}
      <div className="mx-auto h-16 w-px bg-gradient-to-b from-primary/50 to-transparent" />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-all hover:scale-110 animate-float"
    >
      <FaArrowUp />
    </button>
  );
}

export default function Portfolio() {
  return (
    <>
      <FontLoader />
      <ScrollProgress />
      <AnimatedBg />
      <CursorGlow />
      <Navbar />
      <FloatingSocial />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
