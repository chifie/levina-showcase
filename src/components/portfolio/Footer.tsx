import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUp, FaEnvelope, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { NAV_LINKS } from "@/lib/nav-links";
import { SOCIAL_LINKS } from "@/lib/social-links";

function BackToTop() {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      // Coalesce scroll events to one update per animation frame.
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setShow(window.scrollY > 600);
      });
    };
    onScroll(); // reflect the current scroll position on mount (e.g. after refresh)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" },
      );
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-30 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-warm text-warm-ink shadow-warm transition-all duration-300 hover:scale-110 hover:shadow-elegant group ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
    >
      <span
        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <FaArrowUp className="relative text-sm transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setProgress(p);
    };
    const onScroll = () => {
      // Coalesce scroll events to one update per animation frame.
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };
    // Recompute when the viewport or document height changes.
    window.addEventListener("resize", update);
    update(); // reflect the current scroll position on mount (e.g. after refresh)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-warm transition-[width] duration-200 ease-out"
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

    if (prefersReducedMotion()) return;

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
        background: "#0d3b66",
        opacity: 0,
      }}
      aria-hidden="true"
    />
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (footerRef.current) {
          gsap.set(footerRef.current.querySelectorAll("[data-footer-anim]"), {
            opacity: 1,
            y: 0,
          });
        }
        return;
      }

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
          },
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
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-[100px]"
        />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div data-footer-anim className="md:col-span-2">
              <a
                href="#home"
                className="group inline-flex items-center gap-2.5"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm text-warm-ink font-bold shadow-warm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  L
                </span>
                <span className="font-heading text-xl font-bold text-gradient">Levina Chifie</span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A dedicated Full Stack Software Developer and Mobile App Developer crafting modern
                digital experiences with clean code and elegant design.
              </p>
              <div className="mt-5 flex gap-2">
                {SOCIAL_LINKS.map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full glass border border-brand/10 text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-gradient-warm hover:text-warm-ink hover:shadow-warm"
                  >
                    <span
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                      aria-hidden="true"
                    />
                    <Icon className="relative" />
                  </a>
                ))}
              </div>
            </div>

            <div data-footer-anim>
              <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Navigation
              </h4>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-sm text-muted-foreground transition-all duration-200 hover:text-brand hover:translate-x-1 inline-block"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-anim>
              <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Get In Touch
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:levinachifie@gmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
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

          <div
            data-footer-anim
            className="my-10 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"
          />

          <div
            data-footer-anim
            className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row"
          >
            <p>
              &copy; {new Date().getFullYear()} Levina Chifie. Crafted with{" "}
              <FaHeart className="inline text-terra mx-0.5" /> and code.
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 text-[10px]">
              Built with React <span className="text-brand/50">&bull;</span> GSAP
              <span className="text-brand/50">&bull;</span> Tailwind CSs
              <span className="text-brand/50">&bull;</span> Playfair Displays
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
