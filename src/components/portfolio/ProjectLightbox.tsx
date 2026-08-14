import { useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import type { Project } from "@/lib/projects";

export default function ProjectLightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot preview`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
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

      <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
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
      </figure>
    </div>
  );
}
