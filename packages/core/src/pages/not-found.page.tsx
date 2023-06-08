import { ButtonLink, Heading } from '@cretadoc/ui';
import { useIntl } from 'react-intl';
import { ROUTES } from '../utils/constants';

export const NotFoundPage = () => {
  const intl = useIntl();

  const pageTitle = intl.formatMessage({
    defaultMessage: 'Page not found',
    description: 'NotFoundPage: page title',
    id: 'IdI+8U',
  });

  const pageBody = intl.formatMessage({
    defaultMessage:
      'Sorry, it seems that the page your are looking for does not exist.',
    description: 'NotFoundPage: page body',
    id: 'IN3wH8',
  });

  const goBackToHome = intl.formatMessage({
    defaultMessage: 'Go back to homepage',
    description: 'NotFoundPage: back to homepage anchor',
    id: '57yRf+',
  });

  return (
    <>
      <Heading level={1}>{pageTitle}</Heading>
      <p>{pageBody}</p>
      <ButtonLink to={ROUTES.HOMEPAGE}>{goBackToHome}</ButtonLink>
    </>
  );
};
