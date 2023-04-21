import type { FC } from 'react';
import * as styles from './angle.css';

type AngleOrientation = 'bottom' | 'left' | 'right' | 'top';

export type AngleSVGPathsProps = {
  /**
   * The direction of the angle's corner.
   */
  orientation: AngleOrientation;
};

/**
 * Angle SVG Paths.
 */
export const AngleSVGPaths: FC<AngleSVGPathsProps> = ({ orientation }) => {
  const pathClassName = styles.angle({ orientation });

  return (
    <path
      className={pathClassName}
      d="m 10.730467,24.962245 c -0.426954,0 -0.711589,-0.142318 -0.9962248,-0.426953 -0.5692711,-0.569271 -0.5692711,-1.423178 0,-1.992449 L 17.277085,15.000001 9.7342422,7.4571577 c -0.5692711,-0.5692711 -0.5692711,-1.4231777 0,-1.9924489 0.5692708,-0.5692711 1.4231778,-0.5692711 1.9924488,0 l 8.539067,8.5390672 c 0.569271,0.569271 0.569271,1.423178 0,1.992449 l -8.539067,8.539067 c -0.284635,0.284635 -0.569271,0.426953 -0.996224,0.426953 z"
    />
  );
};
