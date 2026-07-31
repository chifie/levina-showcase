# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Branded OG image and favicons in the slate-blue and cream palette
- Sixth project card to balance the projects grid
- README, contributing guidelines, security policy, and MIT license
- Blog section with three article cards and a shared blog-posts data module
- `prefersReducedMotion()` helper with reduced-motion guards across all animated sections
- Italic serif "dev chifie" preloader flash screen

### Changed
- Switched theme from pink/rose to slate-blue and cream palette
- Made project card gradients more distinct per project
- Headings switched to elegant Playfair Display serif with italic gradient accents
- Adjusted hero profile photo crop to show the full head
- Removed percentage labels from skill cards
- Removed the About stats cards section

### Fixed
- React hydration warning from Math.random() during render
- GSAP animations now respect the user's reduced-motion preference

### Accessibility
- Reduced-motion support across all GSAP animations
- ARIA progressbar roles on skill bars, aria-current on nav, focus rings on blog links

### Performance
- Fonts loaded once with display=swap; hero image uses eager loading and async decoding
- GPU-friendly transforms for all GSAP animations

### Docs
- Expanded README with blog, typography, accessibility, performance, testing, and contributing sections
- Updated CONTRIBUTING and SECURITY with accessibility guidance

### Added
- Profile photo in the About section with a two-column layout and reveal animation

### Changed
- About section now uses a two-column layout with profile photo
- Skill category cards lift on hover

### Docs
- README sections overview, components reference, and design language

### CI
- GitHub Actions workflow for linting and typechecking

### CI
- Workflow switched to Bun for install, typecheck, and lint

### Added
- Blog category chips rendered from shared data

### Changed
- Services learn-more links smooth-scroll to the contact section

### Docs
- Brand colors reference table added to README

### Docs
- How-to guide for adding blog posts

### CI
- Bun version set to latest for reliable workflow setup

### Docs
- SEO metadata and navigation behavior documentation

### Added
- Elegant hero profile photo frame with rotating conic-gradient ring, orbit dots, and glow
- GSAP scroll parallax and mouse tilt on the hero photo
- Shine-sweep hovers, shimmer preloader bar, animated scroll indicator
- Gradient accent bars under all section headings
