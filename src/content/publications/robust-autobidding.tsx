/** robust-autobidding — predictions with uncertainty halos.
 *
 *  Each cluster is one ML prediction in (CTR, CVR) space: a bright,
 *  tight core (the point estimate) wrapped in a wider, dimmer halo
 *  (the perturbation ball the robust optimiser plans against). Larger
 *  halos = noisier predictions; the robust bid takes the worst case
 *  over each ball.
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

/** Predictions. Each has a core Gaussian (the point estimate) and a
 *  wider halo Gaussian (the uncertainty radius). Heterogeneous halos
 *  encode varying CTR/CVR prediction noise. */
const PREDS: Array<{
  cx: number;
  cy: number;
  coreSigma: number;
  coreAmp: number;
  haloSigma: number;
  haloAmp: number;
}> = [
  // Larger halo — high uncertainty
  {
    cx: 5,
    cy: 4,
    coreSigma: 0.85,
    coreAmp: 0.85,
    haloSigma: 2.7,
    haloAmp: 0.34,
  },
  // Tight core, small halo — confident prediction
  {
    cx: 11.5,
    cy: 9.5,
    coreSigma: 0.8,
    coreAmp: 0.92,
    haloSigma: 1.9,
    haloAmp: 0.3,
  },
  // Brightest core, mid halo — high-value, moderately uncertain
  {
    cx: 17.5,
    cy: 4.5,
    coreSigma: 0.95,
    coreAmp: 1.0,
    haloSigma: 2.5,
    haloAmp: 0.36,
  },
  // Small core, wide halo — noisy prediction
  {
    cx: 22.5,
    cy: 10.8,
    coreSigma: 0.8,
    coreAmp: 0.78,
    haloSigma: 2.3,
    haloAmp: 0.34,
  },
  // Compact prediction
  {
    cx: 3,
    cy: 11,
    coreSigma: 0.78,
    coreAmp: 0.8,
    haloSigma: 1.8,
    haloAmp: 0.28,
  },
];

function density(c: number, r: number): number {
  let d = 0;
  for (const p of PREDS) {
    const dx = c - p.cx;
    const dy = r - p.cy;
    const r2 = dx * dx + dy * dy;
    const core = p.coreAmp * Math.exp(-r2 / (2 * p.coreSigma * p.coreSigma));
    const halo = p.haloAmp * Math.exp(-r2 / (2 * p.haloSigma * p.haloSigma));
    const v = core > halo ? core : halo;
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

export default function RobustAutobiddingFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Robust autobidding under CTR/CVR uncertainty: five bright prediction cores, each wrapped in a wider gradient halo whose radius reflects the prediction's perturbation ball."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="robust-grid-bg"
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

      <rect width={VB.w} height={VB.h} fill="url(#robust-grid-bg)" />

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
