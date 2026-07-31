import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Levina Chifie — Full Stack Software Developer & Mobile App Developer" },
      {
        name: "description",
        content:
          "Levina Chifie — Graduate-level Full Stack Software Developer and Mobile App Developer crafting modern, scalable web and mobile applications. Explore my portfolio of professional projects built with React, Next.js, FastAPI, NestJS, Flutter, and more.",
      },
      {
        name: "keywords",
        content:
          "Levina Chifie, Full Stack Software Developer, Mobile App Developer, React Developer, TypeScript, Next.js, FastAPI, NestJS, Flutter, Tailwind CSS, GSAP, Portfolio, Professional Developer, Software Engineer",
      },
      {
        property: "og:title",
        content: "Levina Chifie — Full Stack Software Developer & Mobile App Developer",
      },
      {
        property: "og:description",
        content:
          "Graduate-level Full Stack Software Developer and Mobile App Developer building modern, scalable web and mobile applications with clean code and elegant design.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://levinachifie.dev" },
      { property: "og:image", content: "https://levinachifie.dev/og-image.png" },
      { property: "og:site_name", content: "Levina Chifie Portfolio" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Levina Chifie — Full Stack Software Developer & Mobile App Developer",
      },
      {
        name: "twitter:description",
        content:
          "Graduate-level Full Stack Software Developer and Mobile App Developer building modern, scalable web and mobile applications.",
      },
      { name: "twitter:image", content: "https://levinachifie.dev/og-image.png" },
      { name: "twitter:creator", content: "@levinachifie" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#6c7a94" },
      { name: "application-name", content: "Levina Chifie Portfolio" },
      { name: "apple-mobile-web-app-title", content: "Levina Chifie" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ],
    links: [{ rel: "canonical", href: "https://levinachifie.dev" }],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
