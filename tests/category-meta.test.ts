import { describe, expect, it } from 'vitest';
import { categoryMetaList, categories } from '../src/data/categories';

describe('category metadata', () => {
  it('keeps the stable content type categories in display order', () => {
    expect(categories).toEqual(['生活', '实践', '教程', '视觉实验室']);
    expect(categoryMetaList.map((category) => category.name)).toEqual(categories);
  });

  it('documents every category with a description', () => {
    for (const category of categoryMetaList) {
      expect(category.description.trim().length).toBeGreaterThan(0);
    }
  });

  it('does not keep old topic categories in the whitelist', () => {
    expect(categories).not.toContain('AI Agent');
    expect(categories).not.toContain('影刀RPA');
    expect(categories).not.toContain('Skill');
    expect(categories).not.toContain('数据处理');
  });
});
