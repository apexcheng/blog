import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const homeSource = readFileSync('src/pages/index.astro', 'utf8');
const aboutSource = readFileSync('src/pages/about.astro', 'utf8');
const projectsSource = readFileSync('src/pages/projects.astro', 'utf8');
const articlesSource = readFileSync('src/pages/articles/index.astro', 'utf8');
const articleDetailSource = readFileSync('src/pages/articles/[...slug].astro', 'utf8');
const categorySource = readFileSync('src/pages/articles/category/[category].astro', 'utf8');
const tagSource = readFileSync('src/pages/articles/tag/[tag].astro', 'utf8');
const searchSource = readFileSync('src/pages/search.astro', 'utf8');
const rssSource = readFileSync('src/pages/rss.xml.ts', 'utf8');

describe('front page structure', () => {
  it('keeps home project entry aligned with the projects page', () => {
    expect(homeSource).toContain('href="/projects/"');
    expect(homeSource).toContain('查看项目记录');
    expect(projectsSource).toContain('项目记录');
    expect(projectsSource).toContain('projects.map');
  });

  it('keeps about links honest while GitHub is still a placeholder', () => {
    expect(aboutSource).toContain('siteMeta.githubUrl');
    expect(aboutSource).toContain('GitHub 暂时使用占位链接');
    expect(aboutSource).toContain('siteMeta.rssPath');
    expect(aboutSource).toContain('href="/projects/"');
  });

  it('links article categories and tags to static filter pages', () => {
    expect(articlesSource).toContain('/articles/category/${encodeURIComponent(category)}/');
    expect(articlesSource).toContain('/articles/tag/${encodeURIComponent(tag)}/');
    expect(categorySource).toContain('getStaticPaths');
    expect(categorySource).toContain('!post.data.draft');
    expect(categorySource).toContain('!post.data.private');
    expect(tagSource).toContain('getStaticPaths');
    expect(tagSource).toContain('!post.data.draft');
    expect(tagSource).toContain('!post.data.private');
    expect(articlesSource).not.toContain('暂不支持点击筛选');
  });

  it('adds a static search page for the Pagefind entry point', () => {
    expect(searchSource).toContain('Pagefind');
    expect(searchSource).toContain('/guides/mdx-content/');
    expect(searchSource).not.toContain('fetch(');
  });

  it('keeps article detail pages static and content-driven', () => {
    expect(articleDetailSource).toContain('getStaticPaths');
    expect(articleDetailSource).toContain('render(post)');
    expect(articleDetailSource).not.toContain('fetch(');
  });

  it('keeps rss generated from content collections', () => {
    expect(rssSource).toContain("getCollection('posts')");
    expect(rssSource).toContain('/articles/${post.slug}/');
  });
});
