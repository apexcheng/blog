import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { describe, expect, it } from 'vitest';

const activeTocSource = readFileSync('public/scripts/active-toc.js', 'utf8');

describe('active toc script', () => {
  it('scrolls the toc panel to reveal the active link', () => {
    const listeners: Record<string, () => void> = {};
    const tocPanel = {
      clientHeight: 100,
      scrollHeight: 300,
      scrollTop: 0,
      getBoundingClientRect: () => ({ top: 0, bottom: 100 }),
    };
    const links = [
      createLink('#intro', tocPanel, { top: 10, bottom: 40 }),
      createLink('#setup', tocPanel, { top: 140, bottom: 170 }),
    ];
    const sections = {
      intro: { id: 'intro', getBoundingClientRect: () => ({ top: -100 }) },
      setup: { id: 'setup', getBoundingClientRect: () => ({ top: 100 }) },
    };

    class IntersectionObserver {
      observe() {}
    }

    const context = vm.createContext({
      document: {
        addEventListener: (type: string, callback: () => void) => {
          listeners[type] = callback;
        },
        getElementById: (id: 'intro' | 'setup') => sections[id],
        querySelectorAll: (selector: string) => (selector === '.toc-link' ? links : []),
      },
      IntersectionObserver,
      window: {
        addEventListener() {},
        innerHeight: 800,
        IntersectionObserver,
        requestAnimationFrame: (callback: () => void) => callback(),
      },
    });

    vm.runInContext(activeTocSource, context);
    listeners.DOMContentLoaded();

    expect(tocPanel.scrollTop).toBeGreaterThan(0);
    expect(links[1].isActive).toBe(true);
  });
});

function createLink(href: string, tocPanel: object, rect: { top: number; bottom: number }) {
  const link = {
    isActive: false,
    getAttribute: (name: string) => (name === 'href' ? href : ''),
    getBoundingClientRect: () => rect,
    closest: (selector: string) => (selector === '.toc-panel' ? tocPanel : null),
    classList: {
      toggle: (className: string, enabled: boolean) => {
        if (className === 'is-active') {
          link.isActive = enabled;
        }
      },
    },
    scrollIntoView() {},
  };

  return link;
}
