/** functional-bandit — abstract landscape of K function-valued arms.
 *
 *  Each peak is one arm of the functional MAB problem: an unknown
 *  black-box function we can only query at points. Best-function
 *  identification = pick the tallest peak. The visualization renders
 *  K Gaussian peaks as islands of rounded gradient cells, with one
 *  peak (the "best") clearly more saturated than the others.
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

/** Each peak = one arm = one unknown function f_k. `amp` is the (true)
 *  optimum of that function; the arm with the largest amp is the best
 *  function we want to identify. σx/σy are the apparent "spread" of
 *  each function's high-value region — purely visual. */
const PEAKS: Array<{
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  amp: number;
}> = [
  { cx: 4.5, cy: 4.2, sx: 2.6, sy: 2.0, amp: 0.7 },
  { cx: 11.5, cy: 9.5, sx: 2.4, sy: 2.1, amp: 0.6 },
  { cx: 18.0, cy: 4.0, sx: 3.0, sy: 2.5, amp: 1.0 }, // best function
  { cx: 22.5, cy: 10.8, sx: 2.3, sy: 1.9, amp: 0.55 },
  { cx: 3.5, cy: 11.3, sx: 2.2, sy: 1.9, amp: 0.5 },
];

function density(c: number, r: number): number {
  let d = 0;
  for (const p of PEAKS) {
    const v =
      p.amp *
      Math.exp(
        -(((c - p.cx) * (c - p.cx)) / (2 * p.sx * p.sx) + ((r - p.cy) * (r - p.cy)) / (2 * p.sy * p.sy)),
      );
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

export default function FunctionalBanditFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Functional multi-armed bandit landscape: five gradient-cell islands, each representing one unknown function-valued arm, with one peak clearly the tallest — the best function to identify."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="fmab-grid-bg" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#fmab-grid-bg)" />

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
