import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC } from 'react';
import { getKeyPathValue } from '../../../utils/helpers';
import { contract } from '../../contract';
import * as styles from './icon.css';
import { Preview } from './preview';

/* eslint-disable react/jsx-no-literals -- The rule should have an allowedProps
 * config. For svg components it is ok to have literals. */
const SearchIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m 28.632305,25.808545 -7.188827,-7.188454 c -0.149601,-0.149592 -0.331117,-0.253312 -0.53258,-0.311154 1.274601,-1.789136 2.030585,-3.973196 2.030585,-6.338765 0,-6.05753 -4.912897,-10.9701718 -10.970741,-10.9701718 -6.0578435,0 -10.9707411,4.9126418 -10.9707411,10.9701718 0,6.05753 4.9128976,10.970172 10.9707411,10.970172 2.365691,0 4.549865,-0.755945 6.343084,-2.030479 0.05585,0.201453 0.159573,0.380964 0.309174,0.532553 l 7.188827,7.188452 c 0.6004,0.600368 1.711437,0.452771 2.491355,-0.329106 0.77992,-0.779879 0.927528,-1.892851 0.329123,-2.493219 z M 11.970742,18.951191 c -3.8537219,0 -6.9813806,-3.127497 -6.9813806,-6.981019 0,-3.8535213 3.1276587,-6.9810185 6.9813806,-6.9810185 3.853722,0 6.981381,3.1274972 6.981381,6.9810185 0,3.853522 -3.127659,6.981019 -6.981381,6.981019 z" />
  </svg>
);
/* eslint-enable react/jsx-no-literals */

type IconProps = {
  /**
   * A token starting with `icon.`.
   */
  token: KeyPathIn<typeof contract, 'icon'>;
};

/**
 * Icon component
 *
 * Use it to show a preview of an icon using any icon token.
 */

export const Icon: FC<IconProps> = ({ token }) => {
  const previewStyles = assignInlineVars({
    [styles.iconSize]: getKeyPathValue(contract, token),
  });

  return (
    <Preview className={styles.preview} style={previewStyles} token={token}>
      <SearchIcon />
    </Preview>
  );
};
