import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const articlesSource = readFileSync('src/pages/articles/index.astro', 'utf8');
const articleListSource = readFileSync('src/components/ArticleList.astro', 'utf8');
const categorySource = readFileSync('src/pages/articles/category/[category].astro', 'utf8');

describe('articles page category filter', () => {
  it('filters categories inside the articles page while keeping category archives', () => {
    expect(articlesSource).toContain('data-category-filter');
    expect(articlesSource).toContain('?category=${encodeURIComponent(category.name)}');
    expect(articlesSource).toContain('URLSearchParams(window.location.search)');
    expect(articlesSource).toContain('history.replaceState');
    expect(articlesSource).not.toContain('/articles/category/${encodeURIComponent(category.name)}/');
    expect(articleListSource).toContain('data-article-list');
    expect(articleListSource).toContain('data-article-item');
    expect(articleListSource).toContain('data-category={post.data.category}');
    expect(categorySource).toContain('getStaticPaths');
  });
});
