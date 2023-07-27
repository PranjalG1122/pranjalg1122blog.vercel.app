import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    tailwind(),
    mdx({
      shikiConfig: {
        theme: "css-variables",
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
});
