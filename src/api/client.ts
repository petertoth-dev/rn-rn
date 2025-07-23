import axios, {AxiosRequestConfig, AxiosResponse, CancelTokenSource, InternalAxiosRequestConfig} from 'axios';
import {BASE_URL} from '@env';
import ApiRequestError, {ApiRequestErrorType} from '@src/exceptions/ApiRequestError';
import {useCallback, useRef, useState} from 'react';
import { logAPI } from "@src/utils/logger";
import NetInfo from '@react-native-community/netinfo';
import {storage} from '@src/storage/Storage';
import { ApiResponse } from '@app-types/api.types';
import {LOG_API_REQUESTS, LOG_API_RESPONSES} from '@src/constants.ts';
import {authorizationContext} from './auth/AuthorizationStrategy';


// Initialize axios
const api = axios.create({
    baseURL: BASE_URL + '/api',
});

// Log API Requests
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { method, url, params, data } = config;
        if(LOG_API_REQUESTS){
            logAPI.info(method?.toUpperCase(), url, {
                params,
                data,
                headers: config.headers,
            });
        }
        return config;
    }
);

// Log API Responses / Throw Exception on error
api.interceptors.response.use(
    response => {
        if(LOG_API_RESPONSES){
            logAPI.info(response.data);
        }
        return response;
    },
    error => {
        throwApiError(error);
    }
);

// Authorization interceptor using the strategy pattern
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Set the default content type
        config.headers = config.headers || {};
        config.headers['Content-Type'] = 'application/json';

        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        // Apply all applicable authorization strategies
        return await authorizationContext.applyStrategies(config);
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const get = async <T>(url: string, params?: any, options?: AxiosRequestConfig) => {
    const netInfo = await NetInfo.fetch();
    const cacheMode = params?.cache || 'offline'; // TODO: Consider using cache-control headers | Consider using eTags (If-None-Match) as well | check this: https://axios-cache-interceptor.js.org/config/request-specifics
    const cacheKey = url + ':' + JSON.stringify(params);
    const cachedResponse = storage.getItem('API.responses.' + cacheKey) as AxiosResponse<T, any>;

    if(!netInfo.isConnected){
        if(cacheMode === 'disabled'){ // We are offline and caching is disabled
            throw new ApiRequestError(599, 'The device is offline, and cache was disabled for this request: '+ url + JSON.stringify(params));
        }else{
            if(!cachedResponse?.data){
                throw new ApiRequestError(599, 'The device is offline, and the response is not cached for this request: '+ url + JSON.stringify(params));
            }
            return cachedResponse.data;
        }
    }else{ // We are online
        if(cacheMode === 'eager' || cacheMode === 'boss'){
            if(cacheMode === 'eager'){
                api.get<T>(url, { params, ...options }).then(response => {
                    if(cacheMode !== 'disabled' && response.data) {
                        storage.setItem('API.responses.' + cacheKey, response);
                    }
                });
            }

            if(cachedResponse){
                return cachedResponse.data;
            }
        }

        const response = await api.get<T>(url, { params, ...options });
        if(cacheMode !== 'disabled' && response.data) {
            storage.setItem('API.responses.' + cacheKey, response); // Cache the response in case we'll go offline.
        }

        return response.data;
    }
};

export const post = async <T>(url: string, data?: object, options?: AxiosRequestConfig) => {
    const response = await api.post<T>(url, data, options);
    return response.data;
};

export const put = async <T>(url: string, data: object, options?: AxiosRequestConfig) => {
    const response = await api.put<T>(url, data, options);
    return response.data;
};

export const del = async <T>(url: string, params?: object, options?: AxiosRequestConfig) => {
    const response = await api.delete<T>(url, { params, ...options });
    return response.data;
};


const throwApiError = (error: any) =>{
    throw new ApiRequestError(error.response?.status || 0, error.response?.data?.message?.message || undefined, error.response?.data?.errors || undefined);
};

export interface GetRequestState<T,M = unknown> {
    response: ApiResponse<T,M> | null;
    isLoading: boolean;
    error: ApiRequestErrorType | null;
    get: (url: string, params?: object, options?: object) => Promise<ApiResponse<T,M> | null | undefined>;
    reset: ()=> void;
    cancel: ()=> void;
}

