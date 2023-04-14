import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './components/icon';
import { PreviewList } from './components/preview-list';

const meta: Meta = {
  title: 'Themes/Tokens/Icons',
  component: Icon,
  parameters: {
    layout: 'full',
  },
};

export default meta;

export const Size: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Icon token="icon.size.xs" />
      <Icon token="icon.size.sm" />
      <Icon token="icon.size.md" />
      <Icon token="icon.size.lg" />
      <Icon token="icon.size.xl" />
    </PreviewList>
  ),
};
