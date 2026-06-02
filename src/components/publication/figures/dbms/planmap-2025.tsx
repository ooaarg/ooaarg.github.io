const VB = { w: 400, h: 300 };

// Two regions side-by-side. Radius and centres tuned so the regions read
// as distinct sets with a comfortable gap between them.
const N = { cx: 110, cy: 152, r: 78 };
const K_ = { cx: 290, cy: 152, r: 78 };

// Background plans / hints — hand-placed inside each region for visual
// rhythm. Each entry is [x, y].
const PLANS = [
  [70, 110],
  [90, 96],
  [140, 105],
  [55, 145],
  [148, 150],
  [75, 200],
  [142, 190],
];
const HINTS = [
  [255, 105],
  [285, 92],
  [332, 118],
  [248, 162],
  [338, 158],
  [262, 198],
  [330, 195],
];

// The "target" plan p and its mapped hint h(p) — both highlighted.
const P: [number, number] = [105, 145];
const HP: [number, number] = [298, 145];

// The default-plan safety baseline p₀ → h(p₀).
const P0: [number, number] = [125, 200];
const HP0: [number, number] = [285, 215];

export default function HintqoFigure() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Plan space N maps to hint space K via a learned analogy h; a dashed arrow tracks the default-plan safety baseline."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="hintqo-grid" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        </pattern>
        <marker
          id="hintqo-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
        </marker>
        <marker
          id="hintqo-arrow-muted"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.55" />
        </marker>
      </defs>

      <rect width={VB.w} height={VB.h} fill="url(#hintqo-grid)" />

      {/* The two regions: faint accent wash + dashed accent stroke. */}
      <circle
        cx={N.cx}
        cy={N.cy}
        r={N.r}
        fill="var(--accent)"
        fillOpacity={0.06}
        stroke="var(--accent)"
        strokeWidth={1.4}
        strokeDasharray="4 4"
        opacity={0.85}
      />
      <circle
        cx={K_.cx}
        cy={K_.cy}
        r={K_.r}
        fill="var(--accent)"
        fillOpacity={0.06}
        stroke="var(--accent)"
        strokeWidth={1.4}
        strokeDasharray="4 4"
        opacity={0.85}
      />

      {/* Region labels — mono caps in the upper-outer corner of each region. */}
      <text
        x={N.cx - N.r + 4}
        y={N.cy - N.r - 6}
        fill="var(--accent)"
        fontFamily="ui-monospace,monospace"
        fontSize={12}
        letterSpacing="0.06em"
      >
        N
      </text>
      <text
        x={K_.cx + K_.r - 4}
        y={K_.cy - K_.r - 6}
        fill="var(--accent)"
        fontFamily="ui-monospace,monospace"
        fontSize={12}
        letterSpacing="0.06em"
        textAnchor="end"
      >
        K
      </text>

      {/* Background plans / hints. */}
      {PLANS.map(([x, y], i) => (
        <circle key={`p-${i}`} cx={x} cy={y} r={2.4} fill="currentColor" opacity={0.42} />
      ))}
      {HINTS.map(([x, y], i) => (
        <circle key={`h-${i}`} cx={x} cy={y} r={2.4} fill="currentColor" opacity={0.42} />
      ))}

      {/* Mapping for the default-plan safety baseline (dashed, muted). Drawn
       * before the primary arrow so the primary sits on top visually. */}
      <line
        x1={P0[0] + 6}
        y1={P0[1] + 4}
        x2={HP0[0] - 8}
        y2={HP0[1] + 4}
        stroke="currentColor"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        opacity={0.55}
        markerEnd="url(#hintqo-arrow-muted)"
      />

      {/* Primary mapping h: p ↦ h(p) (solid accent). Endpoints are nudged off
       * the dot centres so the arrowhead lands cleanly. */}
      <line
        x1={P[0] + 6}
        y1={P[1]}
        x2={HP[0] - 8}
        y2={HP[1]}
        stroke="var(--accent)"
        strokeWidth={1.8}
        markerEnd="url(#hintqo-arrow)"
      />

      {/* The target / safety plan + hint dots, drawn on top of the regions. */}
      <circle cx={P0[0]} cy={P0[1]} r={3.4} fill="var(--accent)" opacity={0.7} />
      <circle cx={HP0[0]} cy={HP0[1]} r={3.4} fill="var(--accent)" opacity={0.7} />

      <circle cx={P[0]} cy={P[1]} r={4.2} fill="var(--accent)" />
      <circle cx={HP[0]} cy={HP[1]} r={4.2} fill="var(--accent)" />

      {/* Point labels. */}
      <text
        x={P[0] - 6}
        y={P[1] - 8}
        fill="var(--accent)"
        fontFamily="ui-monospace,monospace"
        fontSize={11}
        textAnchor="end"
      >
        p
      </text>
      <text
        x={HP[0] + 8}
        y={HP[1] - 6}
        fill="var(--accent)"
        fontFamily="ui-monospace,monospace"
        fontSize={11}
      >
        h(p)
      </text>
      <text
        x={P0[0] - 6}
        y={P0[1] + 14}
        fill="currentColor"
        opacity={0.7}
        fontFamily="ui-monospace,monospace"
        fontSize={11}
        textAnchor="end"
      >
        p₀
      </text>
      <text
        x={HP0[0] + 8}
        y={HP0[1] + 14}
        fill="currentColor"
        opacity={0.7}
        fontFamily="ui-monospace,monospace"
        fontSize={11}
      >
        h(p₀)
      </text>

      {/* Bottom caption — title for the whole construction. */}
      <text
        x={VB.w / 2}
        y={VB.h - 14}
        fill="currentColor"
        opacity={0.6}
        fontFamily="ui-monospace,monospace"
        fontSize={11}
        textAnchor="middle"
        letterSpacing="0.06em"
      >
        plan space · h: N → K
      </text>
    </svg>
  );
}
