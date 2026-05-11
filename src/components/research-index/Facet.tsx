interface FacetItem {
  id: string;
  label: string;
}

interface Props {
  title: string;
  items: FacetItem[];
  selected: Set<string>;
  counts: Record<string, number>;
  onToggle: (id: string) => void;
}

export default function Facet({
  title,
  items,
  selected,
  counts,
  onToggle,
}: Props) {
  return (
    <div className="ri-group">
      <h5>{title}</h5>
      <div className="facet">
        {items.map((it) => (
          <label key={it.id}>
            <span className="left">
              <input
                type="checkbox"
                checked={selected.has(it.id)}
                onChange={() => onToggle(it.id)}
              />
              {it.label}
            </span>
            <span className="count">{counts[it.id] || 0}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
