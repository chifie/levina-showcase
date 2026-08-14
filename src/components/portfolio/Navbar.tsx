import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "@/hooks/use-theme";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { NAV_LINKS } from "@/lib/nav-links";
import { useI18n, NAV_LABEL_KEYS } from "@/lib/i18n";
import { FaSun, FaMoon, FaBars, FaTimes, FaDownload, FaGlobe } from "react-icons/fa";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { t, language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      // Coalesce scroll events to one update per animation frame.
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollY = window.scrollY;
        setScrolled(scrollY > 40);

        const sections = NAV_LINKS.map((n) => document.getElementById(n.id)).filter(Boolean);
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section) {
            const top = section.offsetTop - 150;
            if (scrollY >= top) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      });
    };
    onScroll(); // highlight the section visible on initial load
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (open && !prefersReducedMotion()) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" },
        );
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      // Trap Tab navigation inside the open mobile menu.
      const menu = mobileMenuRef.current;
      if (!menu) return;
      const focusables = Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === menu)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // Move focus into the menu so keyboard users land on the first link.
    mobileMenuRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (indicatorRef.current && !prefersReducedMotion()) {
      const activeLink = navRef.current?.querySelector(`[data-nav="${activeSection}"]`);
      if (activeLink) {
        const parent = activeLink.parentElement;
        if (parent) {
          gsap.to(indicatorRef.current, {
            width: parent.offsetWidth,
            x: parent.offsetLeft,
            duration: 0.4,
            ease: "power3.out",
          });
        }
      }
    }
  }, [activeSection]);

  const handleClick = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        aria-label={t("common.primaryNav")}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-elegant mx-4 border border-brand/10" : "bg-transparent"
        }`}
      >
        <a
          href="#home"
          className="group relative flex items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            handleClick("home");
          }}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm text-warm-ink font-bold text-lg shadow-warm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            L
          </span>
          <span className="text-gradient font-heading text-lg font-bold tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block">
            Levina
          </span>
        </a>

        <div className="relative hidden items-center md:flex">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[3px] rounded-full bg-gradient-warm"
            style={{ width: 0 }}
          />
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((n) => (
              <li key={n.id}>
                <a
                  data-nav={n.id}
                  href={`#${n.id}`}
                  aria-current={activeSection === n.id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(n.id);
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === n.id
                      ? "text-brand bg-brand/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-brand/5"
                  }`}
                >
                  {t(NAV_LABEL_KEYS[n.id])}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/levina-chifie-cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-gradient-warm px-4 py-2 text-sm font-semibold text-warm-ink shadow-warm transition-all duration-300 hover:scale-105 hover:shadow-lg sm:flex"
          >
            <FaDownload className="text-xs transition-transform group-hover:-translate-y-0.5" />
            <span>{t("common.cv")}</span>
          </a>

          <button
            onClick={() => setLanguage(language === "en" ? "sw" : "en")}
            aria-label={
              language === "en" ? t("common.switchToSwahili") : t("common.switchToEnglish")
            }
            title={language === "en" ? t("common.switchToSwahili") : t("common.switchToEnglish")}
            className="inline-flex h-10 w-10 items-center justify-center gap-1 rounded-full glass text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-glow hover:bg-brand/10"
          >
            <FaGlobe className="text-[10px] text-muted-foreground" aria-hidden="true" />
            {language === "en" ? "SW" : "EN"}
          </button>

          <button
            onClick={toggle}
            aria-label={theme === "dark" ? t("common.switchToLight") : t("common.switchToDark")}
            className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full glass transition-all duration-300 hover:scale-105 hover:shadow-glow hover:bg-brand/10"
          >
            <span
              className="absolute inset-0 -translate-y-full bg-gradient-primary opacity-20 transition-transform duration-400 group-hover:translate-y-0"
              aria-hidden="true"
            />
            <span className="relative transition-transform duration-300 group-hover:rotate-12">
              {theme === "dark" ? <FaSun className="text-brand-light" /> : <FaMoon />}
            </span>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-all duration-300 hover:scale-105 hover:shadow-glow md:hidden"
          >
            {open ? <FaTimes className="text-brand" /> : <FaBars />}
          </button>
        </div>
      </nav>

      {open && (
        <nav
          id="mobile-menu"
          ref={mobileMenuRef}
          aria-label={t("common.siteNav")}
          className="mx-4 mt-2 rounded-2xl glass-strong border border-brand/10 p-3 shadow-elegant md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={activeSection === n.id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(n.id);
                  }}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeSection === n.id
                      ? "bg-brand/10 text-brand"
                      : "hover:bg-brand/5 hover:text-foreground"
                  }`}
                >
                  {t(NAV_LABEL_KEYS[n.id])}
                </a>
              </li>
            ))}
            <li className="mt-2 pt-2 border-t border-border/50">
              <a
                href="/levina-chifie-cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-gradient-warm px-4 py-3 text-sm font-semibold text-warm-ink"
              >
                <FaDownload className="text-xs" />
                {t("common.downloadCV")}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
