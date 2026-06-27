import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';

describe('project records', () => {
  it('keeps the first release focused on four visible project cards', () => {
    expect(projects).toHaveLength(4);
  });

  it('provides the fields needed by project cards', () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.type.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.tone.length).toBeGreaterThan(0);
    }
  });
});
