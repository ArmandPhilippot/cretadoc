import type {
  APIContext,
  DocLoaders,
  DocMutators,
  ErrorDetails,
  Mutators,
  PageLoaders,
  PageMutators,
} from '../../types';

export type ValidDocContext = {
  loaders: Required<DocLoaders>;
  mutators: Required<DocMutators>;
};

export type ValidPageContext = {
  loaders: Required<PageLoaders>;
  mutators: Required<PageMutators>;
};

export const validateContext = (context: APIContext, key: keyof Mutators) => {
  const errors: Array<ErrorDetails<Mutators>> = [];
  if (!context.mutators?.[key])
    errors.push({
      errorKind: 'reference',
      key,
      reason: 'missing mutators',
      received: typeof context.mutators?.[key],
    });

  if (!context.loaders?.[key])
    errors.push({
      errorKind: 'reference',
      key,
      reason: 'missing loaders',
      received: typeof context.loaders?.[key],
    });

  return errors;
};

export const isValidContext = <T extends keyof Mutators>(
  _context: APIContext,
  _key: T,
  errors: Array<ErrorDetails<Mutators>>
): _context is T extends 'doc' ? ValidDocContext : ValidPageContext =>
  !errors.length;
