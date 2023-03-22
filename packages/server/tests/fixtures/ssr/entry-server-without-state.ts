import type { ServerRender } from '../../../src/types';

export const render: ServerRender = async () =>
  Promise.resolve({
    html: 'vero eos sed',
  });
