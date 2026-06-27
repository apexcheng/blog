import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

export default defineConfig({
  integrations: [
    starlight({
      title: '撑的个人技术博客',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: '开始',
          items: [
            { label: '文档首页', slug: 'guides' },
            { label: '项目展示', slug: 'projects' },
          ],
        },
        {
          label: '内容分类',
          items: [
            { label: 'AI', slug: 'ai' },
            { label: 'RPA', slug: 'rpa' },
            { label: 'Projects', slug: 'projects' },
            { label: 'Diagrams', slug: 'diagrams' },
          ],
        },
      ],
    }),
    mdx(),
    mermaid(),
  ],
});
