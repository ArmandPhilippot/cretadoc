import type { IncomingMessage, ServerResponse } from 'http';
import type { Maybe } from '@cretadoc/utils';
import type { PagesRepository } from '../schema/pages/pages.repository';
import type { PageLoaders } from './schema';

export type Loaders = PageLoaders;

export type Mutators = object;

export type Repositories = {
  pages: Maybe<PagesRepository>;
};

export type APIContext = {
  loaders?: Loaders;
  mutators?: Mutators;
};

export type ServerContext = {
  req: IncomingMessage;
  res: ServerResponse;
};
