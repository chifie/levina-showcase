# Levina Chifie — Portfolio

A modern, animated portfolio website built with **React**, **TypeScript**, **TanStack Start**, **GSAP**, and **Tailwind CSS v4**. Featuring a navy blue (Yale Blue) and cream (Lemon Chiffon) brand identity with warm "sunshine" accents (maize, orange, terracotta), smooth scroll animations, and a fully responsive layout.

## ✨ Features

- Animated preloader and GSAP scroll-triggered reveals
- Hero section with circular profile photo and floating tech icons
- About, Skills, Services, Projects, Blog, and Contact sections
- Dark / light theme support with brand tokens
- **English / Swahili language toggle** (navbar globe, persisted)
- **Project search + technology filters** with a live results count
- Responsive design across mobile and desktop
- Magnetic buttons, ripple effects, and custom cursor

## 🛠 Tech Stack

| Area       | Technologies                                          |
| ---------- | ----------------------------------------------------- |
| Frontend   | React 19, TypeScript, TanStack Start, Tailwind CSS v4 |
| Animation  | GSAP, ScrollTrigger                                   |
| Icons      | React Icons                                           |
| Fonts      | Playfair Display, Inter                               |
| Styling    | Tailwind CSS                                          |
| Deployment | Cloudflare Workers (Wrangler)                         |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Lint the codebase
npm run lint

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Portfolio.tsx        # Main layout composition
│   ├── portfolio/           # Section components (Hero, About, Skills, Blog...)
│   └── ui/                  # Reusable UI primitives
├── routes/                  # TanStack Router routes
├── lib/                     # Utilities and error handling
├── styles.css               # Theme tokens and global styles
└── assets/                  # Images
```

## ☁️ Deployment

This project is configured to deploy to **Cloudflare Workers** via Wrangler:

```bash
npm run build
npx wrangler deploy
```

The live site is hosted at [https://levinachifie.dev](https://levinachifie.dev).

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📊 Badges

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Playfair Display](https://img.shields.io/badge/Font-Playfair_Display-3e5f8e?style=flat-square)

## 🙏 Acknowledgements

- [TanStack Start](https://tanstack.com/start) for the full-stack React framework
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) for elegant serif headings
- [GSAP](https://gsap.com) for buttery-smooth animations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [React Icons](https://react-icons.github.io/react-icons) for the icon set

## 👩‍💻 About the Author

**Levina Chifie** is a full stack software developer and mobile app developer based in Tanzania, passionate about building clean, scalable applications across web and mobile.

- 🌐 [Website](https://levinachifie.dev)
- 📝 [Blog](https://levinachifie.dev#blog)
- 🐙 [GitHub](https://github.com/chifie)
- 💼 [LinkedIn](https://linkedin.com/in/levinachifie)
- ✉️ [Email](mailto:levinachifie016@gmail.com)

## 🗺 Roadmap

- [x] Add blog section
- [x] Add blog detail pages (`/blog` and `/blog/:slug`)
- [x] Add live project screenshots to cards
- [x] Add multilingual support (EN / SW)
- [x] Add project search and filters

## ⚙️ Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the Vite dev server     |
| `npm run build`     | Build for production          |
| `npm run lint`      | Lint the codebase with ESLint |
| `npm run typecheck` | Run TypeScript type checking  |
| `npm run format`    | Format with Prettier          |

## 🧩 Customization

To change the brand colors, edit the theme tokens in `src/styles.css`:

```css
:root {
  --brand: #0d3b66;
  --brand-light: #3e5f8e;
  --brand-dark: #082a4c;
  --background: #faf0ca;
  --maize: #f4d35e;
  --sunset: #ee964b;
  --terra: #f95738;
}
```

To add or edit projects, update the typed `PROJECTS` array in `src/lib/projects.ts`.

### Language (EN / SW)

The site ships English and Swahili dictionaries in `src/lib/i18n.tsx` — every UI string is a typed translation key, and a globe toggle in the navbar switches languages (persisted in `localStorage`, falls back to the browser language). To add a string, add the key to **both** dictionaries (TypeScript enforces parity); to add a language, extend the `translations` object with a new key.

To add or edit skills, update the typed `SKILL_CATEGORIES` array in `src/lib/skills.ts`.

### Fonts

Heading and body fonts are configured via the `--font-heading` and `--font-body` tokens in `src/styles.css`. Replace them with any Google Font of your choice and update the `FontLoader` in `src/components/Portfolio.tsx`.

### Blog posts

Edit `src/lib/blog-posts.ts` and add an entry to `BLOG_POSTS` with a title, excerpt, category, date, read time, a unique `slug`, and `content` paragraphs. The blog cards and `/blog/:slug` article pages render automatically — no other changes needed.

## 💡 FAQ

**How can I contact you for work?**

Use the contact form on the site or email [levinachifie016@gmail.com](mailto:levinachifie016@gmail.com).

**What technologies do you specialize in?**

Languages: JavaScript, TypeScript, Python, and PHP — plus React, Next.js, FastAPI, NestJS, Flutter, PostgreSQL, Docker, and more. See the Skills section on the live site for the full list.

**How do I add a new project?**

Add an entry to the typed `PROJECTS` array in `src/lib/projects.ts` with title, description, tech stack, gradient, and links. Set `github` for the source repo, `demo` for the live site, and `admin` for a public admin dashboard (rendered as an extra button on the card). Optionally add a `screenshot` path (an image under `public/screenshots/`) to show a live preview on the card; without one, the card falls back to the gradient header with initials.

**Why do some animations not play on my device?**

The site respects the `prefers-reduced-motion` system setting. Enable "reduce motion" in your OS or browser settings to disable GSAP animations.

## 🚦 Status

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/chifie/levina-showcase)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📚 Resources

- [Live Site](https://levinachifie.dev)
- [GitHub Repository](https://github.com/chifie/levina-showcase)

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on [GitHub](https://github.com/chifie/levina-showcase).

## 📜 Footer

Built with ❤️ by **Levina Chifie** — React, TypeScript, TanStack Start, GSAP & Tailwind CSS.

## 📝 Blog

The site includes a **Blog** section with article cards covering backend engineering, mobile development, and design. Article data lives in `src/lib/blog-posts.ts` and can be extended by adding entries to the `BLOG_POSTS` array.

## ✒️ Typography

Headings use the elegant serif **Playfair Display** (with italic gradient accents on key words), while body text uses **Inter** for readability. Fonts are loaded via Google Fonts in `src/components/Portfolio.tsx` and theme tokens are defined in `src/styles.css`.

## ♿ Accessibility

- Keyboard-friendly navigation with visible `:focus-visible` outlines
- ARIA roles and labels on preloader, progress bars, and form inputs
- `aria-current` marks the active navbar link
- `prefers-reduced-motion` support: all GSAP animations are skipped and content is revealed statically via `src/lib/motion.ts`

## ⚡ Performance

- Fonts are loaded once via Google Fonts with `display=swap`
- Hero image uses `loading="eager"` + `decoding="async"` for above-the-fold rendering
- All animations use GSAP with GPU-friendly transforms only

## 🧪 Testing

Run the type check and linter before opening a PR:

```bash
npm run typecheck
npm run lint
```

## 🚑 Troubleshooting

**The dev server fails to start** — ensure Node.js 20+ is installed and run `npm install` first.

**Fonts look wrong in development** — hard refresh (Ctrl+Shift+R) to clear the cached font stylesheet.

## 🖼 Screenshots

| Section  | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| Hero     | Full-screen intro with circular profile photo and floating tech icons |
| Projects | Project cards with distinct gradient headers, tech badges, and live/admin links |
| Blog     | Article cards with category badges, dates, and read times             |
| Contact  | Info cards plus a floating-label contact form with honeypot           |

### Project card screenshots

Live project cards show a WebP screenshot of the deployed site instead of a bare gradient header — with phone- and tablet-viewport previews in device frames for responsive projects, and an automatic fallback to the gradient + initials if a screenshot ever fails to load. Clicking a screenshot (or its expand button) opens a fullscreen lightbox with a link to the live site; close it with Esc, the ✕ button, or a downward swipe (focus is trapped inside for keyboard users). Screenshots live in `public/screenshots/` and are captured with headless Chrome via the scripts in `scripts/`:

```bash
npm run screenshots                  # recapture the external live sites
npm run screenshots -- --local       # also recapture this portfolio from its production build
```

Requires Chrome/Chromium, Node 22+, and ImageMagick. External captures hit each project's live deployment; `--local` builds the site and serves it through the Cloudflare worker (`wrangler dev`) so the portfolio card shows real production output. Set `OUT_DIR` to redirect captures (e.g. for dry runs). Update the URLs in `scripts/capture-screenshots.sh` whenever a project is redeployed, then add the resulting file name to the project's `screenshot` / `mobileScreenshot` field in `src/lib/projects.ts`.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. Accessibility and reduced-motion support are part of the definition of done.

## 🔭 What's Next

- [x] Live project screenshots on cards
- [x] Multilingual support (EN / SW)
- [x] Dark-mode tuning for blog cards
- [ ] Deploy the Glory Burger mobile app to a public backend so its card can show a live preview (deploy `GloryBurger_App_Backend` via its `render.yaml`, then point the app at it with `--dart-define=API_BASE_URL`)
- [ ] Blog search and category filters

## 🧑‍💻 Developer Notes

- Keep components in `src/components/portfolio/` and data in `src/lib/`
- Run `npm run check` before pushing to validate types and lint
- Preserve reduced-motion support for every new GSAP animation

## 📊 Project Status

Actively maintained by [Levina Chifie](https://github.com/chifie).

## 🎯 Goals

- Keep the site fast, accessible, and delightful on every device
- Grow the blog with practical engineering articles
- Ship new projects and case studies regularly

## 📬 Feedback

Found a bug or have an idea? Open an [issue](https://github.com/chifie/levina-showcase/issues) or reach out via the contact form on the site.

## 🖼 Profile Photo

The profile photo appears in both the **Hero** (portrait oval frame) and the **About** section (two-column layout). The image lives at `src/assets/chifie.webp` (an optimized WebP) and uses `object-position: center 35%` to keep the head and neck visible.

## 🧠 Design Language

- Portrait oval profile frames with animated spinning rings
- Glass-morphism cards with brand borders and glow shadows
- Gradient accents in brand colors (light → base → dark)
- Navy blue and cream (Yale Blue + Lemon Chiffon) two-color palette

## 🎨 Palette Source

The brand palette follows **Yale Blue `#0d3b66`** and **Lemon Chiffon `#faf0ca`** ("Easy Color Combinations for Content Creators" via Pinterest), extended with the warm "sunshine" accents **maize `#f4d35e`**, **orange `#ee964b`**, and **terracotta `#f95738`** for CTA buttons and highlights. Warm gradients use navy ink text (`--warm-ink`) so contrast stays strong in both light and dark mode.

