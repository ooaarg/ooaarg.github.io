import { useState } from "react";

interface FacetItem {
  id: string;
  label: string;
  member?: boolean;
}

interface Props {
  title: string;
  items: FacetItem[];
  selected: Set<string>;
  counts: Record<string, number>;
  onToggle: (id: string) => void;
  onClear?: () => void;
  searchable?: boolean;
}

export default function FacetDropdown({
  title,
  items,
  selected,
  counts,
  onToggle,
  onClear,
  searchable,
}: Props) {
  const [q, setQ] = useState("");
  const filtered = q ? items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase())) : items;
  const count = selected.size;

  return (
    <div className="ri-group">
      <h5>{title}</h5>
      <details className="facet-dd">
        <summary>
          <span className="facet-dd-label">
            {count === 0 ? `Any ${title.toLowerCase()}` : `${count} selected`}
          </span>
          <svg
            className="facet-dd-chev"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className="facet-dd-body">
          {searchable && (
            <input
              type="text"
              className="facet-dd-search"
              placeholder={`Filter ${title.toLowerCase()}…`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          )}
          <div className="facet-dd-list">
            {filtered.map((it) => (
              <label key={it.id} className={it.member ? "is-member" : undefined}>
                <span className="left">
                  <input type="checkbox" checked={selected.has(it.id)} onChange={() => onToggle(it.id)} />
                  {it.label}
                </span>
                <span className="count">{counts[it.id] || 0}</span>
              </label>
            ))}
            {filtered.length === 0 && <p className="facet-dd-empty">No matches.</p>}
          </div>
          {count > 0 && onClear && (
            <button type="button" className="btn btn-ghost btn-sm facet-dd-clear" onClick={onClear}>
              Clear ({count})
            </button>
          )}
        </div>
      </details>
    </div>
  );
}
