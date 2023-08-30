import type { SpacingTokens } from '../../../types';

const getSpacingSizes = () => {
  const PERFECT_FIFTH = 1.5;
  const levels: Array<keyof SpacingTokens> = [
    'xxs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
  ];
  const LVL_NUMBER_BEFORE_MD_SIZE = 3;
  let current = PERFECT_FIFTH / (PERFECT_FIFTH * LVL_NUMBER_BEFORE_MD_SIZE);

  return Object.fromEntries(
    levels.map((level) => {
      current = current * PERFECT_FIFTH;
      return [level, `${current}rem`];
    })
  ) as SpacingTokens;
};

export const spacing: SpacingTokens = getSpacingSizes();
