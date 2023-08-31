import type { FC, FormEvent } from 'react';
import { Button, Form } from '../../components';
import { Preview, PreviewList } from '../../utils/stories';
import { useBoolean } from './use-boolean';
import * as styles from './use-boolean.demo.css';

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export const UseBooleanDemo: FC = () => {
  const { activate, deactivate, state, toggle } = useBoolean(false);

  return (
    <PreviewList isStacked>
      <Preview>
        <p>
          The current state is: <strong>{state ? 'true' : 'false'}</strong>
        </p>
      </Preview>
      <Preview>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Button onClick={activate}>Activate</Button>
          <Button onClick={deactivate}>Deactivate</Button>
          <Button onClick={toggle}>Toggle</Button>
        </Form>
      </Preview>
    </PreviewList>
  );
};
