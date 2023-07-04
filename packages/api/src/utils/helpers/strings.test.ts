import { describe, expect, it } from 'vitest';
import {
  decodeCursor,
  decodePrefixedId,
  generateCursor,
  generatePrefixedId,
} from './strings';

describe('decode-prefixed-id', () => {
  it('can decode a prefixed base 64 string', () => {
    const prefix = 'repellendus';
    const id = 42;
    const prefixedId = generatePrefixedId(prefix, id);
    expect(decodePrefixedId(prefix, prefixedId)).toBe(id);
  });
});

describe('decode-cursor', () => {
  it('can decode a cursor', () => {
    const currentItem = 5;
    const cursor = generateCursor(currentItem);
    expect(decodeCursor(cursor)).toBe(currentItem);
  });

  it('returns zero if the cursor is undefined', () => {
    expect(decodeCursor(undefined)).toBe(0);
  });
});
