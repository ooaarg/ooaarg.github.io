/** bat — pixelated bat silhouette rendered as a grid of rounded blocks
 *  in the gradient-cell style of the cardinality heatmap.
 *
 *  The bat is defined as an implicit density field (body + two wings +
 *  two ears), sampled at each cell centre. Cells outside the silhouette
 *  are not rendered; cells inside take an accent-mix percentage and
 *  opacity proportional to how deep they sit inside the shape, giving
 *  the wings a soft fade from solid centre to scalloped tips.
 */

const VB = { w: 400, h: 300 };

const COLS = 26;
const ROWS = 15;
// Inner area the grid occupies (leaves room for top/bottom margins so the
// silhouette breathes inside the bento tile).
const MARGIN_X = 14;
const MARGIN_TOP = 22;
const MARGIN_BOTTOM = 36;
const GAP = 2;

const cellW = (VB.w - 2 * MARGIN_X - GAP * (COLS - 1)) / COLS;
const cellH = (VB.h - MARGIN_TOP - MARGIN_BOTTOM - GAP * (ROWS - 1)) / ROWS;

/** Map a cell index → normalised coordinate. x ∈ [-1, 1], y ∈ [-1, 1]
 *  with y > 0 toward the top of the viewBox (ear side). */
function norm(c: number, r: number) {
  const x = (c - (COLS - 1) / 2) / ((COLS - 1) / 2);
  const y = ((ROWS - 1) / 2 - r) / ((ROWS - 1) / 2);
  return { x, y };
}

/** Implicit density field for the bat. Returns a value > 0 inside the
 *  silhouette (larger = deeper inside, falls to 0 at the edge). */
function batDensity(x: number, y: number): number {
  // Body — narrow vertical lens through the centre.
  const body = 1 - Math.hypot(x / 0.14, y / 0.42);

  // Wings — two wide horizontal ellipses on each side, slightly raised so
  // they sweep up from the body.
  const wingL = 1 - Math.hypot((x + 0.5) / 0.52, (y - 0.05) / 0.3);
  const wingR = 1 - Math.hypot((x - 0.5) / 0.52, (y - 0.05) / 0.3);

  // Shoulder bridges — fill the gap between body and wings so the
  // silhouette reads as one connected shape, not three blobs.
  const brL = 1 - Math.hypot((x + 0.28) / 0.32, (y + 0.0) / 0.22);
  const brR = 1 - Math.hypot((x - 0.28) / 0.32, (y + 0.0) / 0.22);

  // Ears — two small pointy ellipses on top of the head.
  const earL = 1 - Math.hypot((x + 0.1) / 0.05, (y - 0.55) / 0.15);
  const earR = 1 - Math.hypot((x - 0.1) / 0.05, (y - 0.55) / 0.15);

  let d = Math.max(body, wingL, wingR, brL, brR, earL, earR);

  // Scallop the wing trailing edges by subtracting two notch circles per
  // side. Gives the classic bat-wing silhouette inside the modular grid.
  const notches: Array<[number, number, number]> = [
    [-0.32, -0.34, 0.12],
    [-0.68, -0.22, 0.13],
    [0.32, -0.34, 0.12],
    [0.68, -0.22, 0.13],
  ];
  for (const [nx, ny, nr] of notches) {
    const inside = 1 - Math.hypot((x - nx) / nr, (y - ny) / nr);
    if (inside > 0) d = Math.min(d, -inside);
  }

  return d;
}

interface Cell {
  c: number;
  r: number;
  d: number;
}

const CELLS: Cell[] = (() => {
  const out: Cell[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const { x, y } = norm(c, r);
      const d = batDensity(x, y);
      if (d > 0) out.push({ c, r, d });
    }
  }
  return out;
})();

export default function BatFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="BAT — benchmark for auto-bidding task. A pixelated bat silhouette rendered as a grid of rounded accent-tinted blocks."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="bat-grid-bg" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#bat-grid-bg)" />

      {CELLS.map(({ c, r, d }) => {
        const x = MARGIN_X + c * (cellW + GAP);
        const y = MARGIN_TOP + r * (cellH + GAP);
        // Clamp density into a comfortable visual range. Cells near the
        // wing tips sit around d≈0.05–0.2 and get lighter blocks; cells
        // in the body sit around d≈0.6–1 and get nearly solid accent.
        const t = Math.min(1, d * 1.6);
        const pct = Math.round(35 + t * 55); // 35–90% accent-mix
        const opacity = (0.45 + t * 0.55).toFixed(2);
        return (
          <rect
            key={`${c}-${r}`}
            x={x}
            y={y}
            width={cellW}
            height={cellH}
            rx={2.5}
            fill={`color-mix(in oklab, var(--accent) ${pct}%, var(--bg-sunken))`}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
}
