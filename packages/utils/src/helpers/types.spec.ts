/* eslint-disable @typescript-eslint/no-magic-numbers */
import { describe, expect, it } from 'vitest';
import {
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from './types';

describe('is-boolean', () => {
  it('returns true if the value is false', () => {
    expect(isBoolean(false)).toBe(true);
  });

  it('returns true if the value is true', () => {
    expect(isBoolean(true)).toBe(true);
  });

  it('returns false if the value is an array', () => {
    expect(isBoolean([])).toBe(false);
  });

  it('returns false if the value is null', () => {
    expect(isBoolean(null)).toBe(false);
  });

  it('returns false if the value is a number', () => {
    expect(isBoolean(42)).toBe(false);
  });

  it('returns false if the value is an object', () => {
    expect(isBoolean({})).toBe(false);
  });

  it('returns false if the value is a string', () => {
    expect(isBoolean('vitae')).toBe(false);
  });

  it('returns false if the value is undefined', () => {
    expect(isBoolean(undefined)).toBe(false);
  });
});

describe('is-null', () => {
  it('returns true if the value is null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('returns false if the value is an array', () => {
    expect(isNull([])).toBe(false);
  });

  it('returns false if the value is a boolean', () => {
    expect(isNull(false)).toBe(false);
  });

  it('returns false if the value is a number', () => {
    expect(isNull(42)).toBe(false);
  });

  it('returns false if the value is an object', () => {
    expect(isNull({})).toBe(false);
  });

  it('returns false if the value is a string', () => {
    expect(isNull('vitae')).toBe(false);
  });

  it('returns false if the value is undefined', () => {
    expect(isNull(undefined)).toBe(false);
  });
});

describe('is-number', () => {
  it('returns true if the value is a number', () => {
    expect(isNumber(42)).toBe(true);
  });

  it('returns false if the value is an array', () => {
    expect(isNumber([])).toBe(false);
  });

  it('returns false if the value is a boolean', () => {
    expect(isNumber(false)).toBe(false);
  });

  it('returns false if the value is null', () => {
    expect(isNumber(null)).toBe(false);
  });

  it('returns false if the value is an object', () => {
    expect(isNumber({})).toBe(false);
  });

  it('returns false if the value is a string', () => {
    expect(isNumber('vitae')).toBe(false);
  });

  it('returns false if the value is undefined', () => {
    expect(isNumber(undefined)).toBe(false);
  });
});

describe('is-object', () => {
  it('returns true if the value is an object', () => {
    expect(isObject({})).toBe(true);
  });

  it('returns false if the value is an array', () => {
    expect(isObject([])).toBe(false);
  });

  it('returns false if the value is a boolean', () => {
    expect(isObject(false)).toBe(false);
  });

  it('returns false if the value is null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('returns false if the value is a number', () => {
    expect(isObject(42)).toBe(false);
  });

  it('returns false if the value is a string', () => {
    expect(isObject('vitae')).toBe(false);
  });

  it('returns false if the value is undefined', () => {
    expect(isObject(undefined)).toBe(false);
  });
});

describe('is-string', () => {
  it('returns true if the value is a string', () => {
    expect(isString('vitae')).toBe(true);
  });

  it('returns false if the value is an array', () => {
    expect(isString([])).toBe(false);
  });

  it('returns false if the value is a boolean', () => {
    expect(isString(false)).toBe(false);
  });

  it('returns false if the value is null', () => {
    expect(isString(null)).toBe(false);
  });

  it('returns false if the value is a number', () => {
    expect(isString(42)).toBe(false);
  });

  it('returns false if the value is an object', () => {
    expect(isString({})).toBe(false);
  });

  it('returns false if the value is undefined', () => {
    expect(isString(undefined)).toBe(false);
  });
});

describe('is-undefined', () => {
  it('returns true if the value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('returns false if the value is an array', () => {
    expect(isUndefined([])).toBe(false);
  });

  it('returns false if the value is a boolean', () => {
    expect(isUndefined(false)).toBe(false);
  });

  it('returns false if the value is null', () => {
    expect(isUndefined(null)).toBe(false);
  });

  it('returns false if the value is a number', () => {
    expect(isUndefined(42)).toBe(false);
  });

  it('returns false if the value is an object', () => {
    expect(isUndefined({})).toBe(false);
  });

  it('returns false if the value is a string', () => {
    expect(isUndefined('vitae')).toBe(false);
  });
});
