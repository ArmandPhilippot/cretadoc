import { describe, expect, it } from 'vitest';
import { isRenderImport } from './import';

describe('is-render-import', () => {
  it('returns true when receiving an object with a render function', () => {
    const obj = {
      render: () => '',
    };
    expect(isRenderImport(obj)).toBe(true);
  });

  it('returns false when receiving an object with a render key that is not a function', () => {
    const obj = {
      render: 42,
    };
    expect(isRenderImport(obj)).toBe(false);
  });

  it('returns false when receiving an object without a render key', () => {
    const obj = {
      foo: 'bar',
    };
    expect(isRenderImport(obj)).toBe(false);
  });

  it('returns false when receiving a value that is not an object', () => {
    const value = 42;
    expect(isRenderImport(value)).toBe(false);
  });
});