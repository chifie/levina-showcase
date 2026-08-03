import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals the `[data-anim]` elements inside a SectionHeader once the header
 * scrolls into view. Respects prefers-reduced-motion by rendering statically.
 */
export function useSectionHeaderReveal(headerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (prefersReducedMotion()) {
      gsap.set(header.querySelectorAll("[data-anim]"), { opacity: 1, y: 0 });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          header.querySelectorAll("[data-anim]"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        );
      },
    });

    return () => trigger.kill();
  }, [headerRef]);
}
