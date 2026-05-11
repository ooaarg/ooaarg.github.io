/** zeroth-order-methods — non-smooth V-shaped function plus heavy-tail
 *  outlier blobs.
 *
 *  The bright V captures the non-smooth convex objective (sharp kink at
 *  the vertex = non-differentiable point). The two off-ridge gradient
 *  blobs are heavy-tail noise samples that the clipping operator deals
 *  with — far from the true function but visually distinct.
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

/** Vertices of the V function (in cell coordinates). The two segments
 *  meet at a sharp kink, encoding non-smoothness. */
const V_LEFT_A = { x: 2.0, y: 2.0 };
const V_LEFT_B = { x: 13.0, y: 11.5 };
const V_RIGHT_A = { x: 13.0, y: 11.5 };
const V_RIGHT_B = { x: 24.0, y: 2.0 };

const V_SIGMA = 0.78;
const V_AMP = 0.98;

/** Heavy-tail outlier samples — gradient blobs sitting off the V. */
const OUTLIERS: Array<{ cx: number; cy: number; sigma: number; amp: number }> =
  [
    { cx: 5.0, cy: 12.5, sigma: 1.25, amp: 0.72 },
    { cx: 21.5, cy: 12.8, sigma: 1.2, amp: 0.68 },
  ];

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
  // V ridge — min distance to either segment, so the vertex is a real
  // kink rather than a rounded join.
  const dL = distToSegment(
    c,
    r,
    V_LEFT_A.x,
    V_LEFT_A.y,
    V_LEFT_B.x,
    V_LEFT_B.y,
  );
  const dR = distToSegment(
    c,
    r,
    V_RIGHT_A.x,
    V_RIGHT_A.y,
    V_RIGHT_B.x,
    V_RIGHT_B.y,
  );
  const dV = Math.min(dL, dR);
  let d = V_AMP * Math.exp(-(dV * dV) / (2 * V_SIGMA * V_SIGMA));

  // Heavy-tail outliers — Gaussian blobs anchored away from the V.
  for (const o of OUTLIERS) {
    const dx = c - o.cx;
    const dy = r - o.cy;
    const v = o.amp * Math.exp(-(dx * dx + dy * dy) / (2 * o.sigma * o.sigma));
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

export default function ZerothOrderFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Zeroth-order methods on a non-smooth convex objective: a sharp V-shaped ridge of gradient cells with a kink at the vertex, accompanied by two off-ridge blobs representing heavy-tail noise samples."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="zeroth-grid-bg"
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

      <rect width={VB.w} height={VB.h} fill="url(#zeroth-grid-bg)" />

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
