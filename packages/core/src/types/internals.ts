import type { ReplaceTypesIn } from '@cretadoc/utils';
import type {
  CretadocClientConfig,
  CretadocConfig,
  CretadocServerConfig,
} from './config';

export type Validator<T = unknown> = <V = T>(value: unknown) => value is V;

export type ValidationError = {
  key: keyof CretadocConfig;
  reason: string;
  received: string;
};

export type ConfigShape = Partial<ReplaceTypesIn<CretadocConfig, unknown>>;

export type ClientConfigShape = Pick<ConfigShape, keyof CretadocClientConfig>;

export type ServerConfigShape = Pick<ConfigShape, keyof CretadocServerConfig>;
