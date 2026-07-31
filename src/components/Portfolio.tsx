import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { prefersReducedMotion } from "@/lib/motion";
import Preloader from "@/components/portfolio/Preloader";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Services from "@/components/portfolio/Services";
import Projects from "@/components/portfolio/Projects";
import Blog from "@/components/portfolio/Blog";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

gsap.registerPlugin(Flip);

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap";
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

  useEffect(() => {
    if (!loading || !contentRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(contentRef.current, { autoAlpha: 1 });
      gsap.set(contentRef.current.querySelectorAll("section, header, footer"), { autoAlpha: 1 });
      return;
    }

    const sections = contentRef.current.querySelectorAll("section, header, footer");
    if (sections.length === 0) return;

    const flipState = Flip.getState(sections);

    gsap.set(sections, { autoAlpha: 0, y: 20 });

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
          <Services />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
