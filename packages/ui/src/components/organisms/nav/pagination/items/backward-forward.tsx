import type { FC, ReactNode } from 'react';
import { Icon } from '../../../../atoms';
import { NavItem, type NavItemProps } from '../../../../molecules';

export type RenderBackwardForwardLabel = (icon: ReactNode) => ReactNode;

export type BackwardForwardProps = Omit<NavItemProps, 'label'> & {
  /**
   * The item kind.
   */
  kind: 'backward' | 'forward';
  /**
   * A function to render the link anchor.
   */
  renderLabel?: RenderBackwardForwardLabel;
};

/**
 * BackwardForward component.
 */
export const BackwardForward: FC<BackwardForwardProps> = ({
  kind,
  renderLabel,
  ...props
}) => {
  const orientation = kind === 'backward' ? 'left' : 'right';

  return (
    <NavItem
      {...props}
      label={
        renderLabel ? (
          renderLabel(
            <Icon
              color="primary"
              orientation={orientation}
              shape="angle"
              size="sm"
            />
          )
        ) : (
          <Icon
            color="primary"
            orientation={orientation}
            shape="angle"
            size="sm"
          />
        )
      }
    />
  );
};
