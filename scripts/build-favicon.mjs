// Build the black-and-white favicon from the shared group symbol.
// Run with: bun scripts/build-favicon.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const symbol = readFileSync(join(root, "src/assets/ooaarg-symbol.svg"), "utf8");
const [, viewBox] = symbol.match(/viewBox="([^"]+)"/);
const [, , width, height] = viewBox.split(/\s+/).map(Number);
const scale = 224 / Math.max(width, height);
const x = (256 - width * scale) / 2;
const y = (256 - height * scale) / 2;
const paths = symbol.match(/<path\b[^>]*\/>/g).join("\n");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <circle cx="128" cy="128" r="128" fill="#000"/>
  <g fill="#fff" transform="translate(${x} ${y}) scale(${scale})">
${paths}
  </g>
</svg>\n`;
writeFileSync(join(publicDir, "favicon.svg"), svg);

const render = (size) => sharp(Buffer.from(svg), { density: 288 }).resize(size, size).png().toBuffer();
for (const size of [180, 512]) {
  writeFileSync(join(publicDir, `favicon-${size}.png`), await render(size));
}

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(render));
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
writeFileSync(join(publicDir, "favicon.ico"), Buffer.concat([directory, ...images]));
console.log("Built SVG, ICO (16/32/48 px), and PNG (180/512 px) favicons.");
