import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import type { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import * as styles from './border.css';
import { Preview, type PreviewProps } from './preview';

type Styles = Record<string, string>;

const getPreviewStylesFrom = (
  token: KeyPathIn<typeof contract, 'border'>
): Styles => {
  const isRadius = token.startsWith('border.radius');
  const isSize = token.startsWith('border.size');
  const isStyle = token.startsWith('border.style');

  if (isRadius) return { [styles.borderRadius]: getContractValueFrom(token) };
  if (isSize) return { [styles.borderWidth]: getContractValueFrom(token) };
  if (isStyle) return { [styles.borderStyle]: getContractValueFrom(token) };
  return {};
};

type BorderProps = Pick<PreviewProps, 'children'> & {
  /**
   * A token starting with `border.`.
   */
  token: KeyPathIn<typeof contract, 'border'>;
};

/**
 * Border component
 *
 * Use it to show a preview of a border using any border token.
 */
export const Border: FC<BorderProps> = ({ token, ...props }) => {
  const previewClassName = styles.preview({});
  const previewStyles = assignInlineVars(getPreviewStylesFrom(token));

  return (
    <Preview
      {...props}
      className={previewClassName}
      minHeight={80}
      style={previewStyles}
      token={token}
    />
  );
};
