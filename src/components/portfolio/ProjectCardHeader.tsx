import { useState } from "react";
import { FaExpand, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/projects";

export default function ProjectCardHeader({
  project,
  onExpand,
}: {
  project: Project;
  onExpand?: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`shine-sweep relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient} lg:h-48`}
    >
      <div className="absolute inset-0 bg-black/10" />
      {project.screenshot && !imageFailed ? (
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onClick={onExpand}
          onError={() => setImageFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110 select-none ${
            onExpand ? "cursor-zoom-in" : ""
          }`}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`font-heading text-6xl font-bold drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 lg:text-7xl ${
                project.ink === "dark" ? "text-warm-ink" : "text-white"
              }`}
            >
              {project.initials}
            </span>
          </div>
        </>
      )}
      {project.mobileScreenshot && (
        <div
          className="absolute right-4 bottom-4 w-[72px] overflow-hidden rounded-[1.05rem] border-2 border-white/70 shadow-lg transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:border-white sm:w-[84px]"
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1.5 z-10 h-1 w-5 -translate-x-1/2 rounded-full bg-white/70" />
          <img
            src={project.mobileScreenshot}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block w-full select-none object-cover object-top"
            style={{ aspectRatio: "9 / 18" }}
          />
        </div>
      )}
      {project.tabletScreenshot && (
        <div
          className="absolute bottom-4 left-4 w-16 overflow-hidden rounded-lg border-2 border-white/70 shadow-lg transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:border-white sm:w-20"
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1 z-10 h-1 w-4 -translate-x-1/2 rounded-full bg-white/60" />
          <img
            src={project.tabletScreenshot}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block w-full select-none object-cover object-top"
            style={{ aspectRatio: "3 / 4" }}
          />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
        {onExpand && project.screenshot && !imageFailed && (
          <button
            type="button"
            onClick={onExpand}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`Open ${project.title} screenshot preview`}
          >
            <FaExpand className="text-lg" />
          </button>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <FaGithub className="text-lg" />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`View ${project.title} live demo`}
          >
            <FaExternalLinkAlt className="text-lg" />
          </a>
        )}
      </div>
    </div>
  );
}
