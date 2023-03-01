import type { IncomingMessage, ServerResponse } from 'http';

export type Loaders = object;

export type Mutators = object;

export type Repositories = {
  documentation: object;
  pages: object;
};

export type APIContext = {
  loaders?: Loaders;
  mutators?: Mutators;
  repositories?: Repositories;
};

export type ServerContext = {
  req: IncomingMessage;
  res: ServerResponse;
};
