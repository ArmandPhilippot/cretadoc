import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import { Preview, type PreviewProps } from './preview';
import * as styles from './shadow.css';

/**
 * Retrieve the background color from the given token.
 *
 * @param token - A shadow token.
 * @returns {string} The CSS variable for background's color.
 */
const getBackgroundColorFrom = (
  token: KeyPathIn<typeof contract, 'shadow'>
) => {
  if (token.startsWith('shadow.critical'))
    return contract.color.background.critical;

  if (token.startsWith('shadow.info')) return contract.color.background.info;

  if (token.startsWith('shadow.inverted'))
    return contract.color.background.inverted.base;

  if (token.startsWith('shadow.muted')) return contract.color.background.muted;

  if (token.startsWith('shadow.success'))
    return contract.color.background.success;

  if (token.startsWith('shadow.warning'))
    return contract.color.background.warning;

  return contract.color.background.regular.base;
};

type ShadowProps = Pick<PreviewProps, 'label' | 'labelColor'> & {
  /**
   * Override the inline styles.
   */
  style?: Record<string, string>;
  /**
   * A token starting with `shadow.`.
   */
  token: KeyPathIn<typeof contract, 'shadow'>;
};

/**
 * Shadow component
 *
 * Use it to show a preview of a shadow using any shadow token.
 */
export const Shadow: FC<ShadowProps> = ({ style, token, ...props }) => {
  const previewStyles = assignInlineVars({
    [styles.bgColor]: getBackgroundColorFrom(token),
    [styles.boxShadow]: getContractValueFrom(token),
  });

  return (
    <Preview
      {...props}
      className={styles.preview}
      minHeight={120}
      style={{ ...previewStyles, ...style }}
      token={token}
    >
      <div className={styles.box} />
    </Preview>
  );
};
