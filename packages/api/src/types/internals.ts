import type { IncomingMessage, ServerResponse } from 'http';
import type { Maybe } from '@cretadoc/utils';
import type { DocRepository } from '../schema/doc/doc.repository';
import type { PagesRepository } from '../schema/pages/pages.repository';
import type { API_ERROR_CODE } from '../utils/constants';
import type {
  DocLoaders,
  DocMutators,
  PageLoaders,
  PageMutators,
} from './schema';

export type Loaders = DocLoaders & PageLoaders;

export type Mutators = DocMutators & PageMutators;

export type Repositories = {
  doc: Maybe<DocRepository>;
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

export type APIErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE];

export type ErrorKind = 'range' | 'reference' | 'syntax' | 'type';

export type ErrorDetails<T extends Maybe<Record<string, unknown>> = undefined> =
  {
    errorKind: ErrorKind;
    key?: T extends undefined ? never : keyof T;
    reason: string;
    received: string;
  };
