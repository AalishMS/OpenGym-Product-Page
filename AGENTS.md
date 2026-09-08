# Repository Guidelines

## Project Structure & Module Organization

This repository contains the OpenGym product and download website, built with React 19, TypeScript, and Vite. Application code lives in `src/`: `main.tsx` boots the app, `App.tsx` assembles page sections, and `config.ts` centralizes copy, links, FAQ content, sample data, and theme palettes. Keep reusable page sections in `src/components/`, pairing each component with its CSS file (for example, `Hero.tsx` and `Hero.css`). Static files belong in `public/`; app captures are stored in `public/screenshots/`. Production output is generated in `dist/` and must not be committed.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions recorded in `package-lock.json`.
- `npm run dev` starts Vite's development server, normally at `http://localhost:5173`.
- `npm run lint` runs Oxlint with the React and TypeScript rules in `.oxlintrc.json`.
- `npm run build` type-checks with `tsc -b` and creates the production bundle in `dist/`.
- `npm run preview` serves the built site for a final local check.

Run lint and build before opening a pull request.

## Coding Style & Naming Conventions

Use two-space indentation, single-quoted imports and strings, semicolons, and trailing commas where the surrounding code uses them. Name React components and their files in PascalCase (`LoggingDemo.tsx`); use camelCase for functions, variables, and configuration keys. Keep component-specific styles beside the component, use descriptive kebab-case CSS classes, and prefer existing custom properties from `src/index.css` over new hard-coded colors. Preserve reduced-motion behavior and meaningful image alt text. Update `src/config.ts` for content changes instead of duplicating content inside components.

## Testing Guidelines

There is currently no automated test runner or coverage target. Treat `npm run lint` and `npm run build` as required checks. For UI changes, inspect desktop and mobile layouts, keyboard navigation, external links, animations with reduced motion enabled, and the production preview. Add screenshots to the pull request when appearance changes.

## Commit & Pull Request Guidelines

Follow the Conventional Commit style visible in history: `feat:`, `fix:`, `docs:`, or `chore:` followed by a short imperative summary. Keep commits focused. Pull requests should explain the user-facing change, list verification performed, link any relevant issue, and include before/after images for visual work. Do not include `node_modules/`, `dist/`, local environment files, or unrelated screenshot updates.
