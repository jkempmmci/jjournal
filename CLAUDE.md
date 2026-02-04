# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

React 19 + TypeScript + Vite 7, bootstrapped with `npm create vite@latest` using the `react-ts` template. SWC is used for transpilation (via `@vitejs/plugin-react-swc`). No test framework is configured yet.

## Commands

```sh
npm install          # install dependencies
npm run dev          # start dev server (Vite HMR)
npm run build        # type-check (tsc -b) then bundle
npm run lint         # run ESLint (flat config)
npm run preview      # preview the production build locally
```

## TypeScript Configuration

The project uses project references: `tsconfig.json` is the root that delegates to `tsconfig.app.json` (covers `src/`) and `tsconfig.node.json` (covers `vite.config.ts`). Both are strict with `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly` enabled. Imports must use file extensions (`.tsx`, `.ts`) due to `verbatimModuleSyntax`.

## ESLint

Flat config (`eslint.config.js`). Current rules: `@eslint/js` recommended, `typescript-eslint` recommended, `react-hooks` flat recommended, and `react-refresh` vite preset. Only `.ts` and `.tsx` files are linted; `dist/` is ignored.

## Project Layout

- `index.html` — entry point; mounts `/src/main.tsx`
- `src/main.tsx` — React root (`createRoot` into `#root`, wrapped in `StrictMode`)
- `src/App.tsx` — top-level app component (currently the default counter demo)
- `src/index.css` — global styles (resets, dark/light theme via `color-scheme`)
- `src/App.css` — component-scoped styles for `App`
- `public/` — static assets served at `/` (currently just `vite.svg`)
- `src/assets/` — assets imported by components (currently `react.svg`)

## Notes

- No routing, state management, or API layer exists yet — this is a bare scaffold.
- No test runner is configured. If adding tests, Vitest is the natural fit given the Vite setup.
- The default dark-mode-first theme in `index.css` uses `prefers-color-scheme` for light mode switching.