## 🧭 Sections

| Section  | Description                                             |
| -------- | ------------------------------------------------------- |
| Home     | Hero with portrait photo, intro, CTAs, and social links |
| About    | Photo + story in a two-column layout                    |
| Skills   | Languages-first category cards with proficiency bars    |
| Services | Four service cards with hover reveals                   |
| Projects | Seven project cards with gradient headers               |
| Blog     | Three article cards with category badges                |
| Contact  | Info cards and a floating-label form                    |

## 🧩 Components

- `Portfolio.tsx` — layout composition and font loading
- `Hero.tsx` — intro with portrait oval photo and floating icons
- `About.tsx` — two-column photo + story layout
- `Skills.tsx` — Languages-first category cards with proficiency bars
- `SkillCard.tsx` — single proficiency row with animated bar
- `src/lib/skills.ts` — typed skill categories (Languages, Frontend, Backend, Mobile, Databases, Tools)
- `src/lib/projects.ts` — typed project entries (title, description, tech, links)
- `Services.tsx` — service offering cards
- `Projects.tsx` — project showcase grid with live search + tech filters, driven by `src/lib/projects.ts`
- `src/lib/i18n.tsx` — EN/SW dictionaries, `LanguageProvider`, and the `useI18n` hook
- `ProjectCardHeader.tsx` — gradient header with screenshot/initials fallback, phone preview, and hover actions
- `ProjectLightbox.tsx` — fullscreen screenshot preview with Esc/swipe-to-close, focus trap, and iOS scroll lock
- `Blog.tsx` — article cards driven by `src/lib/blog-posts.ts`
- `src/routes/blog/index.tsx` + `src/routes/blog/$slug.tsx` — blog listing and article pages
- `Contact.tsx` — info cards + form with honeypot
- `Footer.tsx` — navigation, links, scroll progress, cursor
- `Navbar.tsx` — fixed nav with active section indicator
- `Preloader.tsx` — italic serif "dev chifie" flash screen

