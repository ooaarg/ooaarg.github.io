import { useEffect, useMemo, useRef, useState } from "react";
import Facet from "./Facet";
import FacetDropdown from "./FacetDropdown";
import PaperFigure, { hasPaperFigure } from "../publication/PaperFigure";
import "../../styles/research-index.css";
import "../../styles/publications.css";

export interface IndexedPub {
  id: string;
  title: string;
  authors: string[];
  authorLinks: Array<{ name: string; id?: string }>;
  date: string; // DD-MM-YYYY
  year: number;
  venue: string;
  type: "paper" | "preprint" | "code" | "talk";
  area: "bandits" | "autobidding" | "dbms" | "optimization";
  tags: string[];
  abstract: string;
}

const FACETS = {
  type: [
    { id: "paper", label: "Paper" },
    { id: "preprint", label: "Preprint" },
    { id: "code", label: "Code" },
    { id: "talk", label: "Talk" },
  ],
  area: [
    { id: "bandits", label: "Bandits and Online Learning" },
    {
      id: "autobidding",
      label: "Autobidding, Ranking and Recommender Systems",
    },
    { id: "dbms", label: "DBMS" },
    { id: "optimization", label: "Optimization" },
  ],
};

interface Props {
  pubs: IndexedPub[];
}

type FilterKey = "type" | "area" | "venue" | "year" | "author" | "tag";

