import type { CretadocConfig } from './config';

export type Validator<T = unknown> = <V = T>(value: unknown) => value is V;

export type ValidationError = {
  key: keyof CretadocConfig;
  reason: string;
  received: string;
};

export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
