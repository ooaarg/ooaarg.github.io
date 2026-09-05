export const FILTER_KEYS = ["type", "area", "venue", "year", "author", "tag"] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];

export interface SearchState {
  q: string;
  filters: Record<FilterKey, Set<string>>;
  sort: "newest" | "oldest";
}

export function readSearch(params = new URLSearchParams()): SearchState {
  return {
    q: params.get("q") ?? "",
    filters: Object.fromEntries(
      FILTER_KEYS.map((key) => [key, new Set(params.getAll(key).filter(Boolean))]),
    ) as SearchState["filters"],
    sort: params.get("sort") === "oldest" ? "oldest" : "newest",
  };
}

export function searchUrl(current: URL, state: SearchState): URL {
  const url = new URL(current);
  const params = url.searchParams;
  for (const key of ["q", "sort", ...FILTER_KEYS]) params.delete(key);
  if (state.q) params.set("q", state.q);
  for (const key of FILTER_KEYS) {
    for (const value of [...state.filters[key]].sort()) params.append(key, value);
  }
  if (state.sort !== "newest") params.set("sort", state.sort);
  return url;
}
