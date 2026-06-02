import { distToSegment } from "../../../../lib/figure-geom";

/** mcts-repro2026 — binary MCTS search tree for join ordering, with the
 *  converged best path glowing.
 *
 *  Strict binary fan-out: root → 2 → 4 → 8 leaves (15 nodes, 14 edges).
 *  Nodes and edges along the converged path
 *      root → right-child → its left-grandchild → its right-leaf
 *  carry higher amps than the side branches, so the trunk reads through
 *  the tree as the plan the algorithm committed to.
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

/** Tree nodes laid out by level.
 *  Indices on the converged path: 0 (root) → 2 → 5 → 11 (winner leaf). */
const NODES: Array<{
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  amp: number;
}> = [
  // level 0 — root
  { cx: 13, cy: 1.3, sx: 1.4, sy: 1.2, amp: 0.95 }, // 0

  // level 1 — children
  { cx: 6.5, cy: 5.0, sx: 1.15, sy: 1.05, amp: 0.65 }, // 1
  { cx: 19.5, cy: 5.0, sx: 1.3, sy: 1.15, amp: 0.85 }, // 2  (on path)

  // level 2 — grandchildren
  { cx: 3.5, cy: 8.7, sx: 0.95, sy: 0.95, amp: 0.55 }, // 3
  { cx: 9.5, cy: 8.7, sx: 0.95, sy: 0.95, amp: 0.55 }, // 4
  { cx: 16.5, cy: 8.7, sx: 1.15, sy: 1.05, amp: 0.78 }, // 5  (on path)
  { cx: 22.5, cy: 8.7, sx: 0.95, sy: 0.95, amp: 0.55 }, // 6

  // level 3 — leaves
  { cx: 2.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.45 }, // 7
  { cx: 5.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.5 }, // 8
  { cx: 8.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.5 }, // 9
  { cx: 11.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.5 }, // 10
  { cx: 15.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.5 }, // 11
  { cx: 18.0, cy: 12.5, sx: 1.25, sy: 1.1, amp: 1.0 }, // 12 (winner leaf)
  { cx: 21.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.5 }, // 13
  { cx: 24.0, cy: 12.5, sx: 0.8, sy: 0.85, amp: 0.45 }, // 14
];

/** Edges. The four edges along the path carry a higher amp. */
const EDGES: Array<{ from: number; to: number; amp: number }> = [
  // root → level 1
  { from: 0, to: 1, amp: 0.45 },
  { from: 0, to: 2, amp: 0.72 }, // path

  // level 1 → level 2
  { from: 1, to: 3, amp: 0.38 },
  { from: 1, to: 4, amp: 0.4 },
  { from: 2, to: 5, amp: 0.7 }, // path
  { from: 2, to: 6, amp: 0.38 },

  // level 2 → leaves
  { from: 3, to: 7, amp: 0.32 },
  { from: 3, to: 8, amp: 0.34 },
  { from: 4, to: 9, amp: 0.34 },
  { from: 4, to: 10, amp: 0.32 },
  { from: 5, to: 11, amp: 0.4 },
  { from: 5, to: 12, amp: 0.74 }, // path
  { from: 6, to: 13, amp: 0.34 },
  { from: 6, to: 14, amp: 0.3 },
];

const EDGE_SIGMA = 0.55;

function density(c: number, r: number): number {
  let d = 0;

  for (const n of NODES) {
    const dx = (c - n.cx) / n.sx;
    const dy = (r - n.cy) / n.sy;
    const v = n.amp * Math.exp(-(dx * dx + dy * dy) / 2);
    if (v > d) d = v;
  }

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

export default function McstsFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Binary MCTS search tree for join ordering: root fans out to 2, 4, then 8 leaves; nodes and edges along one root-to-leaf path glow brighter, marking the join plan the algorithm committed to."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="mcts-grid-bg" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#mcts-grid-bg)" />

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
