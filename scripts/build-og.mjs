// Generate /public/og-image.png from the standalone-thumbnail SVG.
// Run with: bun scripts/build-og.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <circle cx="180" cy="315" r="32" fill="#dc2626"/>
  <text x="240" y="338" font-family="Georgia, serif" font-weight="500" font-size="100" fill="#fafaf9" letter-spacing="-3">OOAARG</text>
  <text x="240" y="388" font-family="ui-monospace, monospace" font-size="20" fill="#a8a29e" letter-spacing="2">ONLINE OPTIMIZATION · APPLICATIONS</text>
  <text x="240" y="486" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#a8a29e">Provable. Streaming. One round at a time.</text>
</svg>
`;

const out = join(__dirname, "..", "public", "og-image.png");
const buf = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(out, buf);
console.log("Wrote", out, buf.length, "bytes");
