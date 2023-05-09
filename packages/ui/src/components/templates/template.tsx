/* eslint-disable max-statements */
import { type FC, useId, useState, useCallback, useEffect } from 'react';
import { themes as allThemes } from '../../themes';
import {
  Footer,
  Header,
  Icon,
  Layout,
  Link,
  Main,
  type MainProps,
} from '../atoms';
import { Branding, Colophon, NavItem, NavList } from '../molecules';
import { BackToTop, SkipTo } from '../molecules/buttons';
import {
  Switch,
  type SwitchItem,
  type SwitchProps,
} from '../molecules/forms/switch';
import { MainNav } from '../organisms/nav/main-nav';
import * as styles from './template.css';

const brand = 'Cretadoc';
const minScrollLength = 50;

export type TemplateProps = Pick<MainProps, 'children'>;

export const Template: FC<TemplateProps> = ({ children }) => {
  const topId = useId();
  const mainId = useId();
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
  const [currentTheme, setCurrentTheme] = useState(themes[0].value);
  const [isMainNavOpen, setIsMainNavOpen] = useState(false);
  const [isWikiExpanded, setIsWikiExpanded] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setIsBackToTopVisible(
      window.document.documentElement.scrollTop > minScrollLength
    );
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMainNav = useCallback(() => {
    setIsMainNavOpen(false);
  }, []);

  const toggleMainNav = useCallback(() => {
    setIsMainNavOpen((prev) => !prev);
  }, []);

  const handleWikiExpand = useCallback(() => {
    setIsWikiExpanded((prev) => !prev);
  }, []);

  const updateTheme: SwitchProps['onSwitch'] = useCallback((e) => {
    setCurrentTheme(e.target.value);
  }, []);

  return (
    <Layout id={topId} data-theme={currentTheme}>
      <SkipTo label="Skip to content" targetId={mainId} />
      <Header className={styles.header}>
        <Branding brand={brand} to="#" />
        <div className={styles.navbar}>
          <MainNav
            closeBtnLabel="Close the main nav"
            hasCloseBtn
            isOpen={isMainNavOpen}
            maxWidth="40ch"
            onClickOutside={closeMainNav}
            onClose={closeMainNav}
            onToggle={toggleMainNav}
            toggleBtnLabel="Toggle main nav"
          >
            <NavList>
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
                label="Wiki"
                onExpand={handleWikiExpand}
                to="?path=/story/components-templates--wiki"
                variant="block"
              >
                <NavList>
                  <NavItem label="File 1" to="#" variant="block" />
                  <NavItem label="File 2" to="#" variant="block" />
                  <NavItem label="File 3" to="#" variant="block" />
                  <NavItem label="File 4" to="#" variant="block" />
                </NavList>
              </NavItem>
              <NavItem label="Another page" to="#" variant="block" />
            </NavList>
          </MainNav>
          <Switch
            items={themes}
            name="theme"
            onSwitch={updateTheme}
            value={currentTheme}
          />
        </div>
      </Header>
      <Main className={styles.main} id={mainId}>
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
        <BackToTop isVisible={isBackToTopVisible} targetId={topId} />
      </Footer>
    </Layout>
  );
};
