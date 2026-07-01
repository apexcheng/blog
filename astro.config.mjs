import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://apexcheng.github.io',
  devToolbar: {
    enabled: true,
  },
  integrations: [mdx()],
});
