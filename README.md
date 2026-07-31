# Levina Chifie — Portfolio

A modern, animated portfolio website built with **React**, **TypeScript**, **TanStack Start**, **GSAP**, and **Tailwind CSS v4**. Featuring a slate-blue and cream brand identity, smooth scroll animations, and a fully responsive layout.

## ✨ Features

- Animated preloader and GSAP scroll-triggered reveals
- Hero section with circular profile photo and floating tech icons
- About, Skills, Services, Projects, and Contact sections
- Dark / light theme support with brand tokens
- Responsive design across mobile and desktop
- Magnetic buttons, ripple effects, and custom cursor

## 🛠 Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, TanStack Start, Tailwind CSS v4 |
| Animation | GSAP, ScrollTrigger |
| Icons | React Icons |
| Styling | Tailwind CSS, tw-animate-css |
| Deployment | Cloudflare Workers (Wrangler) |

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
│   ├── portfolio/           # Section components (Hero, About, Skills...)
│   └── ui/                  # Reusable UI primitives
├── routes/                  # TanStack Router routes
├── lib/                     # Utilities and error handling
├── styles.css               # Theme tokens and global styles
└── assets/                  # Images
```
