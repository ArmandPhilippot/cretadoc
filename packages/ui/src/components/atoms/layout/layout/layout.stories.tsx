import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Main } from '../main';
import { Layout } from './layout';

const meta = {
  title: 'Components/Atoms/Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

const header = 'Your website title';
const body = `Ut aut consequatur ea qui exercitationem culpa. Ut suscipit officiis delectus mollitia dolores molestias. Asperiores quas iusto. Quae non et aut. Sunt possimus molestiae facilis. Sit harum velit omnis voluptate maiores saepe. Consectetur hic ea voluptas molestiae exercitationem. Consequatur dicta dolores. Nemo voluptatem corrupti quos blanditiis repellendus modi commodi provident. Veniam blanditiis voluptatibus magnam deleniti et fugiat. Consequatur cumque quos rem nemo.
<br /><br />
Sequi quo et tenetur cum et. Voluptate pariatur architecto harum. Dignissimos dolorum magnam odit eius quaerat delectus ut autem. At aut sint quasi commodi. Illo aut cumque. Enim dolor ducimus vel voluptatem quod asperiores neque. Eligendi pariatur eum blanditiis. Nihil earum eligendi voluptas impedit quia. Perspiciatis enim cumque.`;
const footer = '© 2023 Cretadoc';

export const Example: Story = {
  args: {
    children: [
      <Header key="header">{header}</Header>,
      <Main key="main" dangerouslySetInnerHTML={{ __html: body }} />,
      <Footer key="footer">{footer}</Footer>,
    ],
  },
};
