import { useBoolean } from '../use-boolean/use-boolean';

export type UseToggleReturn = readonly [boolean, () => void];

/**
 * React hook to toggle boolean states.
 *
 * @param {boolean} [initialState] - The initial state.
 * @returns {UseToggleReturn} The state and a function to toggle its value.
 */
export const useToggle = (initialState = false): UseToggleReturn => {
  const { state, toggle } = useBoolean(initialState);

  return [state, toggle] as const;
};
