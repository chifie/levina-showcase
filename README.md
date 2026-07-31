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

## 🙏 Acknowledgements

- [TanStack Start](https://tanstack.com/start) for the full-stack React framework
- [GSAP](https://gsap.com) for buttery-smooth animations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [React Icons](https://react-icons.github.io/react-icons) for the icon set

## 👩‍💻 About the Author

**Levina Chifie** is a full stack software developer and mobile app developer based in Tanzania, passionate about building clean, scalable applications across web and mobile.

- 🌐 [Website](https://levinachifie.dev)
- 🐙 [GitHub](https://github.com/chifie)
- 💼 [LinkedIn](https://linkedin.com/in/levinachifie)
- ✉️ [Email](mailto:levinachifie@gmail.com)

## 🗺 Roadmap

- [ ] Add blog section
- [ ] Add live project screenshots to cards
- [ ] Add multilingual support
- [ ] Add project search and filters

## ⚙️ Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run lint` | Lint the codebase with ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format with Prettier |

## 🧩 Customization

To change the brand colors, edit the theme tokens in `src/styles.css`:

```css
:root {
  --brand: #6c7a94;
  --brand-light: #8fa0b8;
  --brand-dark: #4a5a72;
}
```

To add or edit projects, update the `PROJECTS` array in `src/components/portfolio/Projects.tsx`.

## 💡 FAQ

**How can I contact you for work?**

Use the contact form on the site or email [levinachifie@gmail.com](mailto:levinachifie@gmail.com).

**What technologies do you specialize in?**

React, TypeScript, Next.js, FastAPI, NestJS, Flutter, PostgreSQL, and more. See the Skills section on the live site for the full list.

## 🚦 Status

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/chifie/levina-showcase)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
