import {useGetRequest, GetRequestState} from '@src/api/client';
import ApiRequestError from '@src/exceptions/ApiRequestError.ts';

export const useGetApiStatus = () => {
    const { response, isLoading, error, get, reset } = useGetRequest() as GetRequestState<{status: 'connected' | null}>;

    const request = async (parameters: {} = {}) => {
        return await get('/status', parameters);
    };

    return { response, isLoading, error, request, reset };
};
