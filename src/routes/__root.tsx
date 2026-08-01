import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Levina Chifie — Full Stack Software Developer & Mobile App Developer" },
      {
        name: "description",
        content:
          "Levina Chifie — Graduate-level Full Stack Software Developer and Mobile App Developer crafting modern, scalable web and mobile applications. Specializing in React, TypeScript, FastAPI, NestJS, Flutter, and PostgreSQL.",
      },
      { name: "author", content: "Levina Chifie" },
      {
        name: "keywords",
        content:
          "Levina Chifie, Full-Stack Developer, Female Developer, React, TypeScript, Next.js, Node.js, Portfolio, Web Developer, Software Engineer, UI/UX, Tailwind CSS, GSAP",
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
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        href: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        href: "/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon-64.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "canonical",
        href: "https://levinachifie.dev",
      },
    ],
    scripts: [
      {
        // Apply the saved theme before hydration to avoid a flash of the wrong theme.
        children: `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
