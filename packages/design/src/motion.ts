/**
 * Altheara motion and shape constants. Slow fades, never bounce.
 * Always respect `prefers-reduced-motion`.
 */
export const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

export const durations = {
  fast: 300,
  base: 400,
} as const;

/** Corners: 4px for buttons, fields and cards. Pills only for chips and the compact header CTA. */
export const radii = {
  sm: 4,
} as const;
