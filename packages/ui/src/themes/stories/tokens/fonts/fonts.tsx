import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { getKeyPathValue } from '../../../../utils/helpers';
import {
  Preview,
  type PreviewProps,
  PreviewList,
  Token,
} from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './fonts.css';

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
    return { [styles.fontFamily]: getKeyPathValue(contract, token) };

  if (isFontSize(token))
    return { [styles.fontSize]: getKeyPathValue(contract, token) };

  if (isFontWeight(token))
    return { [styles.fontWeight]: getKeyPathValue(contract, token) };

  if (isLetterSpacing(token))
    return { [styles.letterSpacing]: getKeyPathValue(contract, token) };

  if (isLineHeight(token))
    return { [styles.lineHeight]: getKeyPathValue(contract, token) };

  return {};
};

type FontPreviewProps = Pick<PreviewProps, 'isInline'> & {
  /**
   * A text sample.
   */
  sample: string;
  /**
   * A token starting with `font.`.
   */
  token: KeyPathIn<typeof contract, 'font'>;
};

/**
 * FontPreview component
 *
 * Use it to show a preview of a font using any font token.
 */
const FontPreview: FC<FontPreviewProps> = ({ sample, token, ...props }) => {
  const previewClassName = styles.preview({});
  const previewStyles = assignInlineVars(getPreviewStylesFrom(token));

  return (
    <Preview {...props} className={previewClassName} style={previewStyles}>
      <Token path={token} />
      {sample}
    </Preview>
  );
};

type FontsPreviewProps = Omit<FontPreviewProps, 'token'> & {
  tokens: Array<FontPreviewProps['token']>;
};

/**
 * FontsPreview component
 *
 * Use it to show a list of font previews by providing font design tokens.
 */
export const FontsPreview: FC<FontsPreviewProps> = ({ tokens, ...props }) => (
  <PreviewList isStacked>
    {tokens.map((token) => (
      <FontPreview {...props} key={token} token={token} />
    ))}
  </PreviewList>
);
