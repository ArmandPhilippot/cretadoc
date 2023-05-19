import { type FC, useRef } from 'react';
import { useHeadingsTree, useMatchMedia, useToggle } from '../../hooks';
import { Article, Aside, Footer, Header, Heading, Img, Link } from '../atoms';
import { Meta } from '../molecules';
import { type BreadcrumbsItem, TableOfContents } from '../organisms';
import { Template } from './template';
import { BREAKPOINT } from './template.breakpoints';
import * as styles from './template.css';

export const WikiPageTemplate: FC = () => {
  const contentsRef = useRef<HTMLDivElement>(null);
  const pageTitle = 'Introduction';
  const breadcrumbs: BreadcrumbsItem[] = [
    { id: 'home', label: 'Home', url: '/' },
    {
      id: 'wiki',
      label: 'Wiki',
      url: '/?path=/story/components-templates--homepage',
    },
    {
      id: 'page',
      label: pageTitle,
      url: '/?path=/story/components-templates--page',
    },
  ];
  const headingNodes = useHeadingsTree({
    fromLevel: 2,
    wrapper: contentsRef.current ?? undefined,
  });
  const [isTocExpanded, expandToc] = useToggle(false);
  const isBreakpointReached = useMatchMedia(`(min-width: ${BREAKPOINT.MD}px)`);

  return (
    <Template breadcrumbs={breadcrumbs} isWikiPage>
      <Article className={styles.page({ hasTwoColumns: isBreakpointReached })}>
        <Header>
          <Heading level={1}>{pageTitle}</Heading>
          <Meta
            isInline
            items={[
              {
                id: 'update-date',
                label: 'Updated on',
                value: '19 May 2023',
              },
            ]}
          />
        </Header>
        <div>
          <p>
            Voluptas provident quia vitae assumenda molestiae. Quia ullam non
            nulla qui quia. Non repudiandae at modi aut enim. Velit qui rerum
            sunt molestias deleniti est.
          </p>
        </div>
        <Aside className={styles.sidebar}>
          <TableOfContents
            className={styles.toc}
            heading={
              isBreakpointReached ? (
                <Heading isFake level={2}>
                  On this page
                </Heading>
              ) : (
                'On this page'
              )
            }
            isCollapsible={!isBreakpointReached}
            isExpanded={isTocExpanded}
            onExpand={expandToc}
            tree={headingNodes}
          />
        </Aside>
        <div ref={contentsRef}>
          <Heading id="consequatur-debitis-molestiae" level={2}>
            Consequatur debitis molestiae
          </Heading>
          <p>
            At veritatis ut. Autem eum distinctio dolorem harum nulla. Quos
            itaque natus. Perspiciatis voluptatibus eaque totam quo.
          </p>
          <p>
            Tempore vero nesciunt et aut tempore velit. Dolorem sed maxime ad
            voluptas perferendis esse maxime aliquid reiciendis. Ut nisi et
            doloribus. Porro ex nostrum voluptate consequatur minus atque eum.
          </p>
          <Heading id="blanditiis-illo-et" level={2}>
            Blanditiis illo et
          </Heading>
          <Heading id="beatae-aut-voluptas" level={3}>
            Beatae aut voluptas
          </Heading>
          <p>
            Fugiat deleniti libero fugit praesentium. Nobis et quis sit. Omnis
            delectus ut aut ea nobis voluptatibus fugit.
          </p>
          <Img
            alt="An example of illustration"
            src="http://picsum.photos/640/480"
            width={300}
          />
          <p>
            Sit minima officia itaque maxime distinctio quia. Voluptatem
            nesciunt et beatae magni deleniti facilis perferendis. Dolorum
            temporibus cum delectus dolores earum in reiciendis. Illo corrupti
            eos aspernatur quisquam dicta consequuntur et dicta at. Itaque
            impedit provident.
          </p>
          <Heading id="ducimus-quia-pariatur" level={3}>
            Ducimus quia pariatur
          </Heading>
          <p>
            Recusandae cupiditate tempora optio omnis consectetur quia atque
            quae. Porro quia odio earum. Voluptas sapiente nam commodi voluptate
            eos nesciunt et. Sunt dolor doloremque est quia atque voluptatibus
            repellat amet. Ut commodi reprehenderit earum incidunt aut
            voluptates hic ut.
          </p>
          <p>
            Eius beatae repellat quo quis et et eligendi iusto. Hic quas
            molestiae expedita temporibus asperiores veritatis tempore sed. Sit
            ea voluptas beatae qui eligendi debitis.
          </p>
          <Heading id="consequatur-eligendi-qui" level={2}>
            Consequatur eligendi qui
          </Heading>
          <p>
            Est sed adipisci culpa architecto debitis et sit facere. Eveniet
            rerum ducimus eaque voluptatum et saepe reiciendis laboriosam.
            Ducimus aperiam animi laudantium maiores et. Sit sed quia et atque
            repellat similique delectus. Explicabo sed sint eaque recusandae.
          </p>
          <p>
            Rem nihil rerum et atque voluptas et vero cupiditate illum. Omnis
            aut doloribus ea fugiat quia fuga. Dicta sunt quia dolores a autem
            assumenda et reiciendis impedit. Nihil quod vel quia quos nihil
            tenetur id corrupti. Est facere voluptate vel provident non est. Aut
            nobis qui quae eos recusandae hic vel.
          </p>
        </div>
        <Footer>
          <Link to="https://github.com/ArmandPhilippot/cretadoc/issues">
            Report an error
          </Link>
        </Footer>
      </Article>
    </Template>
  );
};
