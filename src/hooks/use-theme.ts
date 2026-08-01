import { useEffect, useState } from "react";

export function useTheme() {
  // Initialized to a constant so server and client first render match (no
  // hydration mismatch). The inline script in the root head applies the saved
  // theme class before paint, and this effect syncs state after mount.
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as "light" | "dark" | null;
    const initial =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem("theme", next);
      return next;
    });
  };

  return { theme, toggle };
}
