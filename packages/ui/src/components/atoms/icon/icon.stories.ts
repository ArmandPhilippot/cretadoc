import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';

const meta = {
  component: Icon,
  title: 'Components/Atoms/Icons',
  argTypes: {
    color: {
      control: 'select',
      options: [
        'critical',
        'info',
        'inverted',
        'muted',
        'primary',
        'regular',
        'success',
        'warning',
      ],
    },
    orientation: {
      control: 'select',
      options: ['bottom', 'left', 'right', 'top'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AngleBottom: Story = {
  name: 'Shape: Angle bottom',
  args: {
    orientation: 'bottom',
    shape: 'angle',
  },
};

export const AngleLeft: Story = {
  name: 'Shape: Angle left',
  args: {
    orientation: 'left',
    shape: 'angle',
  },
};

export const AngleRight: Story = {
  name: 'Shape: Angle right',
  args: {
    orientation: 'right',
    shape: 'angle',
  },
};

export const AngleTop: Story = {
  name: 'Shape: Angle top',
  args: {
    orientation: 'top',
    shape: 'angle',
  },
};

export const Cross: Story = {
  name: 'Shape: Cross',
  args: {
    shape: 'cross',
  },
};

export const Hamburger: Story = {
  name: 'Shape: Hamburger',
  args: {
    shape: 'hamburger',
  },
};

export const Moon: Story = {
  name: 'Shape: Moon',
  args: {
    shape: 'moon',
  },
};

export const Search: Story = {
  name: 'Shape: Search',
  args: {
    shape: 'search',
  },
};

export const Sun: Story = {
  name: 'Shape: Sun',
  args: {
    shape: 'sun',
  },
};

export const ColorCritical: Story = {
  name: 'Color: Critical',
  args: {
    color: 'critical',
    shape: 'cross',
  },
};

export const ColorInfo: Story = {
  name: 'Color: Info',
  args: {
    color: 'info',
    shape: 'cross',
  },
};

export const ColorInverted: Story = {
  name: 'Color: Inverted',
  args: {
    color: 'inverted',
    shape: 'cross',
  },
};

export const ColorMuted: Story = {
  name: 'Color: Muted',
  args: {
    color: 'muted',
    shape: 'cross',
  },
};

export const ColorPrimary: Story = {
  name: 'Color: Primary',
  args: {
    color: 'primary',
    shape: 'cross',
  },
};

export const ColorRegular: Story = {
  name: 'Color: Regular',
  args: {
    color: 'regular',
    shape: 'cross',
  },
};

export const ColorSuccess: Story = {
  name: 'Color: Success',
  args: {
    color: 'success',
    shape: 'cross',
  },
};

export const ColorWarning: Story = {
  name: 'Color: Warning',
  args: {
    color: 'warning',
    shape: 'cross',
  },
};

export const SizeXS: Story = {
  name: 'Size: Extra-small',
  args: {
    shape: 'cross',
    size: 'xs',
  },
};

export const SizeSM: Story = {
  name: 'Size: Small',
  args: {
    shape: 'cross',
    size: 'sm',
  },
};

export const SizeMD: Story = {
  name: 'Size: Medium',
  args: {
    shape: 'cross',
    size: 'md',
  },
};

export const SizeLG: Story = {
  name: 'Size: Large',
  args: {
    shape: 'cross',
    size: 'lg',
  },
};

export const SizeXL: Story = {
  name: 'Size: Extra-large',
  args: {
    shape: 'cross',
    size: 'xl',
  },
};
