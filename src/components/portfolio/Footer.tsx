import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaHeart,
  FaMapMarkerAlt,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function BackToTop() {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Button animation
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-white shadow-glow transition-all duration-300 hover:scale-110 hover:shadow-elegant ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
    >
      <FaArrowUp className="text-sm" />
    </button>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-primary transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Touch device check
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      if (cursor) cursor.style.display = "none";
      return;
    }
    if (cursor) cursor.style.display = "block";

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        gsap.to(cursor, { opacity: 0.8, duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    const onTick = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      gsap.set(cursor, { x: currentX - 12, y: currentY - 12 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[100] hidden h-6 w-6 rounded-full mix-blend-difference"
      style={{
        background: "#f97316",
        opacity: 0,
      }}
    />
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current.querySelectorAll("[data-footer-anim]"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <BackToTop />

      <footer
        ref={footerRef}
        className="relative border-t border-border/50 pt-16 pb-8 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[100px]" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div data-footer-anim className="md:col-span-2">
              <a
                href="#home"
                className="group inline-flex items-center gap-2.5"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-white font-bold shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  L
                </span>
                <span className="font-heading text-xl font-bold text-gradient">
                  Levina Chifie
                </span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A passionate Full-Stack Software Developer crafting modern digital experiences
                with clean code and elegant design.
              </p>
              <div className="mt-5 flex gap-2">
                {[
                  { Icon: FaGithub, href: "https://github.com/chifie", label: "GitHub" },
                  { Icon: FaLinkedin, href: "https://linkedin.com/in/levinachifie", label: "LinkedIn" },
                  { Icon: FaEnvelope, href: "mailto:levinachifie@gmail.com", label: "Email" },
                ].map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full glass border border-orange-500/10 text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-gradient-primary hover:text-white hover:shadow-glow"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div data-footer-anim>
              <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Navigation
              </h4>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-sm text-muted-foreground transition-all duration-200 hover:text-orange-500 hover:translate-x-1 inline-block"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div data-footer-anim>
              <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Get In Touch
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:levinachifie@gmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-orange-500"
                  >
                    <FaEnvelope className="text-xs" />
                    levinachifie@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FaMapMarkerAlt className="text-xs" />
                  Available Worldwide
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            data-footer-anim
            className="my-10 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          />

          {/* Bottom bar */}
          <div
            data-footer-anim
            className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row"
          >
            <p>
              &copy; {new Date().getFullYear()} Levina Chifie. Crafted with{" "}
              <FaHeart className="inline text-orange-500 mx-0.5" /> and late-night coffee.
            </p>
            <p className="text-[10px]">
              Built with React &bull; GSAP &bull; Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
