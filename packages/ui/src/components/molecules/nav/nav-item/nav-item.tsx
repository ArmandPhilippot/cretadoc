import type { ReactNode, FC } from 'react';
import { Icon, ListItem, type ListItemProps } from '../../../atoms';
import { Collapsible } from '../../collapsible';
import { NavLink, type NavLinkProps } from '../nav-link';
import * as styles from './nav-item.css';

export type NavItemProps = Omit<ListItemProps, 'children'> &
  Pick<
    NavLinkProps,
    'isDisabled' | 'isSelected' | 'radiusOn' | 'to' | 'variant'
  > & {
    children?: ReactNode;
    /**
     * Add an accessible name to the expand button when using children.
     */
    expandBtnAriaLabel?: string;
    /**
     * When using children, is the item is expanded?
     *
     * @default false
     */
    isExpanded?: boolean;
    /**
     * The nav item label.
     */
    label: ReactNode;
    /**
     * Provide an accessible name to the link.
     */
    linkAriaLabel?: string;
    /**
     * A function to trigger on click on expand button when using children.
     */
    onExpand?: () => void;
    /**
     * Add a separator after the nav link.
     */
    sep?: string;
  };

/**
 * NavItem component.
 */
export const NavItem: FC<NavItemProps> = ({
  'aria-label': ariaLabel,
  children,
  className = '',
  expandBtnAriaLabel,
  isDisabled = false,
  isExpanded = false,
  isSelected = false,
  label,
  linkAriaLabel,
  onExpand,
  radiusOn,
  sep,
  to,
  variant = 'regular',
  ...props
}) => {
  const itemAriaLabel = isDisabled ? ariaLabel ?? linkAriaLabel : ariaLabel;
  const hasChildren = !!children;
  const itemClassName = styles.item({
    hasExpandedChildren: hasChildren && isExpanded,
  });

  const NavItemLink = (
    <NavLink
      aria-label={linkAriaLabel}
      isDisabled={isDisabled}
      isSelected={isSelected}
      radiusOn={radiusOn}
      to={to}
      variant={variant}
    >
      {label}
    </NavLink>
  );

  return (
    <ListItem
      {...props}
      aria-label={itemAriaLabel}
      className={`${itemClassName} ${className}`}
      hasMarker={false}
    >
      {hasChildren ? (
        <Collapsible
          bodyClassName={styles.collapsibleBody}
          className={styles.collapsible}
          expandBtnClassName={styles.expandBtn}
          expandBtnLabel={expandBtnAriaLabel}
          hasDissociatedBtn
          icon={
            <Icon
              animationSpeed="fast"
              color="primary"
              orientation={isExpanded ? 'bottom' : 'right'}
              shape="angle"
              size="sm"
            />
          }
          isExpanded={isExpanded}
          onExpand={onExpand}
          summary={NavItemLink}
        >
          {children}
        </Collapsible>
      ) : (
        NavItemLink
      )}
      {sep ? (
        <span aria-hidden={true} className={styles.sep}>
          {sep}
        </span>
      ) : null}
    </ListItem>
  );
};
