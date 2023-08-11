import {
  Article,
  type ArticleProps,
  Aside,
  Heading,
  type HeadingsTreeNode,
  Header,
  Spinner,
} from '@cretadoc/ui';
import type { Maybe } from '@cretadoc/utils';
import type { FC, ReactNode, Ref } from 'react';
import { useIntl } from 'react-intl';
import { TableOfContents } from '../table-of-contents';
import * as styles from './page.css';

export type PageProps = Omit<ArticleProps, 'children'> & {
  /**
   * The page contents.
   */
  children: ReactNode;
  /**
   * Assign a ref to the contents wrapper.
   */
  contentsRef?: Maybe<Ref<HTMLDivElement>>;
  /**
   * Is the page loading?
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * The page title.
   */
  title: string;
  /**
   * The headings in the page.
   */
  toc?: HeadingsTreeNode[];
};

export const Page: FC<PageProps> = ({
  children,
  className = '',
  contentsRef,
  isLoading = false,
  title,
  toc,
  ...props
}) => {
  const intl = useIntl();
  const hasSidebar = !!toc?.length;
  const pageClassName = `${styles.page({ hasSidebar })} ${className}`;
  const contentsClassName = `${styles.firstColumn} ${styles.contents}`;
  const sidebarClassName = `${styles.secondColumn} ${styles.sidebar}`;

  const loadingPage = intl.formatMessage({
    defaultMessage: 'The requested page is loading...',
    description: 'Page: loading page message',
    id: 'R1rt/u',
  });

  if (isLoading)
    return (
      <Article {...props} className={pageClassName}>
        <Spinner className={styles.spinner}>{loadingPage}</Spinner>
      </Article>
    );

  return (
    <Article {...props} className={pageClassName}>
      <Header className={styles.firstColumn}>
        <Heading level={1}>{title}</Heading>
      </Header>
      {hasSidebar ? (
        <Aside className={sidebarClassName}>
          <TableOfContents className={styles.toc} tree={toc} />
        </Aside>
      ) : null}
      <div className={contentsClassName} ref={contentsRef}>
        {children}
      </div>
    </Article>
  );
};
