import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import type { Project } from "@/lib/projects";

const CLOSE_THRESHOLD = 80;

export default function ProjectLightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startYRef = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Trap focus inside the dialog so Tab never escapes to the page behind.
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const previousOverflow = document.body.style.overflow;
    // iOS needs position: fixed on the body in addition to overflow: hidden.
    const previousPosition = document.body.style.position;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.inset = "0";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.inset = "";
    };
  }, [onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null) return;
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0) setDragY(Math.min(delta, 260));
  };

  const onTouchEnd = () => {
    if (dragY > CLOSE_THRESHOLD) onClose();
    else setDragY(0);
    startYRef.current = null;
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot preview`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overscroll-contain"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close screenshot preview"
        className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <FaTimes />
      </button>

      <figure
        className="max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          opacity: dragY > 0 ? 1 - dragY / 400 : undefined,
          transition:
            startYRef.current === null ? "transform 0.25s ease, opacity 0.25s ease" : undefined,
        }}
      >
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="max-h-[78vh] w-auto rounded-2xl border border-white/10 shadow-2xl"
        />
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-white/85">
          <span className="font-heading font-bold">{project.title}</span>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-4 py-2 text-xs font-semibold text-warm-ink transition-all duration-300 hover:scale-105"
            >
              Visit live site
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
        </figcaption>
        <p className="mt-5 text-center text-[11px] text-white/45">
          Press Esc to close · Swipe down to close
        </p>
      </figure>
    </div>
  );
}
