import { ButtonLink } from '@cretadoc/ui';
import { HTTP_STATUS_CODE, type HttpStatusCode } from '@cretadoc/utils';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Page } from '../components';
import { ROUTES } from '../utils/constants';

type ErrorMessages = {
  pageTitle: string;
  pageBody: string;
};

export const ErrorPage: FC = () => {
  const error = useRouteError();
  const intl = useIntl();

  const getMessages = (code: HttpStatusCode): ErrorMessages => {
    switch (code) {
      case HTTP_STATUS_CODE.UNAUTHORIZED:
        return {
          pageBody: intl.formatMessage({
            defaultMessage:
              'Sorry, an authorization is required to access this page.',
            description: 'ErrorPage: 401 page body',
            id: 'RYaguF',
          }),
          pageTitle: intl.formatMessage({
            defaultMessage: 'Unauthenticated',
            description: 'ErrorPage: 401 page title',
            id: 'sOBeiY',
          }),
        };
      case HTTP_STATUS_CODE.NOT_FOUND:
        return {
          pageBody: intl.formatMessage({
            defaultMessage:
              'Sorry, it seems that the page your are looking for does not exist.',
            description: 'ErrorPage: 404 page body',
            id: 'Ynp8Pu',
          }),
          pageTitle: intl.formatMessage({
            defaultMessage: 'Page not found',
            description: 'ErrorPage: 404 page title',
            id: 'Jh7oPf',
          }),
        };
      case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR:
      default:
        return {
          pageBody: intl.formatMessage({
            defaultMessage: 'Sorry, an unexpected error has occurred.',
            description: 'ErrorPage: 500 page body',
            id: 'ApbCEQ',
          }),
          pageTitle: intl.formatMessage({
            defaultMessage: 'Internal server error',
            description: 'ErrorPage: 500 page title',
            id: 'eeCw8n',
          }),
        };
    }
  };

  const messages = getMessages(
    isRouteErrorResponse(error)
      ? (error.status as HttpStatusCode)
      : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
  );
  const goBackToHome = intl.formatMessage({
    defaultMessage: 'Go back to homepage',
    description: 'ErrorPage: back to homepage anchor',
    id: 'z+4ywp',
  });

  return (
    <Page title={messages.pageTitle}>
      <p>{messages.pageBody}</p>
      <ButtonLink to={ROUTES.HOMEPAGE}>{goBackToHome}</ButtonLink>
    </Page>
  );
};
