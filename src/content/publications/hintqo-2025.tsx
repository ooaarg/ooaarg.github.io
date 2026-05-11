/** card-2026 — heatmap hero figure for cardinality-estimate calibration. */
export default function CardHeatmapFigure() {
  const cells: Array<{ x: number; y: number; pct: number; opacity: number }> =
    [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 14; c++) {
      const v = (Math.sin(r * 0.7) + Math.cos(c * 0.4)) * 0.5 + 0.5;
      cells.push({
        x: c * 28 + 10,
        y: r * 24 + 50,
        pct: Math.round(v * 60),
        opacity: 0.4 + v * 0.6,
      });
    }
  }

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Heatmap of cardinality estimates across query plans"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width={22}
          height={18}
          rx={2}
          fill={`color-mix(in oklab, var(--accent) ${cell.pct}%, var(--bg-sunken))`}
          opacity={cell.opacity.toFixed(2)}
        />
      ))}
    </svg>
  );
}
