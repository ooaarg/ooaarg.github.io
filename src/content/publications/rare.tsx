/** rare — diagonal relevance / revenue trade-off beam with hotspot peaks.
 *
 *  The beam sweeps from "high relevance · low revenue" in the lower-left
 *  to "low relevance · high revenue" in the upper-right. Three hotspot
 *  clusters along it represent items the reranker promoted to the top of
 *  the search result page; the centre hotspot — the best relevance/revenue
 *  blend — glows brightest.
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

/** Endpoints of the trade-off beam, in cell coordinates. */
const P0 = { x: 2.5, y: 13.0 };
const P1 = { x: 23.0, y: 1.5 };

/** Hotspots along the beam, parametrised by t ∈ [0,1]. The middle hotspot
 *  carries the highest amp — the best relevance/revenue blend the
 *  reranker found. */
const HOTSPOTS: Array<{ t: number; amp: number; sigma: number }> = [
  { t: 0.22, amp: 0.82, sigma: 1.55 },
  { t: 0.52, amp: 1.0, sigma: 1.75 }, // best blend
  { t: 0.8, amp: 0.78, sigma: 1.5 },
];

/** Half-width of the beam itself; sets how thick the diagonal reads. */
const BEAM_SIGMA = 1.35;
const BEAM_AMP = 0.55;

function pointAt(t: number) {
  return { x: P0.x + t * (P1.x - P0.x), y: P0.y + t * (P1.y - P0.y) };
}

function distToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function density(c: number, r: number): number {
  // Beam: perpendicular Gaussian falloff from the trade-off segment.
  const dBeam = distToSegment(c, r, P0.x, P0.y, P1.x, P1.y);
  let d = BEAM_AMP * Math.exp(-(dBeam * dBeam) / (2 * BEAM_SIGMA * BEAM_SIGMA));

  // Hotspots: Gaussian peaks anchored on the beam.
  for (const h of HOTSPOTS) {
    const p = pointAt(h.t);
    const ddx = c - p.x;
    const ddy = r - p.y;
    const v =
      h.amp * Math.exp(-(ddx * ddx + ddy * ddy) / (2 * h.sigma * h.sigma));
    if (v > d) d = v;
  }
  return d;
}

interface Cell {
  c: number;
  r: number;
  d: number;
}

const THRESHOLD = 0.12;

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

export default function RareFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="RARe relevance / revenue trade-off: a diagonal gradient beam from lower-left to upper-right with three brighter hotspot clusters along it — the items the reranker promoted, with the middle blend glowing brightest."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="rare-grid-bg"
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

      <rect width={VB.w} height={VB.h} fill="url(#rare-grid-bg)" />

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
