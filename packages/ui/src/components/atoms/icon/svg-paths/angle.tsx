import type { FC } from 'react';

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
  switch (orientation) {
    case 'bottom':
      return (
        <path d="M 5,9 C 5,8.7 5.1,8.5 5.3,8.3 c 0.4,-0.4 1,-0.4 1.4,0 l 5.3,5.3 5.3,-5.3 c 0.4,-0.4 1,-0.4 1.4,0 0.4,0.4 0.4,1 0,1.4 l -6,6 c -0.4,0.4 -1,0.4 -1.4,0 l -6,-6 C 5.1,9.5 5,9.3 5,9 Z" />
      );
    case 'left':
      return (
        <path d="m 15,5 c 0.3,0 0.5,0.1 0.7,0.3 0.4,0.4 0.4,1 0,1.4 l -5.3,5.3 5.3,5.3 c 0.4,0.4 0.4,1 0,1.4 -0.4,0.4 -1,0.4 -1.4,0 l -6,-6 c -0.4,-0.4 -0.4,-1 0,-1.4 l 6,-6 C 14.5,5.1 14.7,5 15,5 Z" />
      );
    case 'right':
      return (
        <path d="M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z" />
      );
    case 'top':
    default:
      return (
        <path d="m 19,15 c 0,0.3 -0.1,0.5 -0.3,0.7 -0.4,0.4 -1,0.4 -1.4,0 L 12,10.4 6.7,15.7 c -0.4,0.4 -1,0.4 -1.4,0 -0.4,-0.4 -0.4,-1 0,-1.4 l 6,-6 c 0.4,-0.4 1,-0.4 1.4,0 l 6,6 c 0.2,0.2 0.3,0.4 0.3,0.7 z" />
      );
  }
};
