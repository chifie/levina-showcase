export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Building Scalable REST APIs with FastAPI",
    excerpt:
      "A practical guide to structuring FastAPI projects for maintainability, performance, and long-term scalability — from routers and schemas to dependency injection.",
    category: "Backend",
    date: "July 2026",
    readTime: "6 min read",
    color: "#0d3b66",
  },
  {
    title: "Why Flutter is My Go-To for Cross-Platform Apps",
    excerpt:
      "From a single Dart codebase to native-quality experiences on both iOS and Android — here is how Flutter accelerates my mobile development workflow.",
    category: "Mobile",
    date: "June 2026",
    readTime: "4 min read",
    color: "#3e5f8e",
  },
  {
    title: "Designing Interfaces Users Actually Enjoy",
    excerpt:
      "Exploring the intersection of clean architecture and elegant UI — and the small interaction details that turn a functional screen into a delightful one.",
    category: "Design",
    date: "May 2026",
    readTime: "5 min read",
    color: "#082a4c",
  },
];

export const BLOG_CATEGORIES = ["Backend", "Mobile", "Design"] as const;
