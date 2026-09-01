# Contributing

Thanks for your interest in contributing to this portfolio!

## Getting started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-change`
3. Install dependencies: `npm install`
4. Make your changes and run `npm run check` (typecheck + lint)
5. Commit your changes with a descriptive message
6. Push and open a pull request

## Commit style

Use conventional commit prefixes such as `feat:`, `fix:`, `style:`, `docs:`, `chore:`.

## ☁️ Deployment

The project deploys to **Vercel** via Nitro. Preview deployments are created automatically for pull requests. To deploy locally:

```bash
vercel --prod
```

## ♿ Accessibility & Motion

- Preserve `prefers-reduced-motion` support when adding GSAP animations
- Keep ARIA labels and roles on interactive and status elements
- Test keyboard navigation and focus-visible outlines for new components
