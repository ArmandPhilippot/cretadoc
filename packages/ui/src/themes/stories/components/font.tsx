import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import type { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import * as styles from './font.css';
import { Preview, type PreviewProps } from './preview';

type Styles = Record<string, string>;

const isFontFamily = (token: KeyPathIn<typeof contract, 'font'>) =>
  token.startsWith('font.family');

const isFontSize = (token: KeyPathIn<typeof contract, 'font'>) =>
  token.startsWith('font.size');

const isFontWeight = (token: KeyPathIn<typeof contract, 'font'>) =>
  token.startsWith('font.weight');

const isLetterSpacing = (token: KeyPathIn<typeof contract, 'font'>) =>
  token.startsWith('font.letterSpacing');

const isLineHeight = (token: KeyPathIn<typeof contract, 'font'>) =>
  token.startsWith('font.lineHeight');

const getPreviewStylesFrom = (
  token: KeyPathIn<typeof contract, 'font'>
): Styles => {
  if (isFontFamily(token))
    return { [styles.fontFamily]: getContractValueFrom(token) };

  if (isFontSize(token))
    return { [styles.fontSize]: getContractValueFrom(token) };

  if (isFontWeight(token))
    return { [styles.fontWeight]: getContractValueFrom(token) };

  if (isLetterSpacing(token))
    return { [styles.letterSpacing]: getContractValueFrom(token) };

  if (isLineHeight(token))
    return { [styles.lineHeight]: getContractValueFrom(token) };

  return {};
};

type FontProps = Pick<PreviewProps, 'children' | 'orientation'> & {
  /**
   * A token starting with `font.`.
   */
  token: KeyPathIn<typeof contract, 'font'>;
};

/**
 * Font component
 *
 * Use it to show a preview of a font using any font token.
 */
export const Font: FC<FontProps> = ({ token, ...props }) => {
  const previewClassName = styles.preview({});
  const previewStyles = assignInlineVars(getPreviewStylesFrom(token));

  return (
    <Preview
      {...props}
      className={previewClassName}
      style={previewStyles}
      token={token}
    />
  );
};
