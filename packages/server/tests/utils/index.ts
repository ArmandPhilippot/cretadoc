/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { expect } from 'vitest';
import { type CustomMatchers, matchers } from './matchers';

declare module 'vitest' {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend(matchers);

export { expect };
