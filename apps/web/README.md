# @altheara/web

The Altheara marketing website — Next.js 16, React 19, Tailwind v4, TypeScript.

A single scroll-story page of 18 scenes. `src/data/journeyScenes.ts` defines the scenes and their copy, `src/data/journeyAssets.ts` maps each scene to its media, and `JourneyStage` renders a sticky cinematic stage while `ScrollScene` lays invisible scroll runways beneath it. `useScrollProgress` measures those runways and writes per-scene progress as CSS variables.

## Running it

Run from the **repo root**, not from this directory:

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Scoped to this workspace specifically: `npm run dev -w @altheara/web`.

## Styling

Colors, typography roles and motion constants come from `@altheara/design`. `src/app/globals.css` imports the generated Tailwind `@theme` block:

```css
@import "tailwindcss";
@import "@altheara/design/theme.css";
```

To change a color, edit `packages/design/src/colors.ts` and run `npm run tokens` from the root — never add a hex literal here.

The three typefaces load through `next/font/google` in `src/app/layout.tsx`, which injects `--font-display`, `--font-reading` and `--font-ui` at `<html>` scope. The `@theme` tokens indirect through those variables, so the fonts must stay wired up in the layout for the theme's font tokens to resolve.

## Deployment

Vercel. The project's **Root Directory must be set to `apps/web`** in the dashboard — there is no in-repo file that controls this.
