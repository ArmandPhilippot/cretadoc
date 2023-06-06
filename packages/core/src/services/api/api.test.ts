import { beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { ApiError } from '../../utils/exceptions';
import { fetchAPI } from './api';
import { pagesQuery } from './queries';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('api', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it('can fetch the API and returns the queried data', async () => {
    const data = [{ id: 1, name: 'page-1' }];
    fetchMocker.mockResponseOnce(JSON.stringify({ data }));

    const response = await fetchAPI({ query: pagesQuery });
    expect(response.data).toStrictEqual(data);
    expect.assertions(1);
  });

  it('throws an error when no data is found', async () => {
    fetchMocker.mockReject(new ApiError('No data found'));

    await expect(async () => fetchAPI({ query: pagesQuery })).rejects.toThrow(
      new ApiError('No data found')
    );
    expect.assertions(1);
  });

  it('rejects with error messages when the response is not valid', async () => {
    const errors = 'tenetur iste rerum';
    fetchMocker.mockRejectOnce(new ApiError(errors));

    await expect(async () => fetchAPI({ query: pagesQuery })).rejects.toThrow(
      new ApiError(errors)
    );
    expect.assertions(1);
  });
});
