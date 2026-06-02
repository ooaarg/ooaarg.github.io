/** uncertanty-quantification — Bayesian denoising as a before/after pair.
 *
 *  Left: a wide, diffuse cluster — the noisy raw CTR/CVR estimate
 *  spread over many plausible values.
 *  Right: a tight, bright peak — the denoised posterior the
 *  DenoiseBid method recovers and feeds to the bidder.
 *
 *  The size + intensity contrast between the two clusters reads as
 *  the uncertainty-collapse story without any text.
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

/** Raw noisy estimate: wide elliptical cluster, modest amplitude. */
const NOISY = { cx: 6.5, cy: 7.2, sx: 3.8, sy: 3.1, amp: 0.55 };

/** Denoised posterior: tight cluster, maximum amplitude. */
const CLEAN = { cx: 19.5, cy: 7.5, sx: 1.4, sy: 1.3, amp: 1.0 };

function density(c: number, r: number): number {
  const dx1 = (c - NOISY.cx) / NOISY.sx;
  const dy1 = (r - NOISY.cy) / NOISY.sy;
  const noisy = NOISY.amp * Math.exp(-(dx1 * dx1 + dy1 * dy1) / 2);

  const dx2 = (c - CLEAN.cx) / CLEAN.sx;
  const dy2 = (r - CLEAN.cy) / CLEAN.sy;
  const clean = CLEAN.amp * Math.exp(-(dx2 * dx2 + dy2 * dy2) / 2);

  return noisy > clean ? noisy : clean;
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

export default function UncertaintyQuantificationFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Bayesian denoising of CTR/CVR estimates: a wide diffuse cluster on the left (noisy raw estimate) collapses into a tight bright peak on the right (denoised posterior)."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="uq-grid-bg" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#uq-grid-bg)" />

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
