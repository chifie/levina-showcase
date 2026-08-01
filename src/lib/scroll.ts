import { prefersReducedMotion } from "@/lib/motion";

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}
