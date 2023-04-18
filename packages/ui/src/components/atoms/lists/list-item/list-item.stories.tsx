import type { Meta, StoryObj } from '@storybook/react';
import { ListItem, type ListItemProps } from './list-item';

const meta = {
  component: ListItem,
  title: 'Components/Atoms/Lists/ListItem',
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const ListItemInList = ({ isBordered, ...args }: ListItemProps) => (
  <ul style={isBordered ? { padding: 0 } : {}}>
    <ListItem {...args} isBordered={isBordered} />
  </ul>
);

const ListItemTemplate: Story = {
  args: {
    children: 'An item',
  },
  render: ListItemInList,
};

export const Default: Story = {
  ...ListItemTemplate,
  args: {
    ...ListItemTemplate.args,
    hasMarker: true,
    isBordered: false,
  },
};

export const Border: Story = {
  ...ListItemTemplate,
  name: 'Border: All',
  args: {
    ...ListItemTemplate.args,
    isBordered: true,
    paddingBlock: 'xxs',
    paddingInline: 'xs',
  },
};

export const BorderLeft: Story = {
  ...ListItemTemplate,
  name: 'Border: Left',
  args: {
    ...Border.args,
    border: 'left',
  },
};

export const BorderRight: Story = {
  ...ListItemTemplate,
  name: 'Border: Right',
  args: {
    ...Border.args,
    border: 'right',
  },
};

export const BorderBottom: Story = {
  ...ListItemTemplate,
  name: 'Border: Bottom',
  args: {
    ...Border.args,
    border: 'bottom',
  },
};

export const BorderTop: Story = {
  ...ListItemTemplate,
  name: 'Border: Top',
  args: {
    ...Border.args,
    border: 'top',
  },
};

export const BorderBlock: Story = {
  ...ListItemTemplate,
  name: 'Border: Block',
  args: {
    ...Border.args,
    border: 'block',
  },
};

export const BorderInline: Story = {
  ...ListItemTemplate,
  name: 'Border: Inline',
  args: {
    ...Border.args,
    border: 'inline',
  },
};

export const BorderCritical: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Critical',
  args: {
    ...Border.args,
    borderColor: 'critical',
  },
};

export const BorderInfo: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Info',
  args: {
    ...Border.args,
    borderColor: 'info',
  },
};

export const BorderInverted: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Inverted',
  args: {
    ...Border.args,
    borderColor: 'inverted',
  },
};

export const BorderMuted: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Muted',
  args: {
    ...Border.args,
    borderColor: 'muted',
  },
};

export const BorderRegular: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Regular',
  args: {
    ...Border.args,
    borderColor: 'regular',
  },
};

export const BorderSuccess: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Success',
  args: {
    ...Border.args,
    borderColor: 'success',
  },
};

export const BorderWarning: Story = {
  ...ListItemTemplate,
  name: 'BorderColor: Warning',
  args: {
    ...Border.args,
    borderColor: 'warning',
  },
};

export const BorderSM: Story = {
  ...ListItemTemplate,
  name: 'BorderSize: Small',
  args: {
    ...Border.args,
    borderSize: 'sm',
  },
};

export const BorderMD: Story = {
  ...ListItemTemplate,
  name: 'BorderSize: Medium',
  args: {
    ...Border.args,
    borderSize: 'md',
  },
};

export const BorderLG: Story = {
  ...ListItemTemplate,
  name: 'BorderSize: Large',
  args: {
    ...Border.args,
    borderSize: 'lg',
  },
};

export const WithMarker: Story = {
  ...ListItemTemplate,
  name: 'Marker: Visible',
  args: {
    ...ListItemTemplate.args,
    hasMarker: true,
  },
};

export const WithoutMarker: Story = {
  ...ListItemTemplate,
  name: 'Marker: Hidden',
  args: {
    ...ListItemTemplate.args,
    hasMarker: false,
  },
};

export const CSSKeywordMarker: Story = {
  ...ListItemTemplate,
  name: 'Marker: CSS Keyword',
  args: {
    ...ListItemTemplate.args,
    hasMarker: true,
    marker: 'circle',
  },
};

export const UnicodeMarker: Story = {
  ...ListItemTemplate,
  name: 'Marker: Unicode',
  args: {
    ...ListItemTemplate.args,
    hasMarker: true,
    marker: '"\\1F44D  "',
  },
};
