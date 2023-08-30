import type { LengthUnit, TimeUnit } from './units';

export type NumberPrefix = '+' | '-' | '';
export type PositiveLength = `${Exclude<
  NumberPrefix,
  '-'
>}${number}${LengthUnit}`;
export type NegativeLength = `${Extract<
  NumberPrefix,
  '-'
>}${number}${LengthUnit}`;
export type Length = '0' | PositiveLength | NegativeLength;
export type Percentage = `${NumberPrefix}${number}%`;
export type LengthPercentage = Length | Percentage;
export type Time = `${NumberPrefix}${number}${TimeUnit}`;
