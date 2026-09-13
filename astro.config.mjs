// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://ooaarg.github.io",
  integrations: [preact(), sitemap()],
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
