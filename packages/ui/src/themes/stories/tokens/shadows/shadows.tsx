import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { getKeyPathValue } from '../../../../utils/helpers';
import {
  Guideline,
  Guidelines,
  Preview,
  PreviewList,
  Token,
} from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './shadows.css';

/**
 * Retrieve the background color from the given token.
 *
 * @param shadowColor - A shadow token.
 * @returns {string} The CSS variable for background's color.
 */
const getBackgroundColorFrom = (
  shadowColor: KeyPathIn<typeof contract, 'shadow'>
) => {
  if (shadowColor.startsWith('shadow.critical'))
    return contract.color.background.critical;

  if (shadowColor.startsWith('shadow.info'))
    return contract.color.background.info;

  if (shadowColor.startsWith('shadow.inverted'))
    return contract.color.background.inverted.base;

  if (shadowColor.startsWith('shadow.muted'))
    return contract.color.background.muted;

  if (shadowColor.startsWith('shadow.success'))
    return contract.color.background.success;

  if (shadowColor.startsWith('shadow.warning'))
    return contract.color.background.warning;

  return contract.color.background.regular.base;
};

type ShadowedBoxProps = {
  background?: KeyPathIn<typeof contract, 'color'>;
  color: KeyPathIn<typeof contract, 'shadow'>;
};

const ShadowedBox: FC<ShadowedBoxProps> = ({ background, color }) => {
  const wrapperStyles = assignInlineVars({
    [styles.background]: background
      ? getKeyPathValue(contract, background)
      : getBackgroundColorFrom(color),
    [styles.boxShadow]: getKeyPathValue(contract, color),
  });

  return (
    <div className={styles.wrapper} style={wrapperStyles}>
      <div className={styles.box} />
    </div>
  );
};

type ShadowPreviewProps = {
  /**
   * A token starting with `shadow.`.
   */
  token: KeyPathIn<typeof contract, 'shadow'>;
};

/**
 * ShadowPreview component
 *
 * Use it to show a preview of a shadow using any shadow token.
 */
export const ShadowPreview: FC<ShadowPreviewProps> = ({ token }) => (
  <Preview>
    <Token path={token} />
    <ShadowedBox color={token} />
  </Preview>
);

type ShadowsPreviewProps = {
  tokens: Array<ShadowPreviewProps['token']>;
};

/**
 * ShadowsPreview component
 *
 * Use it to show a list of icon previews by providing icon design tokens.
 */
export const ShadowsPreview: FC<ShadowsPreviewProps> = ({ tokens }) => (
  <PreviewList>
    {tokens.map((token) => (
      <ShadowPreview key={token} token={token} />
    ))}
  </PreviewList>
);

export const ShadowColorGuidelines = () => {
  const backgroundColor: KeyPathIn<typeof contract, 'color'> =
    'color.background.critical';
  const goodShadowColor: KeyPathIn<typeof contract, 'shadow'> =
    'shadow.critical.bottom.left.raised';
  const badShadowColor: KeyPathIn<typeof contract, 'shadow'> =
    'shadow.regular.bottom.left.raised';

  return (
    <Guidelines>
      <Guideline kind="good">
        Background: <Token path={backgroundColor} />
        Shadow: <Token path={goodShadowColor} />
        <ShadowedBox background={backgroundColor} color={goodShadowColor} />
      </Guideline>
      <Guideline kind="bad">
        Background: <Token path={backgroundColor} />
        Shadow: <Token path={badShadowColor} />
        <ShadowedBox background={backgroundColor} color={badShadowColor} />
      </Guideline>
    </Guidelines>
  );
};
