// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://ooaarg.github.io",
  integrations: [
    preact(),
    sitemap({
      filter: (page) =>
        /^\/(en|ru)(\/|$)/.test(new URL(page).pathname) && !new URL(page).pathname.includes("/404"),
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  prefetch: true,
  vite: {
    optimizeDeps: {
      rolldownOptions: {
        transform: {
          // The dependency scanner transforms TSX containing import.meta.glob
          // separately from the Preact plugin and does not read tsconfig here.
          jsx: { runtime: "automatic", importSource: "preact" },
        },
      },
    },
    server: {
      allowedHosts: [".trycloudflare.com"],
    },
  },
});
