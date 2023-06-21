import type { Maybe } from '@cretadoc/utils';
import type { ErrorDetails } from '../../types';
import { API_ERROR_CODE } from '../constants';

export const getErrorMessage = <
  T extends Maybe<Record<string, unknown>> = undefined
>({
  key,
  reason,
  received,
}: Omit<ErrorDetails<T>, 'errorKind'>) => {
  const prefix = key ? `${key}: ` : '';

  return `${prefix}${reason}. Received: ${received}`;
};

export const getErrorItem = <
  T extends Maybe<Record<string, unknown>> = undefined
>({
  key,
  errorKind,
  reason,
  received,
}: ErrorDetails<T>) => {
  const message = getErrorMessage({ key, reason, received });

  switch (errorKind) {
    case 'range':
      return new RangeError(message);
    case 'reference':
      return new ReferenceError(message);
    case 'syntax':
      return new SyntaxError(message);
    case 'type':
    default:
      return new TypeError(message);
  }
};

export const getErrorsList = <
  T extends Maybe<Record<string, unknown>> = undefined
>(
  errors: Array<ErrorDetails<T>>
) => errors.map(getErrorItem);

export class CretadocAPIError<
  T extends Maybe<Record<string, unknown>> = undefined
> extends AggregateError {
  constructor(
    message: string,
    errors: ErrorDetails<T> | Array<ErrorDetails<T>>
  ) {
    super(
      Array.isArray(errors) ? getErrorsList(errors) : [getErrorItem(errors)],
      message,
      {
        cause: {
          code: API_ERROR_CODE.INTERNAL_ERROR,
        },
      }
    );
    this.name = 'CretadocAPIError';
  }
}
