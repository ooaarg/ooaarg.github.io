// Render /public/favicon.svg to PNG (multiple sizes) and JPG.
// Run with: bun scripts/build-favicon.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public");
const SRC = join(PUB, "favicon.svg");

// Sharp's underlying librsvg doesn't render oklch() — color silently falls
// back, leaving the mark black and the tilde stroke invisible. Substitute
// the brand red (matching the OG image) before rasterizing. The source SVG
// keeps its oklch authoring intact for browsers that render it directly.
const BRAND_RED = "#dc2626";
const svg = readFileSync(SRC, "utf8").replace(/oklch\([^)]+\)/g, BRAND_RED);

// Standard favicon / app-icon sizes. 32 is the classic browser favicon, 180
// is iOS apple-touch-icon, 192 / 512 are the PWA manifest sizes.
const PNG_SIZES = [16, 32, 48, 64, 96, 180, 192, 512];

for (const size of PNG_SIZES) {
  const out = join(PUB, `favicon-${size}.png`);
  // Transparent background — keeps it usable on any host.
  const buf = await sharp(Buffer.from(svg), { density: Math.max(72, size * 4) })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(out, buf);
  console.log(`Wrote ${out} (${buf.length} bytes)`);
}

// JPG can't be transparent — flatten onto the site's dark background so the
// mark stays legible.
const JPG_SIZE = 512;
const jpgOut = join(PUB, `favicon-${JPG_SIZE}.jpg`);
const jpgBuf = await sharp(Buffer.from(svg), { density: JPG_SIZE * 4 })
  .resize(JPG_SIZE, JPG_SIZE, {
    fit: "contain",
    background: { r: 10, g: 10, b: 10, alpha: 1 },
  })
  .flatten({ background: { r: 10, g: 10, b: 10 } })
  .jpeg({ quality: 92 })
  .toBuffer();
writeFileSync(jpgOut, jpgBuf);
console.log(`Wrote ${jpgOut} (${jpgBuf.length} bytes)`);
