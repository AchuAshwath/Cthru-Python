// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://cthru-python.achuashwath.dev",
  base: "/",
  integrations: [
    starlight({
      title: "Cthru-Python",
      description:
        "See through Python abstractions. Master Python from hardware memory to CPython internals.",
      customCss: ["./src/styles/global.css"],
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/AchuAshwath/Cthru-Python" },
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "The Mental Model", slug: "foundations/mental-model" },
            { label: "Curated Reading & Influences", slug: "foundations/reading-list" },
          ],
        },
        {
          label: "1. The Hardware & Process",
          items: [
            { label: "The Physical Machine & RAM", slug: "foundations/hardware-and-memory" },
            { label: "Anatomy of a Running Process", slug: "foundations/process-stack-and-heap" },
          ],
        },
        {
          label: "2. The CPython Engine",
          items: [
            { label: "What Actually is Python?", slug: "foundations/what-is-python" },
            { label: "The Universal PyObject", slug: "foundations/the-pyobject" },
          ],
        },
      ],
    }),
    react(),
    mermaid(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
