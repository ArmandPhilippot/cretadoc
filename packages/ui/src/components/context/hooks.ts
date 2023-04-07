import { type Context, useContext } from 'react';
import type { UIComponents } from './context';

/**
 * Custom hook to retrieve components defined in the given context.
 *
 * @param {Context<Record<'components', UIComponents>>} context - A context.
 * @returns {UIComponents} The components.
 */
export const useComponentsFrom = (
  context: Context<Record<'components', UIComponents>>
): UIComponents => {
  const { components } = useContext(context);

  return components;
};
