/** autobidding-arena — comparison leaderboard of K algorithms as
 *  vertical gradient strips.
 *
 *  Each strip is one autobidding algorithm; the bright/dim pattern
 *  along its height encodes that algorithm's performance profile
 *  across evaluation metrics. Profiles differ in shape:
 *
 *    1. controller — single mid-low peak (steady, narrow strength)
 *    2. PID        — bimodal (good at two metrics, weak between)
 *    3. RL agent   — broad uniform glow (strong overall)
 *    4. optimal    — sharp tall peak (specialised winner)
 *    5. baseline   — wide faint glow (weak everywhere)
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

/** Horizontal half-width of every strip. Small enough that the five
 *  strips don't bleed into each other. */
const STRIP_SX = 1.25;

interface Peak {
  cy: number;
  sy: number;
  amp: number;
}

interface Strip {
  cx: number;
  peaks: Peak[];
}

const STRIPS: Strip[] = [
  // Controller — single narrow peak in the lower band.
  { cx: 3, peaks: [{ cy: 10.5, sy: 1.4, amp: 0.78 }] },
  // PID — bimodal: good at two metrics, soft trough in the middle.
  {
    cx: 8,
    peaks: [
      { cy: 3.5, sy: 1.35, amp: 0.74 },
      { cy: 11.5, sy: 1.35, amp: 0.74 },
    ],
  },
  // RL agent — broad uniform glow.
  { cx: 13, peaks: [{ cy: 7.5, sy: 4.2, amp: 0.85 }] },
  // Optimal formula — sharp tall peak: best at one metric.
  { cx: 18, peaks: [{ cy: 4.0, sy: 1.2, amp: 1.0 }] },
  // Baseline — wide faint background.
  { cx: 23, peaks: [{ cy: 7.5, sy: 5.0, amp: 0.5 }] },
];

function density(c: number, r: number): number {
  let d = 0;
  for (const s of STRIPS) {
    const xd = (c - s.cx) / STRIP_SX;
    const horiz = Math.exp(-(xd * xd) / 2);
    let vert = 0;
    for (const p of s.peaks) {
      const yd = (r - p.cy) / p.sy;
      const v = p.amp * Math.exp(-(yd * yd) / 2);
      if (v > vert) vert = v;
    }
    const total = horiz * vert;
    if (total > d) d = total;
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

export default function AutobiddingArenaFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Autobidding arena leaderboard: five vertical gradient strips, each an algorithm with a distinct profile across metrics — narrow single peak, bimodal, broad uniform, sharp tall peak, and faint baseline."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern
          id="arena-grid-bg"
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

      <rect width={VB.w} height={VB.h} fill="url(#arena-grid-bg)" />

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
