import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete,
    });

    const chars = "dev chifie";
    const logoEl = logoRef.current;
    if (logoEl) {
      logoEl.innerHTML = "";
      [...chars].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(40px) rotateX(40deg)";
        span.style.fontFamily = "'Playfair Display', Georgia, serif";
        span.style.fontStyle = "italic";
        span.style.fontWeight = "600";
        span.style.fontSize = "clamp(2.5rem, 6vw, 4.5rem)";
        span.style.background = "linear-gradient(135deg, #faf0ca, #9db0c8)";
        span.style.webkitBackgroundClip = "text";
        span.style.webkitTextFillColor = "transparent";
        span.style.backgroundClip = "text";
        logoEl.appendChild(span);
      });

      const spans = logoEl.querySelectorAll("span");

      tl.to(spans, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
      }).to(
        spans,
        {
          y: -20,
          opacity: 0,
          rotateX: -40,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.in",
        },
        "+=0.8",
      );
    }

    if (barRef.current) {
      tl.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.4",
      );
    }

    if (textRef.current) {
      tl.to(textRef.current, { opacity: 0, y: -10, duration: 0.3 }, "-=0.2");
    }

    tl.to(
      containerRef.current,
      {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.2",
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      role="status"
      aria-label="Loading Levina Chifie portfolio"
      style={{
        background: "#0a1d33",
        perspective: "1000px",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #9db0c8 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-brand/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-brand-light/10 blur-[80px]"
      />

      <div ref={logoRef} className="relative z-10 flex items-center gap-1" />

      <div className="relative z-10 mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left rounded-full animate-shimmer"
          style={{
            background: "linear-gradient(90deg, #f4d35e, #f95738, #f4d35e)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div
        ref={textRef}
        className="relative z-10 mt-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40"
      >
        Loading portfolio
      </div>
    </div>
  );
}
