export const error = {
  invalid: {
    config: () => '',
    input: 'Too many arguments.',
    path: (kind: 'absolute' | 'relative') => `Must be ${kind}.`,
    type: (type: string) => `Must be a valid ${type}.`,
  },
  missing: {
    input: 'Some required arguments are missing.',
  },
} as const;
