@AGENTS.md

# Altheara — repository guide

**Altheara: the place where a life is kept.** A longitudinal life-preservation and narrative intelligence product for Web, iOS and Android. Former names: AI LifeBook, Kairo, Alivra. Domains: altheara.app, altheara.life.

This repo currently holds the **marketing website** (Next.js 16, React 19, Tailwind v4, TypeScript): a single scroll-story page of 18 scenes driven by `src/data/journeyScenes.ts` + `journeyAssets.ts`, with `JourneyStage` rendering a sticky stage and invisible scroll runways. Planned: convert to a monorepo — `apps/web` (this site), `apps/mobile` (Expo app), `packages/design` (shared tokens).

Product docs (Product Bible, Narrative Intelligence Bible, architecture, tracking plan) live outside this repo in the owner's Altheara docs folder. Ask before assuming product scope.

## Vocabulary — use these exact words in code, copy, and analytics
**Echo** (a moment in the person's own words) · **Invitation** (the one question that opens the daily loop) · **State/Feeling** (optional tag on an Echo) · **Reflection** (≤30 words proving Altheara heard *this* Echo) · **Story Reward** · **Insight** · **Lens** · **Story / Chapter** · **Volume** (a year as a book) · **Library** · **Legacy Vault / Legacy Plan / Living Portrait / Legacy Film / Memorial**.
Never "entry", "journal", "post", "user diary".

## Non-negotiable product rules
1. **Never lose the source.** Original Echoes, media and dates are append-only. Generated content (Reflection, Story, Volume prose) never overwrites them, and user corrections are authoritative.
2. **Altheara changes how a story is told, never what happened.** No invented facts, no forced meaning, no manufactured profundity.
3. **A Reflection must be specific to its Echo.** If a line could sit under a different Echo, it is wrong — including placeholder copy in the UI.
4. **No Echo content, Story content, Insight answers, or names of people in the person's life go to analytics or marketing tools** (Segment, Mixpanel, Customer.io, AppsFlyer). Events carry counts, IDs and categories only.
5. **AI keys never ship in the client.** Model calls go through the backend.
6. **Deeper without busier:** no streaks, badges, mood dashboards, or social features. These were explicitly cut.

## Design system (source of truth for visuals)
- Colors come from the `@theme` tokens in `src/app/globals.css`: ivory, linen, parchment, stone, taupe, woodland, espresso, charcoal, olive, sage, mist, wheat, paper, hairline, bark, brass, brass-deep, hearth, night. **Never add a hard-coded hex** — add or reuse a token.
- Contrast rules: on light surfaces use `taupe` (not `#8C8275`) for muted text and `brass-deep` (not `brass`/`wheat`) for gold text. `brass` and `wheat` are for marks, rules and dark surfaces.
- Type: Playfair Display (uppercase display headlines, weight 400) · Lora (the person's words and Altheara's voice; only 400/500 exist — never `font-light`) · Source Sans 3 (UI labels and buttons, uppercase with wide tracking).
- **Minimum text size 12px** (`text-xs`). No 9–11px.
- Corners: `rounded-sm` (4px) for buttons, fields and cards. Pills only for chips and the compact header CTA.
- Motion: `cubic-bezier(0.16, 1, 0.3, 1)`, 300–400ms, slow fades. Respect `prefers-reduced-motion`.
- No emoji. The only ornament is ✦ (marks a Reflection) and → (forward actions).

## Voice
Observant, warm, specific, restrained — never therapist, coach or cheerleader. Display headlines are ALL CAPS and end with a full stop; everything else is sentence case. Avoid "journey", "testament to", "profound", "tapestry", "It sounds like…".

## Working agreements
- Run `npm run lint` and `npx tsc --noEmit` before committing; the repo is currently at 0 lint errors.
- Branch for anything non-trivial (`fix/…`, `feat/…`), and say what changed in plain language.
- Don't reintroduce `public/new_media_*.jpg` (deleted duplicates).
- The audio intro cannot truly autoplay: browsers require a click/tap/key first. `AudioToggle` attempts playback, then starts on the first real gesture, and the label must always tell the truth.
- Known gaps: "Create your private archive" links to `#open` (no sign-up yet); no favicon/OG image; no privacy policy or terms pages; images are 1024px JPGs and not served through `next/image`.
