import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { getKeyPathValue } from '../../../../utils/helpers';
import { Preview, PreviewList, Token } from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './borders.css';

const getBordersStylesFrom = (token: KeyPathIn<typeof contract, 'border'>) => {
  const isRadius = token.startsWith('border.radius');
  const isSize = token.startsWith('border.size');
  const isStyle = token.startsWith('border.style');

  if (isRadius)
    return { [styles.borderRadius]: getKeyPathValue(contract, token) };
  if (isSize) return { [styles.borderWidth]: getKeyPathValue(contract, token) };
  if (isStyle)
    return { [styles.borderStyle]: getKeyPathValue(contract, token) };
  return {};
};

type BorderPreviewProps = {
  /**
   * A token starting with `border.`.
   */
  token: KeyPathIn<typeof contract, 'border'>;
};

/**
 * BorderPreview component
 *
 * Use it to show a preview of a border using any border token.
 */
const BorderPreview: FC<BorderPreviewProps> = ({ token, ...props }) => {
  const borderStyles = assignInlineVars(getBordersStylesFrom(token));

  return (
    <Preview {...props}>
      <Token path={token} />
      <div className={styles.border} style={borderStyles} />
    </Preview>
  );
};

type BordersPreviewProps = {
  tokens: Array<BorderPreviewProps['token']>;
};

/**
 * BordersPreview component
 *
 * Use it to show a list of borders previews by providing border design tokens.
 */
export const BordersPreview: FC<BordersPreviewProps> = ({ tokens }) => (
  <PreviewList>
    {tokens.map((token) => (
      <BorderPreview key={token} token={token} />
    ))}
  </PreviewList>
);
