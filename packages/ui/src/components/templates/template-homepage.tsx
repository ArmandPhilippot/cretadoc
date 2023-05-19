import type { FC } from 'react';
import { Article, Header, Heading } from '../atoms';
import { Template } from './template';
import * as styles from './template.css';

export const HomePageTemplate: FC = () => (
  <Template>
    <Article className={styles.page({ hasTwoColumns: false })}>
      <Header>
        <Heading level={1}>Welcome</Heading>
      </Header>
      <div>
        <p>
          Voluptas provident quia vitae assumenda molestiae. Quia ullam non
          nulla qui quia. Non repudiandae at modi aut enim. Velit qui rerum sunt
          molestias deleniti est.
        </p>
      </div>
    </Article>
  </Template>
);
