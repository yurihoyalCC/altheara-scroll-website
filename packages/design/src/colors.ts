/**
 * Altheara color tokens — the single source of truth for every surface,
 * on web and on mobile. Never hard-code a hex anywhere else: add or reuse
 * a token here, then run `npm run tokens` to regenerate theme.css.
 *
 * Contrast rules that matter on light surfaces:
 *   - muted text uses `taupe`, never `stone`
 *   - gold text uses `brassDeep`; `brass` and `wheat` are for marks,
 *     thin rules and dark surfaces only
 */
export const colors = {
  /** Warmest light surface — the page ground on light scenes */
  ivory: "#F4EFE6",
  linen: "#E9E2D6",
  parchment: "#DDD1BC",
  stone: "#B8A78E",
  /** Muted text on light surfaces */
  taupe: "#786B5B",
  woodland: "#55483A",
  espresso: "#342C24",
  /** The cinematic backdrop the journey opens on */
  charcoal: "#1C1916",
  olive: "#72745E",
  sage: "#969783",
  mist: "#A7AAA5",
  /** Marks and rules on dark surfaces */
  wheat: "#C9AE7C",

  /** Light page / card surface */
  paper: "#FAF8F3",
  /** Decorative lines on paper */
  hairline: "#E4DCCE",
  /** Secondary text on paper (7.2:1) */
  bark: "#5A5248",
  /** ✦ marks and thin rules on paper — not for text */
  brass: "#A68A56",
  /** Gold TEXT on paper (5.3:1) */
  brassDeep: "#7E6337",
  /** Raised dark surface / dark button hover */
  hearth: "#2C2824",
  /** Site footer */
  night: "#12110F",
} as const;

export type ColorToken = keyof typeof colors;