## 🤖 CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs `npm run typecheck` and `npm run lint` on every push and pull request to `main`.

## 🧾 Blog Categories

Articles are tagged with categories exported from `src/lib/blog-posts.ts` (`BLOG_CATEGORIES`): Backend, Mobile, and Design.

## 📈 Continuous Integration

Every push to `main` triggers the CI workflow which installs dependencies with Bun and runs `typecheck` + `lint`.

## 🚀 Quick Links

- [Live Site](https://levinachifie.dev)
- [GitHub Repo](https://github.com/chifie/levina-showcase)
- [Issues](https://github.com/chifie/levina-showcase/issues)

## 🏷 Blog Category Chips

The Blog header shows category chips (Backend, Mobile, Design) driven by the shared `BLOG_CATEGORIES` constant, keeping labels in sync with article data.

## 📄 Documentation Files

- `README.md` — overview, setup, customization, FAQ
- `CHANGELOG.md` — versioned change log
- `CONTRIBUTING.md` — contribution guidelines
- `SECURITY.md` — security reporting policy
- `LICENSE` — MIT license

## 🎨 Brand Colors

| Token           | Light                     | Dark      |
| --------------- | ------------------------- | --------- |
| `--brand`       | `#0d3b66` (Yale Blue)     | `#c6d6ea` |
| `--brand-light` | `#3e5f8e`                 | `#9db0c8` |
| `--brand-dark`  | `#082a4c`                 | `#faf0ca` |
| `--background`  | `#faf0ca` (Lemon Chiffon) | `#0a1d33` |
| `--maize`       | `#f4d35e`                 | `#f7d96f` |
| `--sunset`      | `#ee964b`                 | `#f0a45c` |
| `--terra`       | `#f95738`                 | `#ff6b4a` |

## 🗺 How to Add a Blog Post

1. Add an entry to `BLOG_POSTS` in `src/lib/blog-posts.ts` (title, excerpt, category, date, readTime, color).
2. Ensure the category exists in `BLOG_CATEGORIES` so the header chip appears.
3. The Blog section renders the card automatically — no other changes needed.

## 🔍 SEO & Metadata

The site ships Open Graph and Twitter card meta tags with absolute URLs, a canonical link, theme-color, and apple-mobile-web-app metadata in `src/routes/index.tsx`. The `<html lang>` attribute follows the selected language.

## 🧭 Navigation

The fixed navbar tracks the active section as you scroll, highlights it with an animated indicator and `aria-current`, and includes a mobile menu. Footer links mirror the same sections.

## ♿ Accessibility & 🔎 SEO

- Skip-to-content link for keyboard users (`#main-content`)
- Mobile menu is a proper `nav` region with `aria-controls`, closes on Escape, locks scroll
- JSON-LD Person structured data for rich results
- `robots.txt` and `sitemap.xml` in `public/`
- Hero image uses `fetchPriority="high"` with width/height hints
- Preconnect to Google Fonts origins for faster font loading

## ✨ Elegance Polish

- Hero profile photo with rotating conic-gradient frame, orbit ring with floating dots, and soft glow
- GSAP scroll parallax + mouse tilt on the hero photo frame
- Shine-sweep hover effect on hero buttons, project/blog covers, and footer social icons
- Shimmer loading bar in the preloader and animated scroll indicator
- Gradient accent bars under every section heading
- Numbered accents on service and project cards; skill count badges
- Ping animation on the availability dot and gradient name in the hero headline
