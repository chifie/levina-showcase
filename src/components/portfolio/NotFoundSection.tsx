import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFoundSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate 404 number
      if (numRef.current) {
        const digits = numRef.current.querySelectorAll("span");
        tl.fromTo(
          digits,
          { opacity: 0, y: 80, rotateX: -60, scale: 0.8 },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.7)" }
        );
      }

      // Animate text
      if (textRef.current) {
        const els = textRef.current.querySelectorAll("[data-el]");
        tl.fromTo(
          els,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2"
        );
      }

      // Floating orbs
      const orbs = containerRef.current?.querySelectorAll("[data-orb]");
      if (orbs) {
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            x: `+=${(i % 2 === 0 ? 30 : -30)}`,
            y: `+=${(i % 2 === 0 ? -20 : 20)}`,
            scale: 1.05,
            duration: 4 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.8,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* Background orbs */}
      <div
        data-orb
        className="pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(217,70,239,0.3), transparent 70%)" }}
      />
      <div
        data-orb
        className="pointer-events-none absolute -bottom-32 -right-32 h-[350px] w-[350px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)" }}
      />
      <div
        data-orb
        className="pointer-events-none absolute left-1/3 top-1/4 h-48 w-48 rounded-full opacity-10 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(217,70,239,0.2), transparent 70%)" }}
      />

      <div className="relative z-10 text-center">
        {/* 404 */}
        <div ref={numRef} className="mb-6">
          <span className="inline-block font-heading text-[10rem] font-bold leading-none md:text-[14rem]" style={{ perspective: "800px" }}>
            {["4", "0", "4"].map((d, i) => (
              <span
                key={i}
                className="inline-block text-gradient"
                style={{ opacity: 0, transform: "translateY(80px) rotateX(-60deg)" }}
              >
                {d}
              </span>
            ))}
          </span>
        </div>

        {/* Text */}
        <div ref={textRef}>
          <h2 data-el className="font-heading text-2xl font-bold md:text-3xl" style={{ opacity: 0 }}>
            Page Not Found
          </h2>
          <p data-el className="mx-auto mt-3 max-w-md text-muted-foreground" style={{ opacity: 0 }}>
            Oops! The page you&apos;re looking for has wandered off into the digital wilderness.
            Let&apos;s get you back on track.
          </p>

          <div data-el className="mt-8 flex flex-wrap items-center justify-center gap-3" style={{ opacity: 0 }}>
            <a
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-elegant"
            >
              <FaHome className="transition-transform group-hover:-translate-y-0.5" />
              Go Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full glass-strong border border-fuchsia-500/20 px-7 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
