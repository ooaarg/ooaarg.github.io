/** gamma-competitiveness — abstract Pareto frontier with a γ-competitive
 *  fading band. The bright crescent of cells traces the Pareto front
 *  (two-objective minimisation); cells above-right fade into the
 *  γ-competitive shell of dominated trade-offs. Cells below-left of the
 *  front are infeasible and not rendered.
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

/** Pareto front radius in normalised cell coordinates. A quarter
 *  ellipse with Rx slightly larger than Ry, so the front feels like a
 *  real engineering trade-off curve rather than a perfect circle. */
const RX = 1.05;
const RY = 0.95;

/** Falloff rate of the γ-competitive shell — larger ⇒ sharper front,
 *  smaller ⇒ wider competitive band. */
const FADE = 2.4;

/** Tiny inset so the front itself prints as a clean arc; cells just
 *  inside the front are dropped, masking the infeasible interior. */
const INFEASIBLE_INSET = 0.02;

function density(c: number, r: number): number {
  // Map cell index → normalised objective coords with (0,0) at the
  // lower-left (= both objectives minimised). x = objective 1, y = obj 2.
  const x = c / (COLS - 1);
  const y = (ROWS - 1 - r) / (ROWS - 1);

  // Radial position relative to the front ellipse.
  const rad = Math.hypot(x / RX, y / RY);

  // Infeasible — strictly below the Pareto front.
  if (rad < 1 - INFEASIBLE_INSET) return 0;

  // Distance "outward" from the front; 0 on the front, growing into the
  // γ-competitive shell.
  const dist = Math.max(0, rad - 1);
  return Math.exp(-dist * FADE);
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

export default function GammaCompetitivenessFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="γ-competitiveness: a Pareto frontier rendered as a bright crescent of gradient cells, with a fading band of γ-competitive trade-offs sweeping into the dominated region."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="gamma-grid-bg"
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

      <rect width={VB.w} height={VB.h} fill="url(#gamma-grid-bg)" />

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
