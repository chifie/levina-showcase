import { useState, useEffect } from "react";
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

  return (
    <>
      <FontLoader />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={loading ? "invisible" : "visible"}>
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
