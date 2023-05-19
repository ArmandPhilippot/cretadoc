import { type FC, useId, useState, useCallback } from 'react';
import { useBoolean, useScrollPosition, useToggle } from '../../hooks';
import { themes as allThemes } from '../../themes';
import {
  Footer,
  Header,
  Icon,
  Img,
  Layout,
  Link,
  Main,
  type MainProps,
} from '../atoms';
import {
  BackToTop,
  Branding,
  Colophon,
  NavItem,
  NavList,
  SkipTo,
  Switch,
  type SwitchItem,
  type SwitchProps,
} from '../molecules';
import { Breadcrumbs, type BreadcrumbsItem, MainNav } from '../organisms';
import * as styles from './template.css';

const brand = 'Cretadoc';
const minScrollLength = 50;
const themes: [SwitchItem, SwitchItem] = [
  {
    'aria-label': allThemes.cretadocLight.name,
    id: 'light-theme',
    label: <Icon shape="sun" size="xs" />,
    value: allThemes.cretadocLight.id,
  },
  {
    'aria-label': allThemes.cretadocDark.name,
    id: 'dark-theme',
    label: <Icon shape="moon" size="xs" />,
    value: allThemes.cretadocDark.id,
  },
];

export type TemplateProps = Pick<MainProps, 'children'> & {
  breadcrumbs?: BreadcrumbsItem[];
  isWiki?: boolean;
  isWikiPage?: boolean;
};

export const Template: FC<TemplateProps> = ({
  breadcrumbs,
  children,
  isWiki = false,
  isWikiPage = false,
}) => {
  const topId = useId();
  const mainId = useId();
  const [currentTheme, setCurrentTheme] = useState(themes[0].value);
  const {
    deactivate: closeMainNav,
    state: isMainNavOpen,
    toggle: toggleMainNav,
  } = useBoolean(false);
  const [isWikiExpanded, expandWiki] = useToggle(isWiki || isWikiPage);
  const { y: windowPosition } = useScrollPosition();

  const updateTheme: SwitchProps['onSwitch'] = useCallback((e) => {
    setCurrentTheme(e.target.value);
  }, []);

  return (
    <Layout
      className={styles.layout({ hasTwoColumns: isWikiPage })}
      id={topId}
      data-theme={currentTheme}
    >
      <SkipTo label="Skip to content" targetId={mainId} />
      <Header className={styles.header}>
        <Branding
          brand={brand}
          logo={<Img alt="Logo placeholder" src="https://picsum.photos/150" />}
          to="#"
        />
        <div className={styles.navbar}>
          <MainNav
            aria-label="Main navigation"
            closeBtnLabel="Close the main nav"
            hasCloseBtn
            isOpen={isMainNavOpen}
            onClickOutside={closeMainNav}
            onClose={closeMainNav}
            onToggle={toggleMainNav}
            toggleBtnLabel="Toggle main nav"
          >
            <NavList spacing={null}>
              <NavItem
                label="Home"
                to="?path=/story/components-templates--homepage"
                variant="block"
              />
              <NavItem
                expandBtnAriaLabel={
                  isWikiExpanded ? 'Collapse wiki' : 'Expand wiki'
                }
                isExpanded={isWikiExpanded}
                isSelected={isWiki}
                label="Wiki"
                onExpand={expandWiki}
                to="/?path=/story/components-templates--wiki"
                variant="block"
              >
                <NavList spacing={null}>
                  <NavItem
                    isSelected={isWikiPage}
                    label="Introduction"
                    to="/?path=/story/components-templates--wiki-page"
                    variant="block"
                  />
                  <NavItem label="File 2" to="#" variant="block" />
                  <NavItem label="File 3" to="#" variant="block" />
                  <NavItem label="File 4" to="#" variant="block" />
                </NavList>
              </NavItem>
              <NavItem label="Another page" to="#" variant="block" />
            </NavList>
          </MainNav>
          <Switch
            aria-label="Switch theme"
            items={themes}
            name="theme"
            onSwitch={updateTheme}
            value={currentTheme}
          />
        </div>
      </Header>
      <Main className={styles.main} id={mainId}>
        {breadcrumbs ? (
          <Breadcrumbs
            aria-label="Breadcrumbs"
            className={styles.breadcrumbs}
            items={breadcrumbs}
          />
        ) : null}
        {children}
      </Main>
      <Footer className={styles.footer}>
        <Colophon
          alignment="center"
          copyright="© 2023 Cretadoc"
          generator={
            <>
              Built with{' '}
              <Link to="https://github.com/ArmandPhilippot/cretadoc">
                Cretadoc
              </Link>
            </>
          }
        />
        <BackToTop
          className={styles.backToTop}
          isVisible={!isMainNavOpen && windowPosition > minScrollLength}
          targetId={topId}
        />
      </Footer>
    </Layout>
  );
};
