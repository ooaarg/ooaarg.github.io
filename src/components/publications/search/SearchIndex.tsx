import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  FILTER_KEYS,
  readSearch,
  searchUrl,
  type FilterKey,
  type SearchState,
} from "../../../lib/publication-search";
import Facet from "./Facet";
import FacetDropdown from "./FacetDropdown";
import PaperFigure, { hasPaperFigure } from "../detail/PaperFigure";
import "../../../styles/publications-search.css";
import "../../../styles/publications-cards.css";

export interface IndexedPub {
  id: string;
  title: string;
  authors: string[];
  authorLinks: Array<{ name: string; id?: string; staff?: boolean }>;
  date: string; // Display label: DD/MM/YYYY
  year: number;
  venue: string;
  type: "paper" | "preprint" | "code" | "talk";
  area: "bandits" | "autobidding" | "dbms" | "optimization" | "misc";
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
    { id: "misc", label: "Miscellaneous" },
  ],
};

interface Props {
  /** Sorted by publication date, newest first, at build time. */
  pubs: IndexedPub[];
}

export default function SearchIndex({ pubs }: Props) {
  const [search, setSearch] = useState(() => readSearch());
  const { q, filters, sort } = search;
  const [sheetOpen, setSheetOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);

  const updateSearch = (next: SearchState, method: "pushState" | "replaceState" = "pushState") => {
    const url = searchUrl(new URL(window.location.href), next);
    if (url.href !== window.location.href) window.history[method](window.history.state, "", url);
    setSearch(next);
  };

  const toggle = (key: FilterKey, val: string) => {
    const next = new Set(filters[key]);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    updateSearch({ ...search, filters: { ...filters, [key]: next } });
  };

  const clearKey = (key: FilterKey) => updateSearch({ ...search, filters: { ...filters, [key]: new Set() } });

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
    const staff = new Set<string>();
    pubs.forEach((p) => {
      p.authors.forEach((a) => set.add(a));
      p.authorLinks.forEach((a) => a.staff && staff.add(a.name));
    });
    // OOAARG staff lead the list, then everyone
    // else, each group alphabetical.
    return [...set]
      .map((a) => ({ id: a, label: a, member: staff.has(a) }))
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
    const needle = q.trim().toLowerCase();
    const xs = pubs.filter((p) => {
      if (filters.type.size && !filters.type.has(p.type)) return false;
      if (filters.area.size && !filters.area.has(p.area)) return false;
      if (filters.venue.size && !filters.venue.has(p.venue)) return false;
      if (filters.year.size && !filters.year.has(String(p.year))) return false;
      if (filters.author.size && !p.authors.some((a) => filters.author.has(a))) return false;
      if (filters.tag.size && !p.tags.some((t) => filters.tag.has(t))) return false;
      if (needle) {
        const hay = [p.title, p.abstract, p.authors.join(" "), p.venue, ...p.tags].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    return sort === "oldest" ? xs.reverse() : xs;
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

  const totalActive = FILTER_KEYS.reduce((n, k) => n + filters[k].size, 0);

  const clearAll = () => updateSearch({ ...search, filters: readSearch().filters });

  useLayoutEffect(() => {
    // Static HTML has no query string. Restore after hydration and on Back/Forward;
    // URL writes happen only in user event handlers, never during initialization.
    const restore = () => setSearch(readSearch(new URLSearchParams(window.location.search)));
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

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

  useLayoutEffect(() => {
    const sheet = sheetRef.current;
    if (!sheetOpen || !sheet) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    sheet.showModal();
    document.body.style.overflow = "hidden";
    doneRef.current?.focus();
    return () => {
      sheet.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id="ri-search"
          placeholder="Search titles, abstracts, authors, tags…"
          value={q}
          onInput={(e) => updateSearch({ ...search, q: e.currentTarget.value }, "replaceState")}
          aria-label="Search publications"
        />
        <kbd>⌘K</kbd>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          ref={triggerRef}
          type="button"
          className="btn filters-trigger"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          aria-controls="publication-filters"
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
            <span role="status" aria-live="polite" aria-atomic="true">
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
                onChange={(e) => updateSearch({ ...search, sort: e.currentTarget.value as typeof sort })}
                aria-label="Sort order"
              >
                <option value="newest">Date (newest)</option>
                <option value="oldest">Date (oldest)</option>
              </select>
            </span>
          </div>

          <ul className="ri-results">
            {filtered.map((p) => (
              <li key={p.id}>
                <div className="ri-meta-col">
                  <span className="pill accent" style={{ textTransform: "capitalize" }}>
                    {p.type}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                    {p.date}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                    {p.venue}
                  </span>
                </div>
                <div>
                  <h3>
                    <a className="ri-result-link" href={`/publications/${p.id}`}>
                      {p.title}
                    </a>
                  </h3>
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
                          <a className="author-link" href={`/about/${a.id}`}>
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

      <dialog
        ref={sheetRef}
        id="publication-filters"
        className="facet-sheet"
        onClose={() => setSheetOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        aria-label="Filters"
      >
        <div className="panel">
          <div className="grabber" aria-hidden="true" />
          <header>
            <h2>Filters</h2>
            <button
              ref={doneRef}
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => sheetRef.current?.close()}
            >
              Done
            </button>
          </header>
          {facetGroups}
        </div>
      </dialog>
    </>
  );
}
