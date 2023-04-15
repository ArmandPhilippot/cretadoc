import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../atoms';
import { Colophon } from './colophon';

const meta = {
  title: 'Components/Molecules/Colophon',
  component: Colophon,
} satisfies Meta<typeof Colophon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alignment: 'left',
  },
};

export const CopyrightOnly: Story = {
  args: {
    ...Default.args,
    copyright: '© 2023 Cretadoc',
  },
};

export const GeneratorOnly: Story = {
  args: {
    ...Default.args,
    generator: (
      <>
        Built with{' '}
        <Link to="https://github.com/ArmandPhilippot/cretadoc">Cretadoc</Link>
      </>
    ),
  },
};

export const LegalNoticeOnly: Story = {
  args: {
    ...Default.args,
    legalNotice: {
      label: 'Legal notice',
      link: '#',
    },
  },
};

export const CopyrightAndGenerator: Story = {
  args: {
    ...CopyrightOnly.args,
    ...GeneratorOnly.args,
  },
};

export const CopyrightAndLegalNotice: Story = {
  args: {
    ...CopyrightOnly.args,
    ...LegalNoticeOnly.args,
  },
};

export const GeneratorAndLegalNotice: Story = {
  args: {
    ...CopyrightOnly.args,
    ...LegalNoticeOnly.args,
  },
};

export const CopyrightGeneratorAndLegalNotice: Story = {
  args: {
    ...CopyrightOnly.args,
    ...GeneratorOnly.args,
    ...LegalNoticeOnly.args,
  },
};

export const Left: Story = {
  name: 'Alignment: Left',
  args: {
    ...CopyrightGeneratorAndLegalNotice.args,
    alignment: 'left',
  },
};

export const Center: Story = {
  name: 'Alignment: Center',
  args: {
    ...CopyrightGeneratorAndLegalNotice.args,
    alignment: 'center',
  },
};

export const Right: Story = {
  name: 'Alignment: Right',
  args: {
    ...CopyrightGeneratorAndLegalNotice.args,
    alignment: 'right',
  },
};
