export const invalid = {
  config: {
    staticDir: {
      path: (received: string) =>
        `Static directory path does not exist. Received: ${received}` as const,
    },
  },
} as const;

export const missing = {
  config: {
    staticDir: {
      path: 'Static directory path is mandatory.',
    },
  },
} as const;
