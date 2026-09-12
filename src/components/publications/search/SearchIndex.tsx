import { contentText, contentLanguage } from "../../../lib/content-language";
import { formatDate } from "../../../lib/dates";
import { useLocale } from "../../../lib/use-locale";
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
  ru?: { title?: string; summary?: string; venue?: string; tags?: Record<string, string> };
  authors: string[];
  authorLinks: Array<{ name: string; id?: string; staff?: boolean; ru?: string }>;
  date: string; // Display label, e.g. 17 Aug 2026
  dateISO: string;
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
  const { t, locale } = useLocale();
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
    return [...set].sort().map((v) => ({
      id: v,
      label: contentText(v, pubs.find((p) => p.venue === v && p.ru?.venue)?.ru?.venue, locale),
      lang: contentLanguage(pubs.find((p) => p.venue === v && p.ru?.venue)?.ru?.venue, locale),
    }));
  }, [pubs, locale]);

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
      .map((a) => ({
        id: a,
        label: contentText(
          a,
          pubs.flatMap((p) => p.authorLinks).find((author) => author.name === a && author.ru)?.ru,
          locale,
        ),
        lang: contentLanguage(
          pubs.flatMap((p) => p.authorLinks).find((author) => author.name === a && author.ru)?.ru,
          locale,
        ),
        member: staff.has(a),
      }))
      .sort((x, y) => {
        if (x.member !== y.member) return x.member ? -1 : 1;
        return x.label.localeCompare(y.label);
      });
  }, [pubs, locale]);

  const tagItems = useMemo(() => {
    const set = new Set<string>();
    pubs.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [...set].sort().map((t) => ({
      id: t,
      label: contentText(t, pubs.find((p) => p.ru?.tags?.[t])?.ru?.tags?.[t], locale),
      lang: contentLanguage(pubs.find((p) => p.ru?.tags?.[t])?.ru?.tags?.[t], locale),
    }));
  }, [pubs, locale]);

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
        const hay = [
          p.title,
          p.abstract,
          p.authors.join(" "),
          p.venue,
          ...p.tags,
          p.ru?.title,
          p.ru?.summary,
          p.ru?.venue,
          ...Object.values(p.ru?.tags ?? {}),
          ...p.authorLinks.map((a) => a.ru),
        ]
          .join(" ")
          .toLowerCase();
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
        items={FACETS.type.filter((type) => (counts.type[type.id] ?? 0) > 0)}
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
          {t("Clear all filters")} ({totalActive})
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
          placeholder={t("Search titles, abstracts, authors, tags\u2026")}
          value={q}
          onInput={(e) => updateSearch({ ...search, q: e.currentTarget.value }, "replaceState")}
          aria-label={t("Search publications")}
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
          {t("Filters")}
          {totalActive > 0 ? ` (${totalActive})` : ""}
        </button>
      </div>

      <div className="ri-grid">
        <aside className="ri-side" aria-label={t("Filters")}>
          {facetGroups}
        </aside>

        <div>
          <div className="ri-summary">
            <span role="status" aria-live="polite" aria-atomic="true">
              {t("Results")}: <strong style={{ color: "var(--fg)" }}>{filtered.length}</strong>
              {q && (
                <>
                  {" "}
                  {t("for")} <em>"{q}"</em>
                </>
              )}
            </span>
            <div className="ri-sort" role="group" aria-label={t("Sort by date")}>
              {(["newest", "oldest"] as const).map((order) => (
                <button
                  key={order}
                  type="button"
                  aria-pressed={sort === order}
                  onClick={() => {
                    if (sort !== order) updateSearch({ ...search, sort: order });
                  }}
                >
                  {order === "newest" ? t("Newest") : t("Oldest")}
                </button>
              ))}
            </div>
          </div>

          <ul className="ri-results">
            {filtered.map((p) => (
              <li key={p.id}>
                <div className="ri-meta-col">
                  <span className="ri-type ri-meta-item">
                    {(p.type === "paper" || p.type === "preprint") && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
                        <path d="M14 3v6h6M8 13h8M8 17h5" />
                      </svg>
                    )}
                    <span>{t(p.type)}</span>
                  </span>
                  <span className="ri-meta-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M7 3v4m10-4v4M3 11h18" />
                    </svg>
                    <time dateTime={p.dateISO}>{formatDate(p.dateISO, locale)}</time>
                  </span>
                  <span className="ri-meta-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="7" r="3" />
                      <path d="M6 21v-3a6 6 0 0 1 12 0v3M5 4a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6M3 20v-3a5 5 0 0 1 3-4m15 7v-3a5 5 0 0 0-3-4" />
                    </svg>
                    <span lang={contentLanguage(p.ru?.venue, locale)}>
                      {contentText(p.venue, p.ru?.venue, locale)}
                    </span>
                  </span>
                </div>
                <div>
                  <h3 lang={contentLanguage(p.ru?.title, locale)}>
                    <a className="ri-result-link" href={`/publications/${p.id}`}>
                      {contentText(p.title, p.ru?.title, locale)}
                    </a>
                  </h3>
                  <p className="ri-authors">
                    {p.authorLinks.map((a, i) => (
                      <span key={`${p.id}-${i}`} lang={contentLanguage(a.ru, locale)}>
                        {a.id ? (
                          <a className="author-link" href={`/about/${a.id}`}>
                            {contentText(a.name, a.ru, locale)}
                          </a>
                        ) : (
                          contentText(a.name, a.ru, locale)
                        )}
                        {i < p.authorLinks.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="ri-abstract" lang={contentLanguage(p.ru?.summary, locale)}>
                    {contentText(p.abstract, p.ru?.summary, locale)}
                  </p>
                  <div className="ri-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="pill" lang={contentLanguage(p.ru?.tags?.[t], locale)}>
                        {contentText(t, p.ru?.tags?.[t], locale)}
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
                {t("No papers match these filters.")}
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
        aria-label={t("Filters")}
      >
        <div className="panel">
          <div className="grabber" aria-hidden="true" />
          <header>
            <h2>{t("Filters")}</h2>
            <button
              ref={doneRef}
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => sheetRef.current?.close()}
            >
              {t("Done")}
            </button>
          </header>
          {facetGroups}
        </div>
      </dialog>
    </>
  );
}
