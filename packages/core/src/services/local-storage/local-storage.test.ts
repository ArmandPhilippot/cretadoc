import { afterEach, describe, expect, it, vi } from 'vitest';
import { LocalStorage } from './local-storage';

describe('local-storage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('can read, write and remove a key in the local storage', () => {
    const key = 'provident';
    const value = 'unde ut ut';
    LocalStorage.set(key, value);

    const storedValue = LocalStorage.get(key);

    expect(storedValue).toBe(value);

    LocalStorage.remove(key);

    const newStoredValue = LocalStorage.get(key);

    expect(newStoredValue).toBeUndefined();
  });

  it('can write and clear the local storage', () => {
    const key = 'veritatis';
    const value = 'ad et in';

    LocalStorage.set(key, value);
    LocalStorage.clear();

    const storedValue = LocalStorage.get(key);

    expect(storedValue).toBeUndefined();
  });

  it('throws an error if the value cannot be set', () => {
    const spy = vi.spyOn(console, 'error');
    LocalStorage.set('any-key', { x: 2n });
    expect(spy).toHaveBeenCalledOnce();
  });

  it('throws an error if the value cannot be read', () => {
    const key = 'distinctio';
    // prettier-ignore
    const value = () => 'foo';
    const spy = vi.spyOn(console, 'error');
    LocalStorage.set(key, value);
    const storedValue = LocalStorage.get(key);
    expect(spy).toHaveBeenCalledOnce();
    expect(storedValue).toBeUndefined();
  });
});
