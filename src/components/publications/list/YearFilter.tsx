import { useState } from "react";

interface Props {
  years: number[];
  total: number;
}

export default function YearFilter({ years, total }: Props) {
  const [active, setActive] = useState<"all" | number>("all");

  const [visibleCount, setVisibleCount] = useState(total);
  const selectYear = (year: "all" | number) => {
    setActive(year);
    const tiles = document.querySelectorAll<HTMLElement>(".bento .bento-tile");
    let count = 0;
    tiles.forEach((tile) => {
      tile.hidden = year !== "all" && tile.dataset.year !== String(year);
      if (!tile.hidden) count++;
    });
    setVisibleCount(count);
  };

  const options: Array<"all" | number> = ["all", ...years];

  return (
    <>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map((y) => (
          <button
            key={String(y)}
            type="button"
            className={`btn btn-sm${active === y ? " btn-primary" : ""}`}
            onClick={() => selectYear(y)}
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
