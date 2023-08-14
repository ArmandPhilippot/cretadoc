import { Article } from '@cretadoc/ui';
import { useIntl } from 'react-intl';
import { Loading } from '../loading';
import * as styles from './page.css';

export const LoadingPage = () => {
  const intl = useIntl();
  const loadingPage = intl.formatMessage({
    defaultMessage: 'The requested page is loading...',
    description: 'LoadingPage: loading page message',
    id: '3ICgTm',
  });

  return (
    <Article className={styles.loadingPage}>
      <Loading className={styles.spinner} msg={loadingPage} size="md" />
    </Article>
  );
};
