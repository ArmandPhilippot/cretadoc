import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import { Preview } from './preview';
import * as styles from './shadow.css';

/**
 * Retrieve the border color from the given token.
 *
 * @param token - A shadow token.
 * @returns {string} The CSS variable for border's color.
 */
const getBorderColorFrom = (token: KeyPathIn<typeof contract, 'shadow'>) => {
  if (token.startsWith('shadow.critical'))
    return contract.color.borders.critical;

  if (token.startsWith('shadow.info')) return contract.color.borders.info;

  if (token.startsWith('shadow.inverted'))
    return contract.color.borders.inverted.base;

  if (token.startsWith('shadow.muted')) return contract.color.borders.muted;

  if (token.startsWith('shadow.success')) return contract.color.borders.success;

  if (token.startsWith('shadow.warning')) return contract.color.borders.warning;

  return contract.color.borders.regular.base;
};

type ShadowProps = {
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
export const Shadow: FC<ShadowProps> = ({ token }) => {
  const previewStyles = assignInlineVars({
    [styles.borderColor]: getBorderColorFrom(token),
    [styles.boxShadow]: getContractValueFrom(token),
  });

  return (
    <Preview style={previewStyles} token={token}>
      <div className={styles.box({ hasShadow: true })} />
    </Preview>
  );
};

/**
 * NoShadow component
 *
 * Use it to show a preview of a box without shadow.
 */
export const NoShadow: FC = () => (
  <Preview>
    <div className={styles.box({ hasShadow: false })} />
  </Preview>
);
