export const invalid = {
  config: {
    ssr: {
      entrypoint: 'The server entrypoint must export a render function.',
    },
    staticDir: {
      path: (received: string) =>
        `The static directory path does not exist. Received: ${received}` as const,
    },
  },
} as const;

export const missing = {
  config: {
    api: {
      instance: 'An API instance is mandatory.',
    },
    ssr: {
      entrypoint: 'In SSR mode, the server entrypoint is mandatory.',
      placeholders: 'In SSR mode, the content placeholder is mandatory.',
      template: 'In SSR mode, the template is mandatory.',
    },
    staticDir: {
      path: 'The static directory path is mandatory.',
    },
  },
} as const;
