import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { NavItem, NavList } from '../../../molecules';
import { MainNav, type MainNavProps } from './main-nav';

const ControlledMainNav = ({
  children,
  isOpen: isOpenByDefault,
  ...props
}: Omit<MainNavProps, 'onToggle'>) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div style={{ minHeight: 300 }}>
      <MainNav
        {...props}
        isOpen={isOpen}
        onClickOutside={closePanel}
        onToggle={handleToggle}
      >
        {children}
      </MainNav>
    </div>
  );
};

const meta = {
  title: 'Components/Organisms/Nav/Main nav',
  component: MainNav,
  parameters: {
    layout: 'fullscreen',
  },
  render: ControlledMainNav,
} satisfies Meta<typeof MainNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: (
      <NavList>
        <NavItem label="Home" to="#" />
      </NavList>
    ),
    drawerId: 'example-main-nav',
    maxWidth: '30ch',
    toggleBtnLabel: 'Toggle main nav',
  },
};

export const WithCloseBtn: Story = {
  args: {
    ...Example.args,
    closeBtnLabel: 'Close the panel',
    drawerId: 'with-close-main-nav',
    hasCloseBtn: true,
  },
};
