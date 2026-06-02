/** advertising-bandits — vertical warmth gradient of ads on the
 *  platform. Top tier: established hot ads (tight bright clusters,
 *  exploited). Middle tier: warming ads with moderate confidence.
 *  Bottom tier: cold new ads (wide diffuse low-intensity blobs — the
 *  cold-start regime the algorithm targets via exploration).
 *
 *  Reads simultaneously as the position-based model (top = high-CTR
 *  slot positions) and as the exploration / exploitation trade-off
 *  (hot ads up top, cold ads down at the bottom).
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

interface Ad {
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  amp: number;
}

// Horizontal layout is mirrored around the centre column (cx = 12.5)
// so the three tiers read as a symmetric composition.
const CENTER = 12.5;
const TOP_OFFSET = 8.5;
const MID_OFFSET = 4.5;
const BOT_OFFSET = 8.5;

const ADS: Ad[] = [
  // --- Top tier: established / hot ads, tight bright clusters ---
  { cx: CENTER - TOP_OFFSET, cy: 2.3, sx: 0.95, sy: 0.9, amp: 0.95 },
  { cx: CENTER, cy: 2.3, sx: 0.95, sy: 0.9, amp: 0.95 },
  { cx: CENTER + TOP_OFFSET, cy: 2.3, sx: 0.95, sy: 0.9, amp: 0.95 },

  // --- Middle tier: warming ads, medium clusters ---
  { cx: CENTER - MID_OFFSET, cy: 7.5, sx: 1.45, sy: 1.35, amp: 0.72 },
  { cx: CENTER + MID_OFFSET, cy: 7.5, sx: 1.45, sy: 1.35, amp: 0.72 },

  // --- Bottom tier: cold ads, wide diffuse blobs ---
  { cx: CENTER - BOT_OFFSET, cy: 12.5, sx: 2.55, sy: 2.25, amp: 0.48 },
  { cx: CENTER, cy: 12.5, sx: 2.55, sy: 2.25, amp: 0.48 },
  { cx: CENTER + BOT_OFFSET, cy: 12.5, sx: 2.55, sy: 2.25, amp: 0.48 },
];

function density(c: number, r: number): number {
  let d = 0;
  for (const a of ADS) {
    const dx = (c - a.cx) / a.sx;
    const dy = (r - a.cy) / a.sy;
    const v = a.amp * Math.exp(-(dx * dx + dy * dy) / 2);
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

export default function AdvertisingBanditsFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Cold-start advertising bandits: three tight bright clusters at the top (established hot ads), two medium clusters in the middle (warming), and three wide diffuse blobs at the bottom (cold new ads being explored)."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="adbandits-grid-bg" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#adbandits-grid-bg)" />

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
