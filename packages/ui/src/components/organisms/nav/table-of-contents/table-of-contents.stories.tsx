import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Heading } from '../../../atoms';
import {
  TableOfContents,
  type TableOfContentsProps,
} from './table-of-contents';

const meta = {
  title: 'Components/Organisms/Nav/Table of contents',
  component: TableOfContents,
} satisfies Meta<typeof TableOfContents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    heading: <Heading level={2}>Table of contents</Heading>,
    tree: [
      { children: [], id: 'heading-1', label: 'Heading 1' },
      { children: [], id: 'heading-2', label: 'Heading 2' },
      {
        children: [
          { children: [], id: 'subheading-1', label: 'Subheading 1' },
          {
            children: [
              {
                children: [],
                id: 'nested-1',
                label: 'Nested heading 1',
              },
              {
                children: [],
                id: 'nested-2',
                label: 'Nested heading 2',
              },
            ],
            id: 'subheading-2',
            label: 'Subheading 2',
          },
          { children: [], id: 'subheading-3', label: 'Subheading 3' },
        ],
        id: 'heading-3',
        label: 'Heading 3',
      },
      { children: [], id: 'heading-4', label: 'Heading 4' },
      { children: [], id: 'heading-5', label: 'Heading 5' },
    ],
  },
};

const CollapsibleToC = (props: TableOfContentsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = useCallback(() => {
    setIsExpanded((prevState) => !prevState);
  }, []);

  return (
    <TableOfContents
      {...props}
      expandBtnLabel="Expand the table of contents"
      isCollapsible
      isExpanded={isExpanded}
      onExpand={handleExpand}
    />
  );
};

export const Collapsible: Story = {
  render: CollapsibleToC,
  args: {
    ...Example.args,
  },
};
