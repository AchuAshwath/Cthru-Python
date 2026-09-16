// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://achuashwath.github.io',
  base: '/Cthru-Python',
  integrations: [
    starlight({
      title: 'Cthru-Python',
      description: 'See through Python abstractions. Interactive CPython memory & execution visualizer.',
      customCss: ['./src/styles/global.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/AchuAshwath/Cthru-Python' },
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Introduction', link: '/' },
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
