import { describe, expect, it } from 'vitest';
import { isObjKeyExist } from './objects';

describe('is-object-key-exist', () => {
  it('returns true if the key exists in the object', () => {
    const obj = { foo: '', bar: '' };
    expect(isObjKeyExist(obj, 'foo')).toBe(true);
  });

  it('returns false if the key does not exist in the object', () => {
    const obj = { foo: '', bar: '' };
    expect(isObjKeyExist(obj, 'baz')).toBe(false);
  });

  it('returns throws an error if the first argument is not an object', () => {
    expect(() => isObjKeyExist([], 'foo')).toThrowError(
      'First argument must be an object.'
    );
  });
});
