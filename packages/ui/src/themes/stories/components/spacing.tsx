import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import type { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import { Preview } from './preview';
import * as styles from './spacing.css';

type SpacingProps = {
  /**
   * A token starting with `spacing.`.
   */
  token: KeyPathIn<typeof contract, 'spacing'>;
};

/**
 * Spacing component
 *
 * Use it to show a preview of a spacing using any spacing token.
 */
export const Spacing: FC<SpacingProps> = ({ token }) => {
  const previewStyles = assignInlineVars({
    [styles.spacing]: getContractValueFrom(token),
  });

  return (
    <Preview
      className={styles.spacingPreview}
      style={previewStyles}
      token={token}
    />
  );
};

/**
 * Margin component
 *
 * Use it to show a preview of a margin using any spacing token.
 */
export const Margin: FC<SpacingProps> = ({ token }) => {
  const previewStyles = assignInlineVars({
    [styles.spacing]: getContractValueFrom(token),
  });

  return (
    <Preview
      className={styles.marginPreview}
      minHeight={50}
      style={previewStyles}
      token={token}
    >
      <div className={styles.marginBoxes} />
      <div className={styles.marginBoxes} />
    </Preview>
  );
};

/**
 * Padding component
 *
 * Use it to show a preview of a padding using any spacing token.
 */
export const Padding: FC<SpacingProps> = ({ token }) => {
  const previewStyles = assignInlineVars({
    [styles.spacing]: getContractValueFrom(token),
  });

  return (
    <Preview
      className={styles.paddingPreview}
      style={previewStyles}
      token={token}
    >
      <div className={styles.paddingBox} />
    </Preview>
  );
};
