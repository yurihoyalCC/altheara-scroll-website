# Altheara

**The place where a life is kept.** A longitudinal life-preservation and narrative intelligence product for Web, iOS and Android.

## Workspaces

| Path | Package | What it is |
| --- | --- | --- |
| `apps/web` | `@altheara/web` | The marketing website — Next.js 16, React 19, Tailwind v4. An 18-scene scroll story. |
| `apps/mobile` | `@altheara/mobile` | The iOS/Android app — Expo SDK 57 with expo-router. Currently a skeleton. |
| `packages/design` | `@altheara/design` | Design tokens — colors, typography roles, motion. Read by both apps. |

## Getting started

```bash
npm install          # once, from the repo root — installs every workspace
npm run dev          # the website at http://localhost:3000
npm run mobile       # Expo dev server; press i, a, or w
```

## Everyday commands

All of these run from the repo root.

| Command | What it does |
| --- | --- |
| `npm run dev` | Next dev server for the website |
| `npm run build` | Production build of the website |
| `npm run mobile` | Expo dev server for the mobile app |
| `npm run lint` | ESLint across the website — expected to be at 0 errors |
| `npm run typecheck` | `tsc --noEmit` across all three workspaces |
| `npm run tokens` | Regenerates `packages/design/theme.css` from the token source |

## Design tokens

`packages/design/src/colors.ts` is the single source of truth for every color in the product. Never hard-code a hex anywhere else.

Adding or changing a token:

1. Edit `packages/design/src/colors.ts` (or `typography.ts` / `motion.ts`).
2. Run `npm run tokens`.
3. Commit the source change **and** the regenerated `packages/design/theme.css`.

Web consumes the generated CSS as a Tailwind v4 `@theme` block, imported by `apps/web/src/app/globals.css`. Mobile imports the same values as JavaScript:

```ts
import { colors } from "@altheara/design";
```

`theme.css` is generated. Do not edit it by hand — your change will be overwritten on the next `npm run tokens`.

## Notes

- React is pinned to a single version (19.2.8) across the workspace — in both apps and in the root `overrides` block. Expo's packages declare `react: "*"` as a peer, so without the override npm installs a second copy and Metro bundles both, which breaks hooks. Bump the apps and the override together.
- `npx expo install --check` reports three known, deliberate deviations from Expo SDK 57's template. None of them break anything, and all three workspaces typecheck and build clean:

  | Package | Ours | Expo expects | Why |
  | --- | --- | --- | --- |
  | `react` | 19.2.8 | 19.2.3 | Within `react-native@0.86.3`'s own peer range (`^19.2.3`). One shared React beats matching the template. |
  | `react-dom` | 19.2.8 | 19.2.3 | Same — must track `react`. |
  | `typescript` | 5.9.3 | ~6.0.3 | The website is on TS 5. Bumping the whole workspace to TS 6 is a separate change with its own risk. |

  Do **not** run `npx expo install --fix` — it will split React back into two copies.
- The three typefaces (Playfair Display, Lora, Source Sans 3) load per-platform — `next/font/google` on web, `@expo-google-fonts/*` on mobile — because a CSS variable cannot cross into React Native. The *roles* are shared, in `packages/design/src/typography.ts`.
- **Deployment:** the Vercel project's Root Directory must be set to `apps/web` in the dashboard. There is no in-repo setting for this.

See [CLAUDE.md](CLAUDE.md) for product vocabulary, the non-negotiable product rules, and the full design system.
