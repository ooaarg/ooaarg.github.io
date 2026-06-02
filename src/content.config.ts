import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/publications",
  }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    date: z.coerce.date(),
    venue: z.string(),
    tag: z.enum(["Oral", "Spotlight", "Paper", "Preprint", "Journal", "Code", "Talk"]),
    type: z.enum(["paper", "preprint", "code", "talk"]),
    area: z.enum(["bandits", "autobidding", "dbms", "optimization"]),
    featured: z.boolean().default(false),
    /** Lower numbers lead the home featured carousel. Unset entries keep their
     *  natural (collection) order after all explicitly-ranked ones. */
    featuredOrder: z.number().int().optional(),
    span: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(6)]).default(2),
    tags: z.array(z.string()).default([]),
    arxiv: z.string().optional(),
    /** DOI of the published/accepted version, e.g. "10.1145/3696410.3714657".
     *  Resolves to the publisher page (ACM, IEEE, Springer, …) and renders as
     *  the primary "Paper" button, taking precedence over arXiv. */
    doi: z.string().optional(),
    github: z.string().url().optional(),
    pdf: z.string().url().optional(),
    /** Arbitrary external links — IEEE, ACM, ResearchGate PDF, Springer,
     *  publisher pages, etc. Each renders as a button on the detail page. */
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
    summary: z.string().max(320),
    cited_by: z.number().int().nonnegative().optional(),
    funding: z.string().optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    initials: z.string().min(1).max(3),
    role: z.string(),
    topic: z.string(),
    group: z.enum(["faculty", "postdoc", "phd", "alumni", "partner"]),
    /** Affiliation for `partner`-group members. Drives the per-organization
     *  grouping of the Partners section on /about. */
    org: z.string().optional(),
    order: z.number().int().default(100),
    office: z.string().optional(),
    email: z.string().email().optional(),
    links: z
      .object({
        scholar: z.string().url().optional(),
        dblp: z.string().url().optional(),
        github: z.string().url().optional(),
        cv: z.string().url().optional(),
        orcid: z.string().url().optional(),
        researchgate: z.string().url().optional(),
        /** Personal homepage / lab page. */
        website: z.string().url().optional(),
        /** Anything else — Mastodon, Bluesky, Semantic Scholar, etc. */
        other: z
          .array(
            z.object({
              label: z.string(),
              url: z.string().url(),
            }),
          )
          .default([]),
      })
      .default({ other: [] }),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      /** Path relative to the entry file — co-located in `src/content/news/`.
       *  Astro resolves and processes the asset at build time. Optional; the
       *  bento tile and detail page both fall back to a text-only layout. */
      image: image().optional(),
      /** Alt text for the image. */
      imageAlt: z.string().default(""),
      summary: z.string().max(320),
      span: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(6)]).default(3),
      /** Optional outbound link (e.g. NeurIPS accepted-papers page). */
      href: z.string().url().optional(),
    }),
});

export const collections = { publications, people, news };
