import type { Meta, StoryObj } from '@storybook/react';
import { Children, cloneElement } from 'react';
import { NavItem } from '../nav-item';
import { NavList, type NavListProps } from './nav-list';

type RenderNavListProps<T extends boolean> = NavListProps<T> & {
  /**
   * The item to disabled.
   */
  disabled?: number;
  /**
   * The item to select.
   */
  selected?: number;
};

const RenderNavList = <T extends boolean>({
  children,
  disabled,
  isInline,
  selected,
  ...props
}: RenderNavListProps<T>) => (
  <NavList {...props} isInline={isInline}>
    {Children.map(children, (child, index) =>
      cloneElement(child, {
        ...child.props,
        isDisabled: index + 1 === disabled,
        isSelected: index + 1 === selected,
      })
    )}
  </NavList>
);

const meta = {
  title: 'Components/Molecules/Nav/Nav List',
  component: NavList,
  render: RenderNavList,
} satisfies Meta<typeof NavList>;

export default meta;

type Story = StoryObj<typeof meta>;

const NavListTemplateRegular: Story = {
  args: {
    children: [
      <NavItem key="link-1" label="Link 1" to="#" />,
      <NavItem key="link-2" label="Link 2" to="#" />,
      <NavItem key="link-3" label="Link 3" to="#" />,
    ],
  },
};

const NavListTemplateBlock: Story = {
  args: {
    children: [
      <NavItem key="link-1" label="Link 1" to="#" variant="block" />,
      <NavItem key="link-2" label="Link 2" to="#" variant="block" />,
      <NavItem key="link-3" label="Link 3" to="#" variant="block" />,
    ],
  },
};

export const Column: Story = {
  name: 'Column: Default',
  args: {
    ...NavListTemplateRegular.args,
    isInline: false,
  },
};

export const ColumnWithSelectedItem: Story = {
  name: 'Column: Selected item',
  args: {
    ...NavListTemplateRegular.args,
    selected: 2,
  },
};

export const ColumnWithDisabledItem: Story = {
  name: 'Column: Disabled item',
  args: {
    ...NavListTemplateRegular.args,
    disabled: 2,
  },
};

export const ColumnWithSelectedAndDisabledItem: Story = {
  name: 'Column: Disabled item',
  args: {
    ...NavListTemplateRegular.args,
    disabled: 2,
    selected: 2,
  },
};

export const ColumnWithBorders: Story = {
  args: {
    ...ColumnWithSelectedAndDisabledItem.args,
    children: [
      <NavItem key="link-1" isBordered label="Link 1" to="#" />,
      <NavItem key="link-2" isBordered label="Link 2" to="#" />,
      <NavItem key="link-3" isBordered label="Link 3" to="#" />,
    ],
    spacing: null,
  },
};

export const Row: Story = {
  name: 'Row: Default',
  args: {
    ...NavListTemplateRegular.args,
    isInline: true,
  },
};

export const RowWithSelectedItem: Story = {
  name: 'Row: Selected item',
  args: {
    ...Row.args,
    selected: 2,
  },
};

export const RowWithDisabledItem: Story = {
  name: 'Row: Disabled item',
  args: {
    ...Row.args,
    disabled: 2,
  },
};

export const RowWithSelectedAndDisabledItem: Story = {
  name: 'Row: Disabled item',
  args: {
    ...Row.args,
    disabled: 2,
    selected: 2,
  },
};

export const RowWithBorders: Story = {
  args: {
    ...RowWithSelectedAndDisabledItem.args,
    children: ColumnWithBorders.args.children,
    spacing: null,
  },
};

export const RowAlignmentLeft: Story = {
  name: 'Row: Alignment Left',
  args: {
    ...Row.args,
    alignment: 'left',
  },
};

export const RowAlignmentCenter: Story = {
  name: 'Row: Alignment Center',
  args: {
    ...Row.args,
    alignment: 'center',
  },
};

export const RowAlignmentRight: Story = {
  name: 'Row: Alignment Right',
  args: {
    ...Row.args,
    alignment: 'right',
  },
};

export const ColumnBlock: Story = {
  name: 'Column: Default (block variant)',
  args: {
    ...NavListTemplateBlock.args,
    isInline: false,
  },
};

export const ColumnWithSelectedItemBlock: Story = {
  name: 'Column: Selected item (block variant)',
  args: {
    ...NavListTemplateBlock.args,
    selected: 2,
  },
};

export const ColumnWithDisabledItemBlock: Story = {
  name: 'Column: Disabled item (block variant)',
  args: {
    ...NavListTemplateBlock.args,
    disabled: 2,
  },
};

export const ColumnWithSelectedAndDisabledItemBlock: Story = {
  name: 'Column: Disabled item (block variant)',
  args: {
    ...NavListTemplateBlock.args,
    disabled: 2,
    selected: 2,
  },
};

export const ColumnWithBordersBlock: Story = {
  args: {
    ...ColumnWithSelectedAndDisabledItemBlock.args,
    children: [
      <NavItem key="link-1" isBordered label="Link 1" to="#" variant="block" />,
      <NavItem key="link-2" isBordered label="Link 2" to="#" variant="block" />,
      <NavItem key="link-3" isBordered label="Link 3" to="#" variant="block" />,
    ],
    spacing: null,
  },
};

export const RowBlock: Story = {
  name: 'Row: Default (block variant)',
  args: {
    ...NavListTemplateBlock.args,
    isInline: true,
  },
};

export const RowWithSelectedItemBlock: Story = {
  name: 'Row: Selected item (block variant)',
  args: {
    ...RowBlock.args,
    selected: 2,
  },
};

export const RowWithDisabledItemBlock: Story = {
  name: 'Row: Disabled item (block variant)',
  args: {
    ...RowBlock.args,
    disabled: 2,
  },
};

export const RowWithSelectedAndDisabledItemBlock: Story = {
  name: 'Row: Disabled item (block variant)',
  args: {
    ...RowBlock.args,
    disabled: 2,
    selected: 2,
  },
};

export const RowWithBordersBlock: Story = {
  args: {
    ...RowWithSelectedAndDisabledItemBlock.args,
    children: ColumnWithBordersBlock.args.children,
    spacing: null,
  },
};

export const ColumnWithExpandableNavItem: Story = {
  args: {
    ...NavListTemplateBlock.args,
    children: [
      <NavItem key="link-1" label="Link 1" to="#" variant="block" />,
      <NavItem isExpanded key="link-2" label="Link 2" to="#" variant="block">
        <NavList spacing={null}>
          <NavItem label="Subitem 1" to="#" variant="block" />
          <NavItem label="Subitem 2" to="#" variant="block" />
        </NavList>
      </NavItem>,
      <NavItem key="link-3" label="Link 3" to="#" variant="block" />,
    ],
    spacing: null,
  },
};

export const RowWithExpandableNavItem: Story = {
  args: {
    ...ColumnWithExpandableNavItem.args,
    isInline: true,
    style: { alignItems: 'flex-start' },
  },
};
