import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaTimes, FaKeyboard } from "react-icons/fa";

const SHORTCUTS = [
  { keys: ["?"], description: "Toggle this help menu" },
  { keys: ["D"], description: "Toggle dark/light mode" },
  { keys: ["T"], description: "Scroll to top" },
  { keys: ["H"], description: "Go to Home section" },
  { keys: ["A"], description: "Go to About section" },
  { keys: ["S"], description: "Go to Skills section" },
  { keys: ["P"], description: "Go to Projects section" },
  { keys: ["C"], description: "Go to Contact section" },
];

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Toggle with ? key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "?" && !e.shiftKey) {
        setOpen((prev) => !prev);
        return;
      }

      // Other shortcuts only when panel is not focused
      if (e.key === "d" || e.key === "D") {
        // Dispatch click on theme toggle button
        const themeBtn = document.querySelector('[aria-label="Toggle theme"]');
        if (themeBtn instanceof HTMLButtonElement) themeBtn.click();
        return;
      }

      if (e.key === "t" || e.key === "T") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const sectionKeys: Record<string, string> = {
        h: "home", a: "about", s: "skills", p: "projects", c: "contact",
      };
      const key = e.key.toLowerCase();
      if (sectionKeys[key]) {
        document.getElementById(sectionKeys[key])?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Animate panel
  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      setVisible(true);
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setVisible(false),
      });
    }
  }, [open]);

  // Auto-hide badge after 5 seconds on first load
  useEffect(() => {
    const shown = sessionStorage.getItem("shortcuts-hint-shown");
    if (!shown) {
      const timer = setTimeout(() => {
        if (badgeRef.current) {
          gsap.to(badgeRef.current, { opacity: 0, y: 10, duration: 0.5, onComplete: () => { if (badgeRef.current) badgeRef.current.style.display = "none"; } });
        }
        sessionStorage.setItem("shortcuts-hint-shown", "true");
      }, 8000);
      return () => clearTimeout(timer);
    } else if (badgeRef.current) {
      badgeRef.current.style.display = "none";
    }
  }, []);

  return (
    <>
      {/* Floating badge hint */}
      <div
        ref={badgeRef}
        className="fixed bottom-6 left-6 z-30 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="group inline-flex items-center gap-2 rounded-full glass-strong border border-fuchsia-500/20 px-3 py-2 shadow-elegant transition-all duration-300 hover:shadow-glow hover:scale-105">
          <FaKeyboard className="text-xs text-fuchsia-500" />
          <span className="text-[10px] font-medium text-muted-foreground">
            Press <kbd className="rounded bg-fuchsia-500/20 px-1 py-0.5 text-[9px] font-mono text-fuchsia-500">?</kbd> for shortcuts
          </span>
        </div>
      </div>

      {/* Modal backdrop */}
      {visible && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl glass-strong border border-fuchsia-500/20 p-6 shadow-elegant mx-4"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaKeyboard className="text-fuchsia-500" />
                <h3 className="font-heading text-base font-bold">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-fuchsia-500/10 transition-colors"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Shortcuts list */}
            <div className="space-y-1">
              {SHORTCUTS.map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-fuchsia-500/5 transition-colors"
                >
                  <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className="inline-flex min-w-[24px] items-center justify-center rounded-md border border-fuchsia-500/20 bg-background px-1.5 py-0.5 text-[11px] font-mono font-medium text-fuchsia-500 shadow-sm"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] text-muted-foreground text-center">
              Press <kbd className="rounded bg-fuchsia-500/20 px-1 py-0.5 text-[9px] font-mono text-fuchsia-500">?</kbd> again to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
