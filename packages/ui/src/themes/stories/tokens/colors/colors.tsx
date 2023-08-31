import { type KeyPathIn, removeUndefined } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { getKeyPathValue } from '../../../../utils/helpers';
import { Preview, PreviewList, Token } from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './colors.css';

type Styles = Record<string, string>;

/**
 * Retrieve the preview styles from a background token.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} token - A color token.
 * @returns {Styles} The background preview styles.
 */
const getBackgroundPreviewStyles = (
  token: KeyPathIn<typeof contract, 'color'>
): Styles => {
  return { [styles.background]: getKeyPathValue(contract, token) };
};

/**
 * Retrieve the preview styles from borders token.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} token - A color token.
 * @returns {Styles} The borders preview styles.
 */
const getBordersPreviewStyles = (
  token: KeyPathIn<typeof contract, 'color'>
): Styles => {
  return { [styles.borderColor]: getKeyPathValue(contract, token) };
};

/**
 * Retrieve the background token from a `foreground.on` token.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} fgToken - A token.
 * @returns {KeyPathIn<typeof contract, 'color'>} The background token.
 */
const getBgTokenFrom = (
  fgToken: KeyPathIn<typeof contract, 'color'>
): KeyPathIn<typeof contract, 'color'> =>
  fgToken
    .split('.')
    .map((tokenPart) => {
      if (tokenPart === 'foreground')
        return fgToken.includes('onPrimary') ? undefined : 'background';

      if (tokenPart.startsWith('on'))
        return tokenPart.replace('on', '').toLowerCase();

      return tokenPart;
    })
    .filter(removeUndefined)
    .join('.') as KeyPathIn<typeof contract, 'color'>;

/**
 * Retrieve the preview styles from a foreground token.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} token - A color token.
 * @returns {Styles} The foreground preview styles.
 */
const getForegroundPreviewStyles = (
  token: KeyPathIn<typeof contract, 'color'>
): Styles => {
  const isFgOnBgToken = token.startsWith('color.foreground.on');

  return {
    [styles.foreground]: getKeyPathValue(contract, token),
    ...(isFgOnBgToken
      ? {
          [styles.background]: getKeyPathValue(contract, getBgTokenFrom(token)),
        }
      : {}),
  };
};

type ColorContext = {
  hasBackground: boolean;
  hasBorders: boolean;
  hasForeground: boolean;
};

/**
 * Retrieve the styles using a token or the context when it is a primary color.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} token - The color token.
 * @param {ColorContext} context - The primary color context.
 * @returns {Styles} The preview styles.
 */
const getColorStylesFrom = (
  token: KeyPathIn<typeof contract, 'color'>,
  { hasBackground, hasBorders, hasForeground }: ColorContext
): Styles => {
  const isPrimary = token.startsWith('color.primary');
  const isBackground =
    (isPrimary && hasBackground) || token.startsWith('color.background');
  const isBorders =
    (isPrimary && hasBorders) || token.startsWith('color.borders');
  const isForeground =
    (isPrimary && hasForeground) || token.startsWith('color.foreground');

  if (isBackground) return getBackgroundPreviewStyles(token);
  if (isBorders) return getBordersPreviewStyles(token);
  if (isForeground) return getForegroundPreviewStyles(token);

  return {};
};

type ColorPreviewProps = {
  /**
   * A text sample to show foreground color.
   */
  content?: string;
  /**
   * Should the preview have background?
   */
  hasBackground?: boolean;
  /**
   * Should the preview have borders?
   */
  hasBorders?: boolean;
  /**
   * A token starting with `color.`.
   */
  token: KeyPathIn<typeof contract, 'color'>;
};

/**
 * ColorPreview component
 *
 * Use it to show a preview of a color.
 */
const ColorPreview: FC<ColorPreviewProps> = ({
  content,
  hasBackground = false,
  hasBorders = false,
  token,
}) => {
  const hasForeground = !!content;
  const isForegroundOnly = hasForeground && !hasBackground && !hasBorders;
  const colorClassName = styles.preview({
    hasBorders,
    isForegroundOnly,
  });
  const colorStyles = assignInlineVars(
    getColorStylesFrom(token, {
      hasBackground,
      hasBorders,
      hasForeground,
    })
  );

  return (
    <Preview>
      <Token path={token} />
      <div className={colorClassName} style={colorStyles}>
        {content}
      </div>
    </Preview>
  );
};

type ColorsPreviewProps = Omit<ColorPreviewProps, 'token'> & {
  tokens: Array<ColorPreviewProps['token']>;
};

/**
 * ColorsPreview component
 *
 * Use it to show a list of color previews by providing color design tokens.
 */
export const ColorsPreview: FC<ColorsPreviewProps> = ({ tokens, ...props }) => (
  <PreviewList>
    {tokens.map((token) => (
      <ColorPreview {...props} key={token} token={token} />
    ))}
  </PreviewList>
);
