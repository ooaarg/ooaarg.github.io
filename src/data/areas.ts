import type { CollectionEntry } from "astro:content";

export type AreaId = "bandits" | "autobidding" | "dbms" | "optimization" | "misc";

export interface Area {
  id: AreaId;
  name: string;
  blurb: string;
  /** When false, the area is excluded from the home page grid (e.g. "misc"). */
  showOnHome?: boolean;
}

export const AREAS: Area[] = [
  {
    id: "bandits",
    name: "Bandits and Online Learning",
    blurb: "Sequential decisions under partial information, with provable regret guarantees.",
  },
  {
    id: "autobidding",
    name: "Autobidding, Ranking and Recommender Systems",
    blurb: "Learning to bid, pace budgets, and rank recommendations under budget and ROI constraints.",
  },
  {
    id: "dbms",
    name: "DBMS Optimization",
    blurb: "Online learning for query optimization and adaptive buffer management in databases.",
  },
  {
    id: "optimization",
    name: "Optimization",
    blurb: "Convex and non-convex optimization, lower bounds, and parameter-free methods.",
  },
  {
    id: "misc",
    name: "Miscellaneous",
    blurb: "Out-of-domain applications that do not fit the core research areas.",
    showOnHome: false,
  },
];

export interface AreaStats {
  count: number;
}

/** Compute publication counts per research area. */
export function computeAreaStats(pubs: CollectionEntry<"publications">[]): Record<AreaId, AreaStats> {
  const stats: Record<AreaId, AreaStats> = {
    bandits: { count: 0 },
    autobidding: { count: 0 },
    dbms: { count: 0 },
    optimization: { count: 0 },
    misc: { count: 0 },
  };
  for (const pub of pubs) stats[pub.data.area].count += 1;
  return stats;
}
