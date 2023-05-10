import type { Meta, StoryObj } from '@storybook/react';
import { contract } from '../../../../themes';
import { Fieldset } from '../fieldset';
import { Legend, type LegendProps } from './legend';

const meta = {
  component: Legend,
  title: 'Components/Atoms/Forms/Legend',
  argTypes: {
    color: {
      control: 'select',
      options: [
        'critical',
        'info',
        'inverted',
        'muted',
        'regular',
        'success',
        'warning',
      ],
    },
  },
} satisfies Meta<typeof Legend>;

export default meta;

type Story = StoryObj<typeof meta>;

const FieldsetWithLegend = (args: LegendProps) => (
  <Fieldset>
    <Legend {...args} />
  </Fieldset>
);

const LegendTemplate: Story = {
  args: {
    children: 'A legend',
  },
  render: FieldsetWithLegend,
};

export const Default: Story = {
  ...LegendTemplate,
  args: {
    ...LegendTemplate.args,
    color: 'regular',
    size: 'md',
  },
};

export const ColorCritical: Story = {
  ...LegendTemplate,
  name: 'Color: Critical',
  args: {
    ...LegendTemplate.args,
    color: 'critical',
  },
};

export const ColorInfo: Story = {
  ...LegendTemplate,
  name: 'Color: Info',
  args: {
    ...LegendTemplate.args,
    color: 'info',
  },
};

export const ColorInverted: Story = {
  ...LegendTemplate,
  name: 'Color: Inverted',
  args: {
    ...LegendTemplate.args,
    color: 'inverted',
    style: { background: contract.color.background.inverted.base },
  },
};

export const ColorMuted: Story = {
  ...LegendTemplate,
  name: 'Color: Muted',
  args: {
    ...LegendTemplate.args,
    color: 'muted',
  },
};

export const ColorPrimary: Story = {
  ...LegendTemplate,
  name: 'Color: Primary',
  args: {
    ...LegendTemplate.args,
    color: 'primary',
  },
};

export const ColorRegular: Story = {
  ...LegendTemplate,
  name: 'Color: Regular',
  args: {
    ...LegendTemplate.args,
    color: 'regular',
  },
};

export const ColorSuccess: Story = {
  ...LegendTemplate,
  name: 'Color: Success',
  args: {
    ...LegendTemplate.args,
    color: 'success',
  },
};

export const ColorWarning: Story = {
  ...LegendTemplate,
  name: 'Color: Warning',
  args: {
    ...LegendTemplate.args,
    color: 'warning',
  },
};

export const SizeXS: Story = {
  ...LegendTemplate,
  name: 'Size: Extra-small',
  args: {
    ...LegendTemplate.args,
    size: 'xs',
  },
};

export const SizeSM: Story = {
  ...LegendTemplate,
  name: 'Size: Small',
  args: {
    ...LegendTemplate.args,
    size: 'sm',
  },
};

export const SizeMD: Story = {
  ...LegendTemplate,
  name: 'Size: Medium',
  args: {
    ...LegendTemplate.args,
    size: 'md',
  },
};

export const SizeLG: Story = {
  ...LegendTemplate,
  name: 'Size: Large',
  args: {
    ...LegendTemplate.args,
    size: 'lg',
  },
};
