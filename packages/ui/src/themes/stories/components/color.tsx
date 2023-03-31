import { type KeyPathIn, removeUndefined } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import type { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import * as styles from './color.css';
import { Preview, type PreviewProps } from './preview';

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
  return { [styles.background]: getContractValueFrom(token) };
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
  return { [styles.borderColor]: getContractValueFrom(token) };
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
    [styles.foreground]: getContractValueFrom(token),
    ...(isFgOnBgToken
      ? { [styles.background]: getContractValueFrom(getBgTokenFrom(token)) }
      : {}),
  };
};

type PrimaryColorContext = 'background' | 'borders' | 'foreground';

/**
 * Retrieve the styles using a token or the context when it is a primary color.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} token - The color token.
 * @param {PrimaryColorContext} context - The primary color context.
 * @returns {Styles} The preview styles.
 */
const getPreviewStylesFrom = (
  token: KeyPathIn<typeof contract, 'color'>,
  context?: PrimaryColorContext
): Styles => {
  const isPrimary = token.startsWith('color.primary');
  const isBackground =
    (isPrimary && context === 'background') ||
    token.startsWith('color.background');
  const isBorders =
    (isPrimary && context === 'borders') || token.startsWith('color.borders');
  const isForeground =
    (isPrimary && context === 'foreground') ||
    token.startsWith('color.foreground');

  if (isBackground) return getBackgroundPreviewStyles(token);
  if (isBorders) return getBordersPreviewStyles(token);
  if (isForeground) return getForegroundPreviewStyles(token);

  return {};
};

type ColorProps = Pick<PreviewProps, 'children'> & {
  /**
   * A token starting with `color.`.
   */
  token: KeyPathIn<typeof contract, 'color'>;
};

/**
 * Color component
 *
 * Use it to show a preview of a color using any color token other than primary
 * color token.
 */
export const Color: FC<ColorProps> = ({ token, ...props }) => {
  const hasBorders = token.startsWith('color.borders');
  const isForegroundOnly =
    token.startsWith('color.foreground') &&
    !token.startsWith('color.foreground.on');
  const minHeight = 80;
  const previewClassName = styles.preview({
    hasBorders,
  });
  const previewStyles = getPreviewStylesFrom(token);

  return (
    <Preview
      {...props}
      className={previewClassName}
      minHeight={isForegroundOnly ? undefined : minHeight}
      style={assignInlineVars(previewStyles)}
      token={token}
    />
  );
};

type PrimaryColorProps = Pick<PreviewProps, 'children'> & {
  /**
   * The preview context.
   */
  context: PrimaryColorContext;
  /**
   * A token starting with `color.primary`.
   */
  token: KeyPathIn<typeof contract, 'color'>;
};

/**
 * PrimaryColor component
 *
 * Use it to show a preview of a color using a primary color token.
 */
export const PrimaryColor: FC<PrimaryColorProps> = ({
  context,
  token,
  ...props
}) => {
  const hasBorders = context === 'borders';
  const isForegroundOnly = context === 'foreground';
  const minHeight = 80;
  const previewClassName = styles.preview({
    hasBorders,
  });
  const previewStyles = getPreviewStylesFrom(token, context);

  return (
    <Preview
      {...props}
      className={previewClassName}
      minHeight={isForegroundOnly ? undefined : minHeight}
      style={assignInlineVars(previewStyles)}
      token={token}
    />
  );
};
