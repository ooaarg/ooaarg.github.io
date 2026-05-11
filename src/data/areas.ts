import type { CollectionEntry } from "astro:content";

export type AreaId = "bandits" | "autobidding" | "dbms" | "optimization";

export interface Area {
  id: AreaId;
  name: string;
  blurb: string;
}

export const AREAS: Area[] = [
  {
    id: "bandits",
    name: "Bandits and Online Learning",
    blurb:
      "Sequential decision-making under partial information — multi-armed bandits, contextual bandits, and adversarial online learning with provable regret guarantees.",
  },
  {
    id: "autobidding",
    name: "Autobidding, Ranking and Recommender Systems",
    blurb:
      "Auction-time bidding, ad pacing, and online ranking under budget and ROI constraints. Bringing online learning to the systems that decide what billions of users see.",
  },
  {
    id: "dbms",
    name: "DBMS Optimization",
    blurb:
      "Online query optimization, learned cardinality estimation, and adaptive index/buffer management — pushing online learning into the heart of modern database systems.",
  },
  {
    id: "optimization",
    name: "Optimization",
    blurb:
      "Convex and non-convex optimization theory, lower bounds, and parameter-free methods. The structural foundations under everything else we build.",
  },
];

export interface AreaStats {
  count: number;
  topTags: string[];
  latest: Date | null;
}

/** Compute counts, top tags, and latest date per area from the publications collection. */
export function computeAreaStats(
  pubs: CollectionEntry<"publications">[],
  topN = 3,
): Record<AreaId, AreaStats> {
  const stats: Record<AreaId, AreaStats> = {
    bandits: { count: 0, topTags: [], latest: null },
    autobidding: { count: 0, topTags: [], latest: null },
    dbms: { count: 0, topTags: [], latest: null },
    optimization: { count: 0, topTags: [], latest: null },
  };
  const tagFreq: Record<AreaId, Map<string, number>> = {
    bandits: new Map(),
    autobidding: new Map(),
    dbms: new Map(),
    optimization: new Map(),
  };

  for (const pub of pubs) {
    const a = pub.data.area as AreaId;
    stats[a].count += 1;
    if (!stats[a].latest || pub.data.date > stats[a].latest!) {
      stats[a].latest = pub.data.date;
    }
    for (const tag of pub.data.tags ?? []) {
      tagFreq[a].set(tag, (tagFreq[a].get(tag) ?? 0) + 1);
    }
  }

  for (const id of Object.keys(stats) as AreaId[]) {
    stats[id].topTags = [...tagFreq[id].entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, topN)
      .map(([t]) => t);
  }
  return stats;
}
