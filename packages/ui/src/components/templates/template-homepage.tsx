import type { FC } from 'react';
import { Heading } from '../atoms';
import { Template } from './template';

export const HomePageTemplate: FC = () => (
  <Template>
    <Heading level={1}>Welcome</Heading>
    <p>
      Voluptas provident quia vitae assumenda molestiae. Quia ullam non nulla
      qui quia. Non repudiandae at modi aut enim. Velit qui rerum sunt molestias
      deleniti est.
    </p>
  </Template>
);
