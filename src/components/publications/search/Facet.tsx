import { type Locale } from "../../../lib/i18n";
import { useLocale } from "../../../lib/use-locale";
interface FacetItem {
  id: string;
  label: string;
}

interface Props {
  initialLocale: Locale;
  title: string;
  items: FacetItem[];
  selected: Set<string>;
  counts: Record<string, number>;
  onToggle: (id: string) => void;
}

export default function Facet({ initialLocale, title, items, selected, counts, onToggle }: Props) {
  const { t } = useLocale(initialLocale);
  return (
    <div className="ri-group">
      <h3 className="ri-group-label">{t(title)}</h3>
      <div className="facet">
        {items.map((it) => (
          <label key={it.id}>
            <span className="left">
              <input type="checkbox" checked={selected.has(it.id)} onChange={() => onToggle(it.id)} />
              {t(it.label)}
            </span>
            <span className="count">{counts[it.id] || 0}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
