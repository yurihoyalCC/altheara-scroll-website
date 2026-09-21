/**
 * Generates theme.css — the Tailwind v4 `@theme` block that apps/web imports.
 *
 * Source of truth is src/colors.ts and src/typography.ts. Edit those, then
 * run `npm run build` here (or `npm run tokens` from the repo root).
 *
 * Runs on Node's native TypeScript type stripping — no tsx/ts-node needed.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { colors } from "../src/colors.ts";
import { fonts } from "../src/typography.ts";

const kebab = (name: string) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const fontLines = Object.values(fonts).map(
  ({ themeKey, cssVar, fallback }) => `  --${themeKey}: var(${cssVar}), ${fallback};`,
);

const colorLines = Object.entries(colors).map(
  ([name, hex]) => `  --color-${kebab(name)}: ${hex};`,
);

const css = `/*
 * GENERATED FILE — do not edit by hand.
 * Source: packages/design/src/colors.ts, packages/design/src/typography.ts
 * Regenerate with: npm run tokens
 */

@theme {
  /* Font Family Tokens — each indirects through the variable next/font injects on <html> */
${fontLines.join("\n")}

  /* Altheara Color Tokens */
${colorLines.join("\n")}
}
`;

const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "theme.css");
writeFileSync(outPath, css, "utf8");
console.log(`Wrote ${outPath} — ${Object.keys(fonts).length} font tokens, ${Object.keys(colors).length} color tokens.`);
