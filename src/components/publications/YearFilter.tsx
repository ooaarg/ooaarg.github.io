import { useEffect, useState } from "react";

interface Props {
  years: number[];
  total: number;
}

export default function YearFilter({ years, total }: Props) {
  const [active, setActive] = useState<"all" | number>("all");

  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".bento");
    if (!grid) return;
    grid.dataset.yearFilter = String(active);
  }, [active]);

  // Live count of visible tiles after filter applies (CSS-driven; we read from DOM).
  const [visibleCount, setVisibleCount] = useState(total);
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".bento");
    if (!grid) return;
    const tiles = grid.querySelectorAll<HTMLElement>(".bento-tile");
    if (active === "all") {
      setVisibleCount(tiles.length);
    } else {
      let n = 0;
      tiles.forEach((t) => {
        if (t.dataset.year === String(active)) n++;
      });
      setVisibleCount(n);
    }
  }, [active, total]);

  const options: Array<"all" | number> = ["all", ...years];

  return (
    <>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map((y) => (
          <button
            key={String(y)}
            type="button"
            className={`btn btn-sm${active === y ? " btn-primary" : ""}`}
            onClick={() => setActive(y)}
            aria-pressed={active === y}
          >
            {y === "all" ? "All" : y}
          </button>
        ))}
      </div>
      <div className="toolbar-spacer" />
      <span className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>
        {visibleCount} of {total} posts
      </span>
    </>
  );
}
