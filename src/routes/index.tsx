import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Levina Chifie — Full-Stack Developer Portfolio" },
      {
        name: "description",
        content:
          "Levina Chifie — Computer Science student and future Full-Stack Developer crafting modern, elegant digital experiences with React, Tailwind, PHP and more.",
      },
      {
        name: "keywords",
        content:
          "Levina Chifie, Full-Stack Developer, React, Tailwind CSS, PHP, Portfolio, Web Developer",
      },
      { property: "og:title", content: "Levina Chifie — Full-Stack Developer Portfolio" },
      {
        property: "og:description",
        content: "Modern, elegant digital experiences crafted with passion and creativity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Levina Chifie — Full-Stack Developer" },
      { name: "twitter:description", content: "Modern, elegant digital experiences." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
