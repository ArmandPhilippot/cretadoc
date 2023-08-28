import { useCallback, type FC, type ReactNode } from 'react';
import { useToggle } from '../../../../hooks';
import {
  Nav,
  type NavProps,
  VisuallyHidden,
  Truncate,
  type TruncateProps,
} from '../../../atoms';
import { NavItem, NavList } from '../../../molecules';
import { EllipsisItem } from './ellipsis-item';

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
  url?: string;
};

export type BreadcrumbsProps = Omit<NavProps, 'children'> & {
  /**
   * An accessible name for the ellipsis button.
   */
  ellipsisLabel?: string;
  /**
   * Should all the items be visible by default?
   *
   * @default false
   */
  isExpanded?: boolean;
  /**
   * Should we visually hide the last item for design purposes?
   *
   * @default false
   */
  isLastItemHidden?: boolean;
  /**
   * The breadcrumbs items.
   */
  items: BreadcrumbsItem[];
  /**
   * Set the maximum number of items to display.
   *
   * @default 4
   */
  maxItems?: number;
  /**
   * Set the maximum length of each item label before truncation.
   *
   * @default '15ch'
   */
  maxLength?: TruncateProps['max'];
  /**
   * The separator used between items.
   *
   * @default '/'
   */
  sep?: string;
};

/**
 * Breadcrumbs component.
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  ellipsisLabel = 'Show more items',
  isExpanded = false,
  isLastItemHidden = false,
  items,
  maxItems = 4,
  maxLength = '15ch',
  sep = '/',
  ...props
}) => {
  const [showAllItems, toggle] = useToggle(isExpanded);

  const allItems = items.map((item, index) => {
    const isLastItem = index === items.length - 1;
    const labelContent =
      typeof item.label === 'string' ? (
        <Truncate max={maxLength}>{item.label}</Truncate>
      ) : (
        item.label
      );
    const label =
      isLastItem && isLastItemHidden ? (
        <VisuallyHidden>{labelContent}</VisuallyHidden>
      ) : (
        labelContent
      );

    return (
      <NavItem
        aria-current={isLastItem ? 'page' : undefined}
        isDisabled={isLastItem}
        key={item.id}
        label={label}
        sep={isLastItem ? undefined : sep}
        to={item.url}
      />
    );
  });

  const getItemsWithEllipsis = useCallback(() => {
    const firstItem = allItems.slice(0, 1);
    const lastItems = allItems.slice(allItems.length - 2, allItems.length);

    return [
      ...firstItem,
      <EllipsisItem
        key="ellipsis"
        label={ellipsisLabel}
        onExpand={toggle}
        sep={sep}
      />,
      ...lastItems,
    ];
  }, [allItems, ellipsisLabel, sep, toggle]);

  return (
    <Nav {...props}>
      <NavList isInline isOrdered spacing="xxs">
        {allItems.length <= maxItems || showAllItems
          ? allItems
          : getItemsWithEllipsis()}
      </NavList>
    </Nav>
  );
};
