import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Levina Chifie — Full-Stack Developer & Creative Technologist" },
      {
        name: "description",
        content:
          "Levina Chifie — A passionate Full-Stack Software Developer crafting modern, elegant digital experiences. Specializing in React, TypeScript, Node.js, and cloud-native applications. Explore my portfolio of web apps, mobile apps, and backend systems.",
      },
      {
        name: "keywords",
        content:
          "Levina Chifie, Full-Stack Developer, Female Developer, React Developer, TypeScript, Next.js, Node.js, NestJS, PostgreSQL, Tailwind CSS, GSAP, Portfolio, Web Developer, Software Engineer, UI/UX Designer, Creative Technologist",
      },
      { property: "og:title", content: "Levina Chifie — Full-Stack Developer & Creative Technologist" },
      {
        property: "og:description",
        content:
          "Crafting modern digital experiences with clean code and elegant design. Explore my portfolio of web applications, mobile apps, and backend systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://levinachifie.dev" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:site_name", content: "Levina Chifie Portfolio" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Levina Chifie — Full-Stack Developer" },
      {
        name: "twitter:description",
        content:
          "Crafting modern digital experiences with clean code and elegant design.",
      },
      { name: "twitter:image", content: "/og-image.png" },
      { name: "twitter:creator", content: "@levinachifie" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#d946ef" },
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
