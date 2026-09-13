import { type Locale } from "../../../lib/i18n";
import { useLocale } from "../../../lib/use-locale";
import { useState } from "preact/hooks";

interface Props {
  initialLocale: Locale;
  years: number[];
  total: number;
}

export default function YearFilter({ initialLocale, years, total }: Props) {
  const { t, locale } = useLocale(initialLocale);
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
            {y === "all" ? t("All") : y}
          </button>
        ))}
      </div>
      <div className="toolbar-spacer" />
      <span className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>
        {locale === "ru" ? `Записи: ${visibleCount} из ${total}` : `${visibleCount} of ${total} posts`}
      </span>
    </>
  );
}
