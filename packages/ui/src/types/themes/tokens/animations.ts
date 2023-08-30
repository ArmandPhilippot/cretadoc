import type { Time } from '../../css';

/**
 * Use timing tokens for animation durations.
 */
export type AnimationDurationTokens = {
  /**
   * The duration of slowest transition.
   */
  slower: Time;
  /**
   * The duration of slow transition.
   */
  slow: Time;
  /**
   * The duration of regular transition.
   */
  medium: Time;
  /**
   * The duration of fastest transition.
   */
  fast: Time;
};

export type AnimationTimingTokens = {
  /**
   * The function to use for ease-in timing functions.
   */
  easeIn: string;
  /**
   * The function to use for ease-in-out timing functions.
   */
  easeInOut: string;
  /**
   * The function to use for ease-out timing functions.
   */
  easeOut: string;
  /**
   * The function to use for linear timing functions.
   */
  linear: string;
};

/**
 * Animation tokens.
 *
 * Control the duration and the timing function of transitions.
 */
export type AnimationTokens = {
  /**
   * The tokens to control transition duration.
   */
  duration: AnimationDurationTokens;
  /**
   * The tokens of transition timing function.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
   */
  timing: AnimationTimingTokens;
};
