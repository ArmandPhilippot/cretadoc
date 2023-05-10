import type { Meta, StoryObj } from '@storybook/react';
import { contract } from '../../../../themes';
import { Label } from './label';

const meta = {
  component: Label,
  title: 'Components/Atoms/Forms/Label',
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
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A label',
  },
};

export const IsRequired: Story = {
  name: 'State: Required',
  args: {
    ...Default.args,
    isRequired: true,
  },
};

export const CustomRequiredSymbol: Story = {
  name: 'State: Required with custom symbol',
  args: {
    ...Default.args,
    isRequired: true,
    requiredSymbol: ' ✱',
  },
};

export const ColorCritical: Story = {
  name: 'Color: Critical',
  args: {
    ...Default.args,
    color: 'critical',
  },
};

export const ColorInfo: Story = {
  name: 'Color: Info',
  args: {
    ...Default.args,
    color: 'info',
  },
};

export const ColorInverted: Story = {
  name: 'Color: Inverted',
  args: {
    ...Default.args,
    color: 'inverted',
    style: { background: contract.color.background.inverted.base },
  },
};

export const ColorMuted: Story = {
  name: 'Color: Muted',
  args: {
    ...Default.args,
    color: 'muted',
  },
};

export const ColorPrimary: Story = {
  name: 'Color: Primary',
  args: {
    ...Default.args,
    color: 'primary',
  },
};

export const ColorRegular: Story = {
  name: 'Color: Regular',
  args: {
    ...Default.args,
    color: 'regular',
  },
};

export const ColorSuccess: Story = {
  name: 'Color: Success',
  args: {
    ...Default.args,
    color: 'success',
  },
};

export const ColorWarning: Story = {
  name: 'Color: Warning',
  args: {
    ...Default.args,
    color: 'warning',
  },
};

export const SizeXS: Story = {
  name: 'Size: Extra-small',
  args: {
    ...Default.args,
    size: 'xs',
  },
};

export const SizeSM: Story = {
  name: 'Size: Small',
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const SizeMD: Story = {
  name: 'Size: Medium',
  args: {
    ...Default.args,
    size: 'md',
  },
};

export const SizeLG: Story = {
  name: 'Size: Large',
  args: {
    ...Default.args,
    size: 'lg',
  },
};
