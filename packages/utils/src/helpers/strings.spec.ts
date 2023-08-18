import { describe, expect, it } from 'vitest';
import { camelCaseToHyphenated, camelToSnakeCase, slugify } from './strings';

describe('camel-case-to-hyphenated', () => {
  it('convert a camel case string to a hyphenated string', () => {
    const input = 'anyCamelCaseString';
    const result = camelCaseToHyphenated(input);

    expect(result.includes('-'));
    expect(result.split('').every((c) => c === c.toLowerCase()));
  });
});

describe('camel-case-to-snake-case', () => {
  it('convert a camel case string to a snake case string', () => {
    const input = 'anyCamelCaseString';
    const result = camelToSnakeCase(input);

    expect(result.includes('_'));
    expect(result.split('').every((c) => c === c.toLowerCase()));
  });
});

describe('slugify', () => {
  it('uses compatibility decomposition', () => {
    // cspell:disable-next-line
    const input = 'oﬀen';
    // cspell:disable-next-line
    const expected = 'offen';
    const slug = slugify(input);
    expect(slug).toBe(expected);
  });

  it('replaces all the accents', () => {
    // cspell:disable-next-line
    const input = 'éléphant';
    const slug = slugify(input);
    expect(slug).toBe(input.replaceAll('é', 'e'));
  });

  it('converts the characters to lowercase', () => {
    const input = 'LOREM';
    const slug = slugify(input);
    expect(slug).toBe(input.toLowerCase());
  });

  it('removes leading and trailing whitespace', () => {
    const input = ' iure ';
    const slug = slugify(input);
    expect(slug).toBe(input.trim());
  });

  it('replaces spaces with hyphens', () => {
    const input = 'molestiae et iste';
    const slug = slugify(input);
    expect(slug).toBe(input.replaceAll(' ', '-'));
  });

  it('replaces all non ASCII based characters with hyphens', () => {
    const input = 're#rum';
    const slug = slugify(input);
    expect(slug).toBe(input.replace('#', '-'));
  });

  it('replaces double hyphens with a single hyphen', () => {
    const input = 'facilis--est';
    const slug = slugify(input);
    expect(slug).toBe(input.replace('--', '-'));
  });

  it('removes the leading and trailing hyphens', () => {
    const input = '-ut-';
    const slug = slugify(input);
    expect(slug).toBe(input.replaceAll('-', ''));
  });

  it('slugify a string', () => {
    const input = 'Lorem Ipsum II, 251 - ★★★';
    const expected = 'lorem-ipsum-ii-251';
    const slug = slugify(input);
    expect(slug).toBe(expected);
  });

  it('throws an error if the argument is not a string', () => {
    // @ts-expect-error - An error should be thrown since it is not a string.
    expect(() => slugify(true)).toThrowError('The argument must be a string.');
  });
});
