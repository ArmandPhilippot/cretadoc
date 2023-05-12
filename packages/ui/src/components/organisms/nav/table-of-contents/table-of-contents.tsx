import type { FC, ReactNode } from 'react';
import { Icon, Link, List, ListItem, Nav, type NavProps } from '../../../atoms';
import { Collapsible, type CollapsibleProps } from '../../../molecules';
import * as styles from './table-of-contents.css';

export type TableOfContentsTreeNode = {
  /**
   * The nodes dependant on this one.
   */
  children?: TableOfContentsTreeNode[];
  /**
   * The heading id.
   */
  id: string;
  /**
   * The heading label.
   */
  label: string;
};

export type TableOfContentsProps = Omit<NavProps, 'children'> &
  Pick<CollapsibleProps, 'expandBtnLabel' | 'isExpanded' | 'onExpand'> & {
    /**
     * Add a title before the headings list.
     */
    heading: ReactNode;
    /**
     * Should the table of contents be collapsible?
     *
     * @default false
     */
    isCollapsible?: boolean;
    /**
     * A tree of headings to render.
     */
    tree: TableOfContentsTreeNode[];
  };

/**
 * TableOfContents component.
 */
export const TableOfContents: FC<TableOfContentsProps> = ({
  className = '',
  expandBtnLabel,
  heading,
  isCollapsible = false,
  isExpanded,
  onExpand,
  tree,
  ...props
}) => {
  const navClassName = styles.nav({ isCollapsible });

  const getNavListFrom = (headingNodes: TableOfContentsTreeNode[]) => (
    <List
      className={styles.list}
      isHierarchical
      isOrdered
      spacing={isCollapsible ? 'xs' : 'xxs'}
    >
      {headingNodes.map((node) => (
        <ListItem key={node.id}>
          <Link to={`#${node.id}`}>{node.label}</Link>
          {node.children?.length ? getNavListFrom(node.children) : null}
        </ListItem>
      ))}
    </List>
  );

  const navList = getNavListFrom(tree);

  return (
    <Nav {...props} className={`${navClassName} ${className}`}>
      {isCollapsible ? (
        <Collapsible
          bodyClassName={styles.collapsibleBody}
          expandBtnLabel={expandBtnLabel}
          icon={
            <Icon
              animationSpeed="fast"
              orientation={isExpanded ? 'bottom' : 'right'}
              shape="angle"
              size="sm"
            />
          }
          isExpanded={isExpanded}
          onExpand={onExpand}
          summary={heading}
          expandBtnClassName={styles.collapsibleSummary({ isExpanded })}
        >
          {navList}
        </Collapsible>
      ) : (
        <>
          {heading}
          {navList}
        </>
      )}
    </Nav>
  );
};
