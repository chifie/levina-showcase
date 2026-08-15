export interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  color: string;
  ink: "dark" | "light";
  initials: string;
  /** Public repository URL; omit when the repo is private or does not exist yet. */
  github?: string;
  /** Secondary public repository URL (e.g. the backend repo); omit when not needed. */
  githubBackend?: string;
  /** Live demo URL; omit when the project is not deployed. */
  demo?: string;
  /** Admin dashboard URL; omit when the project has no public admin panel. */
  admin?: string;
  /** Static screenshot shown on the card header; omit to fall back to initials. */
  screenshot?: string;
  /** Phone-viewport screenshot rendered in a device frame on the card header. */
  mobileScreenshot?: string;
  /** Tablet-viewport screenshot rendered in a tablet frame on the card header. */
  tabletScreenshot?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "SokoDigital",
    description:
      "A modern marketplace platform for Tanzania connecting buyers and sellers with seamless transactions, product management, and a complete seller dashboard.",
    tech: ["React", "FastAPI", "PostgreSQL", "TypeScript"],
    gradient: "from-[#f4d35e] via-[#ee964b] to-[#f95738]",
    color: "#f95738",
    ink: "dark",
    initials: "SD",
    github: "https://github.com/chifie/SokoDigital_frontend",
    demo: "https://soko-digital-frontend.vercel.app",
    screenshot: "/screenshots/soko-digital.webp",
  },
  {
    title: "DalaliMkononi",
    description:
      "A real estate marketplace platform for property listings, agent profiles, search filters, and seamless transaction management across Tanzania.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL"],
    gradient: "from-[#ee964b] via-[#f4d35e] to-[#f95738]",
    color: "#ee964b",
    ink: "dark",
    initials: "DM",
    github: "https://github.com/chifie/DalaliMkononi",
    demo: "https://dalali-mkononi.vercel.app",
    screenshot: "/screenshots/dalali-mkononi.webp",
    mobileScreenshot: "/screenshots/dalali-mkononi-mobile.webp",
  },
  {
    title: "TanzaniaKiganjani",
    description:
      "A vehicle transport and logistics platform connecting customers with reliable transport services across Tanzania.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"],
    gradient: "from-[#f95738] via-[#0d3b66] to-[#082a4c]",
    color: "#f95738",
    ink: "light",
    initials: "TK",
    github: "https://github.com/chifie/kiganjani-drive-hub",
    demo: "https://kiganjani-drive-hub-o31d.vercel.app/",
    screenshot: "/screenshots/tanzania-kiganjani.webp",
    mobileScreenshot: "/screenshots/tanzania-kiganjani-mobile.webp",
    tabletScreenshot: "/screenshots/tanzania-kiganjani-tablet.webp",
  },
  {
    title: "Glory Burger Website",
    description:
      "A restaurant website with a modern UI, online ordering system, menu management, and an intuitive customer experience for Glory Burger.",
    tech: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-[#f4d35e] via-[#ee964b] to-[#0d3b66]",
    color: "#ee964b",
    ink: "dark",
    initials: "GB",
    github: "https://github.com/chifie/GLORY_BURGER",
    demo: "https://gloryburger.com",
    screenshot: "/screenshots/glory-burger.webp",
    mobileScreenshot: "/screenshots/glory-burger-mobile.webp",
  },
  {
    title: "Glory Burger Mobile App",
    description:
      "A Flutter mobile application for food ordering with real-time cart management, order tracking, push notifications, and a seamless mobile dining experience.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    gradient: "from-[#0d3b66] via-[#ee964b] to-[#f4d35e]",
    color: "#f4d35e",
    ink: "dark",
    initials: "GM",
    github: "https://github.com/chifie/GLORY_BURGER_APP",
  },
  {
    title: "Oddit Tech Website",
    description:
      "A dynamic official website for Oddity Tech Solutions Ltd with category-based news and service pages, a PHP + MySQL backend, and an admin dashboard for managing posts, categories, and users.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    gradient: "from-[#10b981] via-[#059669] to-[#064e3b]",
    color: "#10b981",
    ink: "light",
    initials: "OT",
    github: "https://github.com/Edsonlukiza/Oddit_project01",
    demo: "https://green-heart.infinityfreeapp.com/",
    admin: "https://green-heart.infinityfreeapp.com/backend/dashboard.php",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated portfolio built with React, TypeScript, and GSAP featuring a navy blue and cream brand identity, smooth scroll animations, and a fully responsive layout.",
    tech: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    gradient: "from-[#0d3b66] via-[#2c4a6e] to-[#082a4c]",
    color: "#0d3b66",
    ink: "light",
    initials: "PW",
    github: "https://github.com/chifie/levina-showcase",
    demo: "https://levinachifie.dev",
    screenshot: "/screenshots/portfolio-website.webp",
    mobileScreenshot: "/screenshots/portfolio-mobile.webp",
  },
];