export default function SearchIndex({ pubs }: Props) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Record<FilterKey, Set<string>>>({
    type: new Set(),
    area: new Set(),
    venue: new Set(),
    year: new Set(),
    author: new Set(),
    tag: new Set(),
  });
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [sheetOpen, setSheetOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = (key: FilterKey, val: string) =>
    setFilters((prev) => {
      const next = new Set(prev[key]);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return { ...prev, [key]: next };
    });

  const clearKey = (key: FilterKey) => setFilters((prev) => ({ ...prev, [key]: new Set() }));

  // Derive facet items from data so it stays in sync with content collection.
  const venueItems = useMemo(() => {
    const set = new Set(pubs.map((p) => p.venue));
    return [...set].sort().map((v) => ({ id: v, label: v }));
  }, [pubs]);

  const yearItems = useMemo(() => {
    const set = new Set(pubs.map((p) => p.year));
    return [...set].sort((a, b) => b - a).map((y) => ({ id: String(y), label: String(y) }));
  }, [pubs]);

  const authorItems = useMemo(() => {
    const set = new Set<string>();
    const members = new Set<string>();
    pubs.forEach((p) => {
      p.authors.forEach((a) => set.add(a));
      p.authorLinks.forEach((a) => a.id && members.add(a.name));
    });
    // OOAARG members (those with an /about page) lead the list, then everyone
    // else, each group alphabetical.
    return [...set]
      .map((a) => ({ id: a, label: a, member: members.has(a) }))
      .sort((x, y) => {
        if (x.member !== y.member) return x.member ? -1 : 1;
        return x.label.localeCompare(y.label);
      });
  }, [pubs]);

  const tagItems = useMemo(() => {
    const set = new Set<string>();
    pubs.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [...set].sort().map((t) => ({ id: t, label: t }));
  }, [pubs]);

  const filtered = useMemo(() => {
    let xs = pubs.filter((p) => {
      if (filters.type.size && !filters.type.has(p.type)) return false;
      if (filters.area.size && !filters.area.has(p.area)) return false;
      if (filters.venue.size && !filters.venue.has(p.venue)) return false;
      if (filters.year.size && !filters.year.has(String(p.year))) return false;
      if (filters.author.size && !p.authors.some((a) => filters.author.has(a))) return false;
      if (filters.tag.size && !p.tags.some((t) => filters.tag.has(t))) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        const hay = [p.title, p.abstract, p.authors.join(" "), p.venue, ...p.tags].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    const sortKey = (d: string) => {
      const [dd, mm, yyyy] = d.split("-");
      return `${yyyy}${mm}${dd}`;
    };
    xs = [...xs].sort((a, b) =>
      sort === "newest"
        ? sortKey(b.date).localeCompare(sortKey(a.date))
        : sortKey(a.date).localeCompare(sortKey(b.date)),
    );
    return xs;
  }, [q, filters, sort, pubs]);

  // Counts per facet — based on the full corpus, not filtered, so the user can see what's available.
  const counts = useMemo(() => {
    const c: Record<FilterKey, Record<string, number>> = {
      type: {},
      area: {},
      venue: {},
      year: {},
      author: {},
      tag: {},
    };
    pubs.forEach((p) => {
      c.type[p.type] = (c.type[p.type] || 0) + 1;
      c.area[p.area] = (c.area[p.area] || 0) + 1;
      c.venue[p.venue] = (c.venue[p.venue] || 0) + 1;
      c.year[String(p.year)] = (c.year[String(p.year)] || 0) + 1;
      p.authors.forEach((a) => (c.author[a] = (c.author[a] || 0) + 1));
      p.tags.forEach((t) => (c.tag[t] = (c.tag[t] || 0) + 1));
    });
    return c;
  }, [pubs]);

  const totalActive = (Object.keys(filters) as FilterKey[]).reduce((n, k) => n + filters[k].size, 0);

  const clearAll = () =>
    setFilters({
      type: new Set(),
      area: new Set(),
      venue: new Set(),
      year: new Set(),
      author: new Set(),
      tag: new Set(),
    });

  // Seed filters from URL query params (e.g. /publications?tag=Regret&area=bandits)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seed: Partial<Record<FilterKey, Set<string>>> = {};
    const tags = params.getAll("tag");
    if (tags.length) seed.tag = new Set(tags);
    const areas = params.getAll("area");
    if (areas.length) seed.area = new Set(areas);
    const types = params.getAll("type");
    if (types.length) seed.type = new Set(types);
    if (Object.keys(seed).length) setFilters((prev) => ({ ...prev, ...seed }));
  }, []);

  // ⌘/Ctrl-K focus
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Sheet ESC + scroll lock
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [sheetOpen]);

  const facetGroups = (
    <>
      <Facet
        title="Area"
        items={FACETS.area}
        selected={filters.area}
        counts={counts.area}
        onToggle={(v) => toggle("area", v)}
      />
      <Facet
        title="Type"
        items={FACETS.type}
        selected={filters.type}
        counts={counts.type}
        onToggle={(v) => toggle("type", v)}
      />
      <FacetDropdown
        title="Author"
        items={authorItems}
        selected={filters.author}
        counts={counts.author}
        onToggle={(v) => toggle("author", v)}
        onClear={() => clearKey("author")}
        searchable
      />
      <FacetDropdown
        title="Year"
        items={yearItems}
        selected={filters.year}
        counts={counts.year}
        onToggle={(v) => toggle("year", v)}
        onClear={() => clearKey("year")}
      />
      <FacetDropdown
        title="Venue"
        items={venueItems}
        selected={filters.venue}
        counts={counts.venue}
        onToggle={(v) => toggle("venue", v)}
        onClear={() => clearKey("venue")}
        searchable
      />
      <FacetDropdown
        title="Tag"
        items={tagItems}
        selected={filters.tag}
        counts={counts.tag}
        onToggle={(v) => toggle("tag", v)}
        onClear={() => clearKey("tag")}
        searchable
      />
      {totalActive > 0 && (
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 16 }} onClick={clearAll}>
          Clear all filters ({totalActive})
        </button>
      )}
    </>
  );

  return (
    <>
      <div className="search-bar" style={{ marginTop: 8 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id="ri-search"
          placeholder="Search titles, abstracts, authors, tags…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search publications"
        />
        <kbd>⌘K</kbd>
      </div>

      {/* Mobile filters trigger */}
      <div style={{ marginTop: 12 }}>
        <button
          ref={triggerRef}
          type="button"
          className="btn filters-trigger"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
        >
          Filters{totalActive > 0 ? ` (${totalActive})` : ""}
        </button>
      </div>

      <div className="ri-grid">
        <aside className="ri-side" aria-label="Filters">
          {facetGroups}
        </aside>

        <div>
          <div className="ri-summary">
            <span>
              <strong style={{ color: "var(--fg)" }}>{filtered.length}</strong> result
              {filtered.length === 1 ? "" : "s"}
              {q && (
                <>
                  {" "}
                  for <em>"{q}"</em>
                </>
              )}
            </span>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>Sort by</span>
              <select
                className="input"
                style={{
                  height: 30,
                  width: "auto",
                  padding: "0 8px",
                  fontSize: 13,
                }}
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                aria-label="Sort order"
              >
                <option value="newest">Date (newest)</option>
                <option value="oldest">Date (oldest)</option>
              </select>
            </span>
          </div>

          <ul className="ri-results">
            {filtered.map((p) => (
              <li
                key={p.id}
                onClick={() => (window.location.href = `/publications/${p.id}`)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") window.location.href = `/publications/${p.id}`;
                }}
                aria-label={`Open publication: ${p.title}`}
              >
                <div className="ri-meta-col">
                  <span className="pill accent" style={{ textTransform: "capitalize" }}>
                    {p.type}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                    {p.date.replace(/-/g, "/")}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                    {p.venue}
                  </span>
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--fg-muted)",
                      marginBottom: 8,
                    }}
                  >
                    {p.authorLinks.map((a, i) => (
                      <span key={`${p.id}-${i}`}>
                        {a.id ? (
                          <a
                            className="author-link"
                            href={`/about/${a.id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {a.name}
                          </a>
                        ) : (
                          a.name
                        )}
                        {i < p.authorLinks.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="ri-abstract">{p.abstract}</p>
                  <div className="ri-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {hasPaperFigure(p.id) && (
                  <div className="ri-figure">
                    <PaperFigure id={p.id} />
                  </div>
                )}
              </li>
            ))}
            {filtered.length === 0 && (
              <li
                style={{
                  display: "block",
                  padding: "48px 0",
                  textAlign: "center",
                  color: "var(--fg-muted)",
                }}
              >
                No papers match these filters.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom sheet for facets on mobile */}
      <div
        className="facet-sheet"
        hidden={!sheetOpen}
        onClick={() => setSheetOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="panel" onClick={(e) => e.stopPropagation()}>
          <div className="grabber" aria-hidden="true" />
          <header>
            <h3>Filters</h3>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSheetOpen(false)}>
              Done
            </button>
          </header>
          {facetGroups}
        </div>
      </div>
    </>
  );
}
