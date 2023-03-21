import type { ServerRender } from '../../../src/types';

export const render: ServerRender = async () =>
  Promise.resolve({
    html: 'voluptatum-ullam-explicabo',
  });
