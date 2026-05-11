/** brayess-paradox-2025 — abstract transportation network with one
 *  source and multiple sinks, rendered as gradient nodes and edge bands.
 *
 *  The two cross-edges meeting at the middle junction are drawn slightly
 *  brighter than the rest — the candidate "Braess" edges whose flow the
 *  algorithm would inspect when identifying inefficient capacity.
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

/** Network nodes in cell coordinates. Node 0 is the source, nodes 4–6
 *  are sinks, the rest are interior junctions. amp/σ control the
 *  cluster glow size; sources/sinks are a touch larger than junctions. */
const NODES: Array<{
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  amp: number;
}> = [
  { cx: 13, cy: 1.5, sx: 1.4, sy: 1.2, amp: 1.0 }, // 0 — source
  { cx: 5.5, cy: 6, sx: 1.2, sy: 1.1, amp: 0.85 }, // 1 — junction A
  { cx: 20.5, cy: 6, sx: 1.2, sy: 1.1, amp: 0.85 }, // 2 — junction B
  { cx: 13, cy: 8.5, sx: 1.1, sy: 1.0, amp: 0.78 }, // 3 — junction M (Braess hinge)
  { cx: 2.5, cy: 12.5, sx: 1.3, sy: 1.1, amp: 0.9 }, // 4 — sink T1
  { cx: 13, cy: 13.5, sx: 1.3, sy: 1.1, amp: 0.9 }, // 5 — sink T2
  { cx: 23.5, cy: 12.5, sx: 1.3, sy: 1.1, amp: 0.9 }, // 6 — sink T3
];

/** Edges as (from, to, amp). The two cross-edges that meet at M (the
 *  Braess hinge) carry a slightly higher amp — they're the candidates
 *  the paper's algorithm would surface as inefficient. */
const EDGES: Array<{ from: number; to: number; amp: number }> = [
  { from: 0, to: 1, amp: 0.55 }, // S → A
  { from: 0, to: 2, amp: 0.55 }, // S → B
  { from: 1, to: 4, amp: 0.55 }, // A → T1
  { from: 2, to: 6, amp: 0.55 }, // B → T3
  { from: 3, to: 5, amp: 0.55 }, // M → T2
  { from: 1, to: 3, amp: 0.72 }, // A → M  (Braess candidate)
  { from: 2, to: 3, amp: 0.72 }, // B → M  (Braess candidate)
];

/** Edge thickness in cell units (Gaussian half-width). */
const EDGE_SIGMA = 0.62;

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
  let d = 0;

  // Node clusters — Gaussian peaks anchored at each node centre.
  for (const n of NODES) {
    const dx = (c - n.cx) / n.sx;
    const dy = (r - n.cy) / n.sy;
    const v = n.amp * Math.exp(-(dx * dx + dy * dy) / 2);
    if (v > d) d = v;
  }

  // Edge bands — perpendicular Gaussian falloff from each line segment.
  for (const e of EDGES) {
    const a = NODES[e.from];
    const b = NODES[e.to];
    const dist = distToSegment(c, r, a.cx, a.cy, b.cx, b.cy);
    const v = e.amp * Math.exp(-(dist * dist) / (2 * EDGE_SIGMA * EDGE_SIGMA));
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

export default function BraessParadoxFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="One-source / multi-sink transportation network rendered as gradient nodes and edge bands; two cross-edges at the middle junction glow brighter — the Braess-paradox candidates."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="braess-grid-bg"
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

      <rect width={VB.w} height={VB.h} fill="url(#braess-grid-bg)" />

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
