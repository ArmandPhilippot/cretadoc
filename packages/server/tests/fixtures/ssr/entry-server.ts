import type { ServerRender } from '../../../src/types';

export const render: ServerRender = async () =>
  Promise.resolve({
    html: 'voluptatum-ullam-explicabo',
    initialState: {
      foo: 'bar',
    },
    preloadedLinks: [
      '/any-style.css',
      '/any-script.js',
      '/any-font.woff2',
      '/invalid-file.txt',
    ],
  });
