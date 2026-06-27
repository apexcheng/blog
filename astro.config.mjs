import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cheng-notes.local',
  integrations: [
    starlight({
      title: 'Cheng Notes',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/' }],
      sidebar: [
        {
          label: 'Guides',
          items: [{ label: 'MDX 内容展示', slug: 'guides/mdx-content' }],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    mdx(),
  ],
});
