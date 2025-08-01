import { useGetRequest, GetRequestState } from '@src/api/client';
import { QuoteApiResponse } from '@app-types/api.types.ts';

export const useGetQuote = () => {
  const { response, isLoading, error, get, reset } = useGetRequest() as GetRequestState<QuoteApiResponse>;

  /**
   * Example API Call
   *
   * Be careful, this is working because there's no BASE_URL env variable set by default.
   * If you set a BASE_URL, this won't work.
   */
  const request = async (parameters: {} = {}) => {
    return await get('https://zenquotes.io/api/random/', parameters);
  };

  return { response, isLoading, error, request, reset };
};
