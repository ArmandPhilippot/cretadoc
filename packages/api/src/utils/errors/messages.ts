export const error = {
  invalid: {
    input: 'Too many arguments.',
    path: (kind: 'absolute' | 'relative') => `Must be ${kind}.`,
    type: (type: string) => `Must be a valid ${type}.`,
  },
  missing: {
    input: 'Some required arguments are missing.',
    loader: (entity: string) => `${entity} cannot be loaded.`,
    mutator: (entity: string) => `${entity} cannot be mutated.`,
  },
  validation: {
    existent: (entity: string) => `Must be unique, ${entity} already exists.`,
    file: {
      name: 'Must be a valid filename, it contains forbidden characters.',
    },
    string: {
      length: ({ min, max }: { min: number; max: number }) =>
        `Must be between ${min} and ${max} characters.`,
    },
  },
} as const;
