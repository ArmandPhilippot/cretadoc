export const error = {
  invalid: {
    input: 'Too many arguments.',
    path: (kind: 'absolute' | 'relative') => `Must be ${kind}.` as const,
    type: (type: string) => `Must be a valid ${type}.` as const,
  },
  missing: {
    input: 'Some required arguments are missing.',
    loader: (entity: string) => `${entity} cannot be loaded.` as const,
    mutator: (entity: string) => `${entity} cannot be mutated.` as const,
  },
  validation: {
    existent: (entity: string) =>
      `Must be unique, ${entity} already exists.` as const,
    file: {
      name: 'Must be a valid filename, it contains forbidden characters.',
    },
    format: {
      id: 'Must be a valid id format.',
      path: 'Must be a relative path.',
    },
    missing: (entity: string) =>
      `The requested ${entity} does not exist.` as const,
    string: {
      length: ({ min, max }: { min: number; max: number }) =>
        `Must be between ${min} and ${max} characters.` as const,
    },
  },
} as const;