export const useGetRequest = <T, M = unknown>() => {
    const [response, setResponse] = useState<ApiResponse<T, M> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiRequestErrorType | null>(null);

    const cancelTokenRef = useRef<CancelTokenSource | null>(null);

    // API call function
    const getRequest = useCallback(
        async (url: string, params?: object, options?: object): Promise<ApiResponse<T, M> | null | undefined> => {
            setIsLoading(true);
            setError(null);
            cancelTokenRef.current = axios.CancelToken.source();

            try {
                const responseData = await get<ApiResponse<T, M>>(url, params, {
                    cancelToken: cancelTokenRef.current?.token,
                    ...options
                });  // Correct API call
                setResponse(responseData || null);
                return responseData;
            } catch (exception: any) {
                setError(exception);
                throw exception;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const cancel = () => {
        cancelTokenRef.current?.cancel('Request has been cancelled by cancel() method.');
    };

    const reset = () => {
        setIsLoading(false);
        setError(null);
        setResponse(null);
    };

    return { response, isLoading, error, get: getRequest, reset, cancel };
};

// Hook for POST requests
export interface PostRequestState<T> {
    response: ApiResponse<T> | null;
    isLoading: boolean;
    error: ApiRequestErrorType | null;
    post: (url: string, dataToSend?: object, options?: object) => Promise<ApiResponse<T> | null | undefined>;
    reset: ()=> void;
}

export const usePostRequest = <T, M = unknown>() => {
    const [response, setResponse] = useState<ApiResponse<T, M> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiRequestErrorType | null>(null);

    // API call function
    const postRequest = useCallback(
        async (url: string, data?: object, options?: object): Promise<ApiResponse<T, M> | null | undefined> => {
            setIsLoading(true);
            setError(null);

            try {
                const responseData = await post<ApiResponse<T, M>>(url, data, options);
                setResponse(responseData || null);
                return responseData;
            } catch (exception: any) {
                setError(exception);
                throw exception;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const reset = () => {
        setIsLoading(false);
        setError(null);
        setResponse(null);
    };

    return { response, isLoading, error, post: postRequest, reset };
};

// Hook for PUT requests
export interface PutRequestState<T> {
    response: ApiResponse<T> | null;
    isLoading: boolean;
    error: ApiRequestErrorType | null;
    put: (url: string, dataToSend: object, options?: object) => Promise<ApiResponse<T> | null | undefined>;
    reset: ()=> void;
}

export const usePutRequest = <T, M = unknown>() => {
    const [response, setResponse] = useState<ApiResponse<T, M> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiRequestErrorType | null>(null);

    // API call function
    const putRequest = useCallback(
        async (url: string, data: object, options?: object): Promise<ApiResponse<T, M> | null | undefined> => {
            setIsLoading(true);
            setError(null);

            try {
                const responseData = await put<ApiResponse<T, M>>(url, data, options);
                setResponse(responseData || null);
                return responseData;
            } catch (exception: any) {
                setError(exception);
                throw exception;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const reset = () => {
        setIsLoading(false);
        setError(null);
        setResponse(null);
    };

    return { response, isLoading, error, put: putRequest, reset };
};

// Hook for DELETE requests
export interface DeleteRequestState<T> {
    response: ApiResponse<T> | null;
    isLoading: boolean;
    error: ApiRequestErrorType | null;
    del: (url: string, params?: object, options?: object) => Promise<ApiResponse<T> | null | undefined>;
    reset: ()=> void;
}


export const useDeleteRequest = <T, M = unknown>() => {
    const [response, setResponse] = useState<ApiResponse<T, M> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiRequestErrorType | null>(null);

    // API call function
    const deleteRequest = useCallback(
        async (url: string, data?: object, options?: object): Promise<ApiResponse<T, M> | null | undefined> => {
            setIsLoading(true);
            setError(null);

            try {
                const responseData = await del<ApiResponse<T, M>>(url, data, options);
                setResponse(responseData || null);
                return responseData;
            } catch (exception: any) {
                setError(exception);
                throw exception;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const reset = () => {
        setIsLoading(false);
        setError(null);
        setResponse(null);
    };

    return { response, isLoading, error, del: deleteRequest, reset };
};
