export type LooseAutocomplete<T extends string> = T | Omit<string, T>;

export type EnsureExactShape<Shape, T extends Shape> = T &
  Record<Exclude<keyof T, keyof Shape>, unknown>;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
