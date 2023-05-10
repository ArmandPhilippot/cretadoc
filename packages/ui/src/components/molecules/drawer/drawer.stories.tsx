import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useId, useState } from 'react';
import { Button } from '../../atoms';
import { Drawer, type DrawerProps } from './drawer';

const ControlledDrawer = ({
  hasCloseBtn,
  isOpen: isOpenByDefault,
  ...props
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const drawerId = useId();

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClosing = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div style={{ height: 300 }}>
      <Button
        aria-controls={drawerId}
        aria-expanded={isOpen}
        onClick={toggleDrawer}
      >
        Open the drawer
      </Button>
      <Drawer
        {...props}
        closeBtnLabel={hasCloseBtn ? 'Close' : undefined}
        hasCloseBtn={hasCloseBtn}
        id={drawerId}
        isOpen={isOpen}
        onClose={hasCloseBtn ? handleClosing : undefined}
      />
    </div>
  );
};

const meta = {
  title: 'Components/Molecules/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  render: ControlledDrawer,
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Close: Story = {
  args: {
    children: 'The contents.',
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    ...Close.args,
    isOpen: true,
  },
};

export const CloseButton: Story = {
  args: {
    ...Open.args,
    hasCloseBtn: true,
  },
};

export const MaxWidth: Story = {
  args: {
    ...CloseButton.args,
    maxWidth: '40ch',
  },
};
