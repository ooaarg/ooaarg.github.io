/** fast-ucb — K stacked heavy-tailed reward distributions, one per arm.
 *
 *  Each lane is one arm of the stochastic MAB problem; the horizontal
 *  profile of each lane is a symmetric Cauchy-like density (peak in the
 *  middle, long polynomial tails) — the heavy-tailed reward regime the
 *  paper analyses. Different arms have different means and peak masses;
 *  the rightmost / brightest lane reads as the best arm.
 */

const VB = { w: 400, h: 300 };

const COLS = 26;
const ROWS = 15;
const MARGIN_X = 14;
const MARGIN_TOP = 22;
const MARGIN_BOTTOM = 22;
const GAP = 2;

const cellW = (VB.w - 2 * MARGIN_X - GAP * (COLS - 1)) / COLS;
const cellH = (VB.h - MARGIN_TOP - MARGIN_BOTTOM - GAP * (ROWS - 1)) / ROWS;

/** One arm per lane. `mean` is the lane's horizontal mode (in column
 *  units), `scale` controls heavy-tail width (Cauchy γ), `peak` is the
 *  saturation of the lane centre, `cy` is the row of the lane ridge,
 *  `sy` the vertical Gaussian half-width of the ridge. */
const LANES: Array<{
  cy: number;
  mean: number;
  scale: number;
  peak: number;
  sy: number;
}> = [
  { cy: 2.2, mean: 5.5, scale: 2.6, peak: 0.82, sy: 1.15 },
  { cy: 5.7, mean: 16.5, scale: 2.9, peak: 0.78, sy: 1.15 },
  { cy: 9.2, mean: 9.5, scale: 2.7, peak: 0.92, sy: 1.15 },
  { cy: 12.7, mean: 20.5, scale: 3.1, peak: 1.0, sy: 1.2 }, // best arm
];

function density(c: number, r: number): number {
  let d = 0;
  for (const L of LANES) {
    // Heavy-tailed (Cauchy-like) horizontal profile — peak at the mean,
    // polynomial decay outward. This is the symmetric heavy-tail the
    // paper targets.
    const xd = (c - L.mean) / L.scale;
    const horiz = 1 / (1 + xd * xd);
    // Gaussian vertical envelope so each arm reads as its own ridge.
    const yd = (r - L.cy) / L.sy;
    const vert = Math.exp(-(yd * yd) / 2);
    const v = L.peak * horiz * vert;
    if (v > d) d = v;
  }
  return d;
}

interface Cell {
  c: number;
  r: number;
  d: number;
}

const THRESHOLD = 0.1;

const CELLS: Cell[] = (() => {
  const out: Cell[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const d = density(c, r);
      if (d > THRESHOLD) out.push({ c, r, d });
    }
  }
  return out;
})();

export default function FastUcbFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Stochastic multi-armed bandits with heavy-tailed symmetric noise: four stacked Cauchy-like reward distributions rendered as gradient cell ridges, one per arm, with the brightest lane reading as the best arm."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="fastucb-grid-bg"
          width="40"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.12"
          />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#fastucb-grid-bg)" />

      {CELLS.map(({ c, r, d }) => {
        const x = MARGIN_X + c * (cellW + GAP);
        const y = MARGIN_TOP + r * (cellH + GAP);
        const t = Math.min(1, d);
        const pct = Math.round(30 + t * 60);
        const opacity = (0.4 + t * 0.6).toFixed(2);
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
