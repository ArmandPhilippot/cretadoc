import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { getKeyPathValue } from '../../../../utils/helpers';
import { Preview, PreviewList, Token } from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './spacings.css';

type SpacingKind = 'margin' | 'padding';

type SpacingPreviewProps = {
  kind?: SpacingKind;
  /**
   * A token starting with `spacing.`.
   */
  token: KeyPathIn<typeof contract, 'spacing'>;
};

/**
 * SpacingPreview component
 *
 * Use it to show a preview of a spacing using any spacing token.
 */
const SpacingPreview: FC<SpacingPreviewProps> = ({ kind, token }) => {
  const isMargin = kind === 'margin';
  const isPadding = kind === 'padding';
  const boxClassName = styles.box({ isMargin, isPadding });
  const wrapperStyles = assignInlineVars({
    [styles.spacing]: getKeyPathValue(contract, token),
  });

  return (
    <Preview>
      <Token path={token} />
      <div
        className={isMargin ? styles.marginBoxesWrapper : undefined}
        style={wrapperStyles}
      >
        <div className={boxClassName} />
        {isMargin ? <div className={boxClassName} /> : null}
      </div>
    </Preview>
  );
};

type SpacingsPreviewProps = Omit<SpacingPreviewProps, 'token'> & {
  tokens: Array<SpacingPreviewProps['token']>;
};

/**
 * SpacingsPreview component
 *
 * Use it to show a list of spacing previews by providing spacing design tokens.
 */
export const SpacingsPreview: FC<SpacingsPreviewProps> = ({ kind, tokens }) => (
  <PreviewList isStacked={!!kind}>
    {tokens.map((token) => (
      <SpacingPreview key={token} kind={kind} token={token} />
    ))}
  </PreviewList>
);
