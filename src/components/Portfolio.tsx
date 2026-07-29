import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Preloader from "@/components/portfolio/Preloader";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import GitHubSection from "@/components/portfolio/GitHubSection";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

gsap.registerPlugin(Flip);

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return null;
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP Flip transition on page load after preloader exits
  useEffect(() => {
    if (!loading && contentRef.current) {
      const sections = contentRef.current.querySelectorAll("section, header, footer");
      if (sections.length === 0) return;

      const flipState = Flip.getState(sections);

      // Initial state before Flip
      gsap.set(sections, { autoAlpha: 0, y: 20 });

      // Delay Flip to let preloader exit animation finish
      gsap.delayedCall(0.9, () => {
        gsap.set(contentRef.current, { autoAlpha: 1 });
        gsap.set(sections, { autoAlpha: 1 });
        Flip.from(flipState, {
          duration: 0.8,
          ease: "power3.inOut",
          stagger: 0.04,
          simple: true,
          absolute: true,
          fade: true,
        });
      });
    }
  }, [loading]);

  return (
    <>
      <FontLoader />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div ref={contentRef} className={loading ? "invisible" : "visible"}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <GitHubSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
