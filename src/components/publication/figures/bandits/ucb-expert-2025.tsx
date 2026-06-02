/** ucb-expert-2025 — K expert heads across the top, with M of them
 *  extending into rich activity columns below (the experts being
 *  updated this round under the budget). The other K-M experts show
 *  only their faint head dot — dormant for the round.
 *
 *  Selected indices: 1 and 3 (cx = 8 and 18). Activity peaks sit
 *  roughly under each selected head, with mild horizontal jitter so
 *  the columns read as organic learning trajectories rather than
 *  straight stacks.
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

interface Peak {
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  amp: number;
}

/** K = 5 expert heads at the top row. Selected experts (indices 1 and
 *  3) get larger, brighter heads; dormant ones are faint dots. */
const HEADS: Peak[] = [
  { cx: 3, cy: 2, sx: 1.0, sy: 0.95, amp: 0.5 },
  { cx: 8, cy: 2, sx: 1.25, sy: 1.1, amp: 0.95 }, // selected
  { cx: 13, cy: 2, sx: 1.0, sy: 0.95, amp: 0.5 },
  { cx: 18, cy: 2, sx: 1.3, sy: 1.15, amp: 1.0 }, // selected
  { cx: 23, cy: 2, sx: 1.0, sy: 0.95, amp: 0.5 },
];

/** Activity peaks below each of the two selected experts. Slight
 *  horizontal jitter keeps the columns from reading as straight
 *  stacks; amplitudes vary mildly along the column. */
const ACTIVITY: Peak[] = [
  // Column under expert 1 (cx ≈ 8)
  { cx: 7.5, cy: 5.7, sx: 1.0, sy: 1.0, amp: 0.7 },
  { cx: 8.4, cy: 8.8, sx: 1.05, sy: 1.0, amp: 0.78 },
  { cx: 7.8, cy: 11.8, sx: 1.0, sy: 1.0, amp: 0.68 },

  // Column under expert 3 (cx ≈ 18)
  { cx: 18.4, cy: 5.7, sx: 1.0, sy: 1.0, amp: 0.74 },
  { cx: 17.7, cy: 8.8, sx: 1.05, sy: 1.0, amp: 0.84 },
  { cx: 18.3, cy: 11.8, sx: 1.0, sy: 1.0, amp: 0.7 },
];

function density(c: number, r: number): number {
  let d = 0;
  for (const p of [...HEADS, ...ACTIVITY]) {
    const dx = (c - p.cx) / p.sx;
    const dy = (r - p.cy) / p.sy;
    const v = p.amp * Math.exp(-(dx * dx + dy * dy) / 2);
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

export default function UcbExpertFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="UCB-style budget-constrained expert learning: five expert heads across the top row, with two of them extending into rich activity columns below (the experts updated this round); the other three remain faint dormant dots."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="ucbexpert-grid-bg" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#ucbexpert-grid-bg)" />

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
