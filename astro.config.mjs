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
      components: {
        Hero: "./src/components/Hero.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/AchuAshwath/Cthru-Python" },
      ],
      sidebar: [
        {
          label: "Foundations",
          items: [
            { label: "The Mental Model", slug: "foundations/mental-model" },
            { label: "Physical Hardware & RAM", slug: "foundations/hardware-and-memory" },
            { label: "Process Address Space", slug: "foundations/process-stack-and-heap" },
          ],
        },
        {
          label: "CPython Internals",
          items: [
            { label: "Runtime Architecture", slug: "foundations/what-is-python" },
            { label: "The Universal PyObject", slug: "foundations/the-pyobject" },
          ],
        },
        {
          label: "References",
          items: [{ label: "Bibliography & Source Files", slug: "foundations/reading-list" }],
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
