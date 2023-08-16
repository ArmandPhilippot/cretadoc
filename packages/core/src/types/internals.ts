import type { PartialDeep, ReplaceTypesIn } from '@cretadoc/utils';
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

export type ColorScheme =
  | 'dark'
  | 'light'
  | 'normal'
  | 'only light'
  | 'dark light'
  | 'light dark';

export type Favicon = {
  slug: string;
  type: string;
};

export type FaviconWithSize = Favicon & { size: string };

export type OpenGraphMeta = {
  description: string;
  siteName: string;
  title: string;
  type: string;
  url: string;
};

export type WebpageMeta = {
  applicationName: string;
  canonical: string;
  charset: string;
  colorScheme: ColorScheme;
  description: string;
  favicon: Favicon | FaviconWithSize[];
  openGraph: OpenGraphMeta;
  robots: string;
  title: string;
  viewport: string;
};

export type PageOrEntryMeta = Pick<
  PartialDeep<WebpageMeta>,
  'canonical' | 'description' | 'openGraph' | 'robots' | 'title'
>;

type FilteredKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

type RemoveNever<T> = {
  [K in FilteredKeys<T>]: T[K];
};

type ExcludeCommonProps<Obj1 extends Record<PropertyKey, unknown>, Obj2> = {
  [K in keyof Obj1]?: K extends keyof Obj2 ? never : Obj1[K];
};

export type CommonMeta = RemoveNever<
  Required<ExcludeCommonProps<WebpageMeta, PageOrEntryMeta>>
>;
