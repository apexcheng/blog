import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cheng-notes.local',
  devToolbar: {
    enabled: true,
  },
  integrations: [
    starlight({
      title: 'Cheng Notes',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/' }],
      sidebar: [
        {
          label: '指南',
          items: [{ label: 'MDX 内容展示', slug: 'guides/mdx-content' }],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    mdx(),
  ],
});
