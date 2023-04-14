import type { Meta, StoryObj } from '@storybook/react';
import { PreviewList } from './components/preview-list';
import { NoShadow, Shadow } from './components/shadow';

const meta: Meta = {
  title: 'Themes/Tokens/Shadows',
  component: Shadow,
  parameters: {
    layout: 'full',
  },
};

export default meta;

export const WithoutShadow: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <NoShadow />
    </PreviewList>
  ),
};

export const Color: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Shadow token="shadow.critical.bottom.left.raised" />
      <Shadow token="shadow.info.bottom.left.raised" />
      <Shadow token="shadow.inverted.bottom.left.raised" />
      <Shadow token="shadow.muted.bottom.left.raised" />
      <Shadow token="shadow.regular.bottom.left.raised" />
      <Shadow token="shadow.success.bottom.left.raised" />
      <Shadow token="shadow.warning.bottom.left.raised" />
    </PreviewList>
  ),
};

export const Direction: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Shadow token="shadow.regular.top.left.raised" />
      <Shadow token="shadow.regular.top.center.raised" />
      <Shadow token="shadow.regular.top.right.raised" />
      <Shadow token="shadow.regular.bottom.left.raised" />
      <Shadow token="shadow.regular.bottom.center.raised" />
      <Shadow token="shadow.regular.bottom.right.raised" />
    </PreviewList>
  ),
};

export const Elevation: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Shadow token="shadow.regular.bottom.left.raised" />
      <Shadow token="shadow.regular.bottom.left.elevated" />
      <Shadow token="shadow.regular.bottom.left.floating" />
    </PreviewList>
  ),
};
