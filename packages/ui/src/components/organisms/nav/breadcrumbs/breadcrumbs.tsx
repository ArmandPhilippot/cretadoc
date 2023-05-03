import type { FC, ReactNode } from 'react';
import { Nav, type NavProps, VisuallyHidden } from '../../../atoms';
import { NavItem } from '../../../molecules/nav';
import { NavList } from '../../../molecules/nav/nav-list';

export type BreadcrumbsItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * The item label.
   */
  label: ReactNode;
  /**
   * The item url.
   */
  url: string;
};

export type BreadcrumbsProps = Omit<NavProps, 'children'> & {
  /**
   * The breadcrumbs items.
   */
  items: BreadcrumbsItem[];
  /**
   * Should we visually hide the last item for design purposes?
   */
  isLastItemHidden?: boolean;
  /**
   * The separator used between items.
   */
  sep?: string;
};

/**
 * Breadcrumbs component.
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  isLastItemHidden,
  items,
  sep = '/',
  ...props
}) => (
  <Nav {...props}>
    <NavList isInline isOrdered spacing="xxs">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <NavItem
            aria-current={isLastItem ? 'page' : undefined}
            isDisabled={isLastItem}
            key={item.id}
            label={
              isLastItem && isLastItemHidden ? (
                <VisuallyHidden>{item.label}</VisuallyHidden>
              ) : (
                item.label
              )
            }
            sep={isLastItem ? undefined : sep}
            to={item.url}
          />
        );
      })}
    </NavList>
  </Nav>
);
