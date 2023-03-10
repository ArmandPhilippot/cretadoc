import type { Nullable } from '@cretadoc/utils';

export type Payload<P extends string, T> = {
  [K in P]: Nullable<T>;
};
