// Render /public/favicon.svg to PNG (multiple sizes) and JPG.
// Run with: bun scripts/build-favicon.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public");
const SRC = join(PUB, "favicon.svg");

const BRAND_RED = "#dc2626";
const svg = readFileSync(SRC, "utf8").replace(/oklch\([^)]+\)/g, BRAND_RED);

const PNG_SIZES = [16, 32, 48, 64, 96, 180, 192, 512];

for (const size of PNG_SIZES) {
  const out = join(PUB, `favicon-${size}.png`);
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
