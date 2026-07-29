import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    const chars = "LEVINA";
    const logoEl = logoRef.current;
    if (logoEl) {
      logoEl.innerHTML = "";
      // Build letters
      [...chars].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(40px) rotateX(40deg)";
        span.style.fontFamily = "Space Grotesk, sans-serif";
        span.style.fontWeight = "700";
        span.style.fontSize = "clamp(2.5rem, 6vw, 4.5rem)";
        span.style.background = "linear-gradient(135deg, #f97316, #fb923c)";
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
        "+=0.8"
      );
    }

    // Progress bar
    if (barRef.current) {
      tl.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.4"
      );
    }

    // Loading text
    if (textRef.current) {
      tl.to(
        textRef.current,
        { opacity: 0, y: -10, duration: 0.3 },
        "-=0.2"
      );
    }

    tl.to(
      containerRef.current,
      {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "#0f172a",
        perspective: "1000px",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-orange-400/10 blur-[80px]" />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 flex items-center gap-1" />

      {/* Progress bar */}
      <div className="relative z-10 mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left rounded-full"
          style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}
        />
      </div>

      {/* Loading text */}
      <div
        ref={textRef}
        className="relative z-10 mt-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40"
      >
        Loading Experience
      </div>
    </div>
  );
}
