import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { Icon } from '../../../../components';
import { getKeyPathValue } from '../../../../utils/helpers';
import { Preview, PreviewList, Token } from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './icons.css';

type IconPreviewProps = {
  /**
   * A token starting with `icon.`.
   */
  token: KeyPathIn<typeof contract, 'icon'>;
};

/**
 * IconPreview component
 *
 * Use it to show a preview of an icon using any icon token.
 */

const IconPreview: FC<IconPreviewProps> = ({ token }) => {
  const previewStyles = assignInlineVars({
    [styles.iconSize]: getKeyPathValue(contract, token),
  });

  return (
    <Preview style={previewStyles}>
      <Token path={token} />
      <Icon className={styles.icon} shape="search" />
    </Preview>
  );
};

type IconsPreviewProps = {
  tokens: Array<IconPreviewProps['token']>;
};

/**
 * IconsPreview component
 *
 * Use it to show a list of icon previews by providing icon design tokens.
 */
export const IconsPreview: FC<IconsPreviewProps> = ({ tokens }) => (
  <PreviewList>
    {tokens.map((token) => (
      <IconPreview key={token} token={token} />
    ))}
  </PreviewList>
);
