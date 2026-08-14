export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  /** URL slug used by the /blog/:slug detail route. */
  slug: string;
  /** Paragraphs rendered on the article page. */
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Building Scalable REST APIs with FastAPI",
    excerpt:
      "A practical guide to structuring FastAPI projects for maintainability, performance, and long-term scalability — from routers and schemas to dependency injection.",
    category: "Backend",
    date: "July 2026",
    readTime: "6 min read",
    color: "#f95738",
    slug: "building-scalable-rest-apis-with-fastapi",
    content: [
      "FastAPI has quickly become one of my favourite tools for building backend services. It combines modern Python type hints with automatic OpenAPI documentation, giving you validation, serialization, and an interactive API explorer almost for free. What starts as a small prototype can grow into a production service without fighting the framework.",
      "The first thing I do on every FastAPI project is separate concerns. I keep routers in their own modules, Pydantic schemas in a schemas package, database access behind repositories or services, and business logic out of the route handlers. Routes stay thin: they parse the request, call a service, and return a response. When every file has one clear job, adding a new endpoint rarely means touching unrelated code.",
      "Pydantic schemas are where FastAPI really shines. Defining request and response models with type hints gives you validation, serialization, and documentation in one step. I also use response_model on every endpoint so the API contract is explicit, and I keep versioned schema files so breaking changes are deliberate rather than accidental.",
      "Dependency injection is another feature I rely on constantly. Shared dependencies — like a database session, an authenticated user, or pagination parameters — are declared once and reused across routes. This keeps handlers honest about what they need and makes testing straightforward: replace a dependency with a stub and the whole handler becomes testable.",
      "Performance matters too. FastAPI is built on Starlette and runs async natively, so I/O-bound work like database calls or external HTTP requests can run concurrently without threads. I also lean on background tasks for things like sending emails or generating reports after the response has been sent, keeping request latency low.",
      "Finally, I make testing part of the workflow rather than an afterthought. FastAPI's TestClient makes integration tests simple, and because the OpenAPI schema is generated automatically, it doubles as living documentation for frontend teams and API consumers. Combined, these practices keep the API fast to build and, more importantly, fast to change.",
    ],
  },
  {
    title: "Why Flutter is My Go-To for Cross-Platform Apps",
    excerpt:
      "From a single Dart codebase to native-quality experiences on both iOS and Android — here is how Flutter accelerates my mobile development workflow.",
    category: "Mobile",
    date: "June 2026",
    readTime: "4 min read",
    color: "#ee964b",
    slug: "why-flutter-is-my-go-to-for-cross-platform-apps",
    content: [
      "When a client asks for an app on both iOS and Android, Flutter is my default answer. A single Dart codebase compiles to native code for both platforms, which means one team, one codebase, and one set of business logic — while still delivering a genuinely native feel.",
      "The widget model is what makes Flutter so productive. Everything is a widget, from layout containers to animations, and widgets compose like building blocks. I can build a custom screen out of small, reusable pieces, hot reload shows the result almost instantly, and the UI stays pixel-consistent because Flutter draws its own pixels rather than relying on platform primitives.",
      "Dart is a pleasant language to work with too. It is strongly typed, which catches entire categories of bugs before the app even runs, and its async/await model maps naturally to the network calls and state changes every mobile app needs. The tooling — formatting, analysis, and the debugger — is fast and opinionated, which keeps the codebase tidy.",
      "For state management I keep things simple and intentional. Whether I reach for Provider or Riverpod depends on the project size, but the principle stays the same: separate UI from logic so screens stay readable and testable. A well-structured Flutter project is a joy to extend months later.",
      "Performance is where skeptics are usually won over. Flutter renders with its own engine, which means animations run at a smooth 60 or 120 frames per second, and the renderer stays consistent across devices. Push notifications, local storage, and platform channels cover everything I need when the app has to talk to the underlying platform.",
      "Cross-platform development is never one-size-fits-all, but for most products Flutter is the pragmatic choice: one investment, two stores, and a development loop fast enough to keep iterating on real user feedback.",
    ],
  },
  {
    title: "Designing Interfaces Users Actually Enjoy",
    excerpt:
      "Exploring the intersection of clean architecture and elegant UI — and the small interaction details that turn a functional screen into a delightful one.",
    category: "Design",
    date: "May 2026",
    readTime: "5 min read",
    color: "#f4d35e",
    slug: "designing-interfaces-users-actually-enjoy",
    content: [
      "A screen can be perfectly functional and still feel frustrating. The difference between an interface users merely tolerate and one they enjoy is rarely a single feature — it is a thousand small decisions about hierarchy, motion, and feedback. Good design is invisible; it simply makes the right thing easy to do.",
      "I start with a clear visual hierarchy. Typography, spacing, and color should tell the user what matters first, second, and third without them having to read a single word. A consistent scale of type sizes and a deliberate spacing rhythm give a page structure, while one strong accent color directs attention to the actions that matter.",
      "Contrast and readability are non-negotiable. If text is hard to read or a button is indistinguishable from the background, nothing else about the design matters. I check my palettes against contrast guidelines, and I always design in both light and dark themes, because what looks elegant in one can fall apart in the other.",
      "Motion is a language, not decoration. A well-placed transition explains where an element came from and where it is going; animation that serves no purpose is just noise. I keep animations short, easing-based, and meaningful — and I always respect reduced-motion preferences, because accessibility is part of the design, not an afterthought.",
      "The smallest details carry the most personality. A button that nudges slightly on hover, a label that floats above an input when it is focused, a subtle glow on an active state — these micro-interactions make an interface feel alive and cared for. They cost little to build and they shape how users feel about the product every single day.",
      "Finally, I test with real users early and often. Interfaces designed in isolation are guesses; interfaces refined against real behaviour are products. Pairing clean architecture with elegant, considered UI is what turns a functional screen into one users actually enjoy.",
    ],
  },
];

export const BLOG_CATEGORIES = ["Backend", "Mobile", "Design"] as const;
