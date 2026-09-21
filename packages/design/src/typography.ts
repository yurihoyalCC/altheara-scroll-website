/**
 * Altheara typography — font ROLES, not loaded fonts.
 *
 * The families load differently per platform (`next/font/google` on web,
 * `@expo-google-fonts/*` on mobile), so this file carries the role
 * definitions and each app does its own loading.
 *
 * On web the `@theme` token indirects through the CSS variable that
 * `next/font` injects at `<html>` scope — hence `cssVar` below.
 */
export const fonts = {
  /** Display headlines. ALL CAPS, ending in a full stop, weight 400. */
  display: {
    family: "Playfair Display",
    themeKey: "font-display",
    cssVar: "--font-display",
    fallback: "Georgia, serif",
    weights: [400, 500, 600],
  },
  /** The person's words and Altheara's voice. Only 400/500 exist — never font-light. */
  reading: {
    family: "Lora",
    themeKey: "font-reading",
    cssVar: "--font-reading",
    fallback: "Georgia, serif",
    weights: [400, 500],
    styles: ["normal", "italic"],
  },
  /** UI labels and buttons — uppercase with wide tracking. */
  ui: {
    family: "Source Sans 3",
    themeKey: "font-sans",
    cssVar: "--font-ui",
    fallback: "system-ui, sans-serif",
    weights: [400, 500, 600, 700],
  },
} as const;

export type FontRole = keyof typeof fonts;

/** Minimum text size anywhere in the product. No 9–11px. */
export const minTextSizePx = 12;
