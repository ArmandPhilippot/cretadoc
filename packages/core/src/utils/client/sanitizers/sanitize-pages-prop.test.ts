import { describe, expect, it } from 'vitest';
import type { CretadocPages } from '../../../types';
import { sanitizePagesProp } from './sanitize-pages-prop';

describe('sanitize-pages-prop', () => {
  it('removes the markdown extension of each filename', () => {
    const pages: CretadocPages = {
      homepage: 'home.md',
      legalNotice: null,
    };
    const expectedPages: CretadocPages = {
      homepage: 'home',
      legalNotice: null,
    };

    expect(sanitizePagesProp(pages)).toStrictEqual(expectedPages);
  });

  it('returns the given filenames when they do not have an extension', () => {
    const pages: CretadocPages = {
      homepage: 'home',
      // A filename with the pattern inside the name.
      legalNotice: 'ei.mds',
    };

    expect(sanitizePagesProp(pages)).toStrictEqual(pages);
  });
});
