import {useGetRequest, GetRequestState} from '@src/api/client';

export const useGetApiStatus = () => {
    const { response, isLoading, error, get, reset } = useGetRequest() as GetRequestState<{status: 'connected' | null}>;

    const request = async (parameters: {} = {}) => {
        return await get('/status', parameters);
    };

    return { response, isLoading, error, request, reset };
};
