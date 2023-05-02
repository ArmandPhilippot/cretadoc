import type { Meta, StoryObj } from '@storybook/react';
import { SkipTo, type SkipToProps } from './skip-to';

const RenderSkipTo = (props: SkipToProps) => (
  <div style={{ height: 100 }}>
    <SkipTo {...props} />
    Press tab to see the skip to link.
    <div id="main" style={{ marginTop: 100 }}>
      Main content of the page.
    </div>
  </div>
);

const meta = {
  title: 'Components/Molecules/Buttons/Skip to',
  component: SkipTo,
  render: RenderSkipTo,
} satisfies Meta<typeof SkipTo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Skip to content',
    targetId: 'main',
  },
};
