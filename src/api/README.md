# HTTP Client

A powerful and flexible HTTP client for making API requests in React Native applications. Built on top of Axios with additional features like caching, error handling, and React hooks for state management.

## Table of Contents

- [Features](#features)
- [React Hooks](#react-hooks)
  - [useGetRequest](#usegetrequest)
  - [usePostRequest](#usepostrequest)
  - [usePutRequest](#useputrequest)
  - [useDeleteRequest](#usedeleteRequest)
- [Creating Custom API Hooks](#creating-custom-api-hooks)
- [Caching](#caching)
- [Error Handling](#error-handling)
- [Authorization](#authorization)
- [TypeScript Support](#typescript-support)
- [Request and Response Processing](#request-and-response-processing)
- [HTTP Methods](#http-methods)
  - [GET](#get)
  - [POST](#post)
  - [PUT](#put)
  - [DELETE](#delete)

## Features

- **Type-safe API calls** with TypeScript support
- **Caching mechanism** for offline support
- **Error handling** with detailed error information
- **Authorization strategies** using JWT and OAuth2
- **React hooks** for easy integration with React components
- **Request cancellation** to prevent memory leaks
- **Request/response logging** for debugging

## React Hooks

The HTTP client provides React hooks for each HTTP method to easily manage request state in React components. These hooks are the recommended way to make API calls in your application.

### useGetRequest

```typescript
useGetRequest<T, M = unknown>(): GetRequestState<T, M>
```

Hook for making GET requests with state management.

**Returns:**
- `response`: The response data
- `isLoading`: Boolean indicating if the request is in progress
- `error`: Error object if the request failed
- `get`: Function to make the GET request
- `reset`: Function to reset the state
- `cancel`: Function to cancel the request

**Example:**
```typescript
const { response, isLoading, error, get } = useGetRequest<UserData>();

useEffect(() => {
  get('/users', { limit: 10 });
}, []);

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
return <UserList users={response?.data} />;
```

### usePostRequest

```typescript
usePostRequest<T, M = unknown>(): PostRequestState<T, M>
```

Hook for making POST requests with state management.

**Returns:**
- `response`: The response data
- `isLoading`: Boolean indicating if the request is in progress
- `error`: Error object if the request failed
- `post`: Function to make the POST request
- `reset`: Function to reset the state

**Example:**
```typescript
const { response, isLoading, error, post } = usePostRequest<UserData>();

const handleSubmit = async (userData) => {
  await post('/users', userData);
};
```

### usePutRequest

```typescript
usePutRequest<T, M = unknown>(): PutRequestState<T, M>
```

Hook for making PUT requests with state management.

**Returns:**
- `response`: The response data
- `isLoading`: Boolean indicating if the request is in progress
- `error`: Error object if the request failed
- `put`: Function to make the PUT request
- `reset`: Function to reset the state

**Example:**
```typescript
const { response, isLoading, error, put } = usePutRequest<UserData>();

const handleUpdate = async (userId, userData) => {
  await put(`/users/${userId}`, userData);
};
```

### useDeleteRequest

```typescript
useDeleteRequest<T, M = unknown>(): DeleteRequestState<T, M>
```

Hook for making DELETE requests with state management.

**Returns:**
- `response`: The response data
- `isLoading`: Boolean indicating if the request is in progress
- `error`: Error object if the request failed
- `del`: Function to make the DELETE request
- `reset`: Function to reset the state

**Example:**
```typescript
const { response, isLoading, error, del } = useDeleteRequest<UserData>();

const handleDelete = async (userId) => {
  await del(`/users/${userId}`);
};
```

## Creating Custom API Hooks

While the base hooks (`useGetRequest`, `usePostRequest`, etc.) are powerful, we **strongly recommend** creating custom API hooks for specific endpoints. This approach provides several benefits:

- **Better code organization**: Group related API calls together
- **Improved readability**: Use descriptive names like `useGetUserProfile` instead of generic `useGetRequest`
- **Type safety**: Define specific types for each endpoint
- **Reusability**: Reuse the same API call logic across components
- **Easier maintenance**: Update API call logic in one place

### Example Custom Hook

Here's an example of a custom hook for fetching quotes:

```typescript
// src/api/quotes.api.ts
import { useGetRequest, GetRequestState } from '@src/api/client';
import { QuoteApiResponse } from '@app-types/api.types';

export const useGetQuote = () => {
  const { response, isLoading, error, get, reset } = useGetRequest<QuoteApiResponse>();

  const request = async (parameters: {} = {}) => {
    return await get('https://zenquotes.io/api/random/', parameters);
  };

  return { response, isLoading, error, request, reset };
};
```

#### Example with onUpdate Callback

If you need to use the `onUpdate` callback, you can create a custom hook that uses the direct `get` function:

```typescript
// src/api/quotes.api.ts
import { get } from '@src/api/client';
import { QuoteApiResponse } from '@app-types/api.types';
import { useState } from 'react';

export const useGetQuoteWithUpdate = () => {
  const [response, setResponse] = useState<QuoteApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (parameters: {} = {}, onUpdate?: (data: QuoteApiResponse) => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await get<QuoteApiResponse>(
        'https://zenquotes.io/api/random/', 
        { ...parameters, cache: 'eager' }, 
        {}, 
        onUpdate
      );
      setResponse(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, request };
};
```

### Using the Custom Hook

There are two ways to use custom API hooks:

#### Method 1: Assigning the hook to a variable (Recommended)

This approach provides a cleaner, more readable way to use the hook, especially when you need to make multiple API calls:

```typescript
// In your component
import { useGetQuote } from '@src/api/quotes.api';
import { QuoteApiResponse } from '@app-types/api.types';

const QuoteComponent = () => {
  const [quote, setQuote] = useState('');
  const getQuote = useGetQuote();

  useEffect(() => {
    getQuote.request().then((response) => {
      const data = response as unknown as QuoteApiResponse; // Type casting if needed
      setQuote(data[0]?.q || '');
    });
  }, []);

  if (getQuote.isLoading) return <Loading />;
  if (getQuote.error) return <Error message={getQuote.error.message} />;
  
  return (
    <View>
      <Text>{quote}</Text>
    </View>
  );
};
```

#### Method 2: Destructuring the hook's return values

```typescript
// In your component
import { useGetQuote } from '@src/api/quotes.api';

const QuoteComponent = () => {
  const { response, isLoading, error, request } = useGetQuote();

  useEffect(() => {
    request();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <View>
      <Text>{response?.data[0]?.q}</Text>
      <Text>— {response?.data[0]?.a}</Text>
    </View>
  );
};
```

Both approaches make your code more readable and maintainable, but Method 1 is particularly useful when you need to:
- Make multiple API calls with the same hook
- Process the response data before using it
- Handle the response with promise chaining (.then())
- Type cast the response to a specific type

## TypeScript Support

The HTTP client is fully typed with TypeScript, allowing you to specify the expected response type:

### Custom Response Types

You can define custom types for your API responses:

```typescript
// Define your data type
interface User {
  id: number;
  name: string;
  email: string;
}

// Use the ApiResponse generic type to wrap your data type
const { response, isLoading, error, get } = useGetRequest<ApiResponse<User[]>>();

// Now response.data is typed as User[]
response?.data.forEach(user => {
  console.log(user.name); // TypeScript knows this is a string
});
```

### The ApiResponse Interface

The `ApiResponse` interface provides a consistent structure for all API responses:

```typescript
interface ApiResponse<T, M = any> {
  data: T;                        // The actual response data
  message?: ApiResponseMessage;   // Optional message
  pagination?: ApiResponsePagination; // Optional pagination info
  meta: M;                        // Optional metadata
}
```

By using the generic type parameter `T`, you can specify the exact type of data you expect from the API:

```typescript
// Single user
useGetRequest<ApiResponse<User>>()

// Array of users
useGetRequest<ApiResponse<User[]>>()

// With custom metadata
interface UserMeta {
  lastUpdated: string;
  version: number;
}
useGetRequest<ApiResponse<User[], UserMeta>>()
```

## Request and Response Processing

When creating custom API hooks, it's important to follow a clean separation of concerns:

### Request Function Best Practices

The `request` function in your custom hook should **only** contain the HTTP request itself. If you need to process the response before returning it, add a separate `handle` function:

```typescript
export const useGetFormattedQuote = () => {
  const { response, isLoading, error, get, reset } = useGetRequest<QuoteApiResponse>();

  // The request function only makes the HTTP request
  const request = async (parameters: {} = {}) => {
    return await get('https://zenquotes.io/api/random/', parameters);
  };

  // The handle function processes the response
  const handle = async (parameters: {} = {}) => {
    const response = await request(parameters);
    
    // Process the response
    if (response && response.data && response.data.length > 0) {
      return {
        quote: response.data[0].q,
        author: response.data[0].a,
        formattedQuote: `"${response.data[0].q}" — ${response.data[0].a}`
      };
    }
    
    return null;
  };

  return { response, isLoading, error, request, handle, reset };
};
```

### Using the Processed Response

```typescript
const { handle, isLoading } = useGetFormattedQuote();

useEffect(() => {
  const fetchQuote = async () => {
    const formattedQuote = await handle();
    // Use the processed data
    setQuote(formattedQuote);
  };
  
  fetchQuote();
}, []);
```

This separation makes your code more maintainable and testable, as the HTTP request logic is separate from the data processing logic.

## Caching

The HTTP client includes a caching mechanism for GET requests to support offline usage. You can specify different cache modes:

- `disabled`: No caching
- `offline`: Use cached data only when offline (default)
- `eager`: Return cached data immediately while fetching fresh data in the background
- `boss`: Return cached data and don't fetch fresh data

### onUpdate Callback

When using the `eager` cache mode, you can provide an `onUpdate` callback function that will be called when fresh data is received from the server. This allows your UI to update with the latest data without requiring a full re-fetch.

```typescript
get<T>(url: string, params?: object, options?: AxiosRequestConfig, onUpdate?: (freshData: T) => void): Promise<T>
```

The `onUpdate` callback receives the fresh data as its parameter, allowing you to update your state or UI accordingly.

> **Note:** The `onUpdate` callback is only available when using the direct `get` function. It is not currently supported when using the `useGetRequest` hook. If you need this functionality with hooks, use the direct `get` function inside your custom hook.

**Example:**
```typescript
// Basic usage
const data = await get('/users', { limit: 10 });

// Disable caching
const data = await get('/users', { limit: 10, cache: 'disabled' });

// Return cached data immediately while fetching fresh data
const data = await get('/users', { limit: 10, cache: 'eager' });

// Using the onUpdate callback with eager cache mode
const [users, setUsers] = useState([]);
const data = await get('/users', 
  { limit: 10, cache: 'eager' }, 
  {}, // options
  (freshData) => {
    // This will be called when fresh data arrives from the server
    setUsers(freshData);
  }
);
```

## Error Handling

The HTTP client uses a custom `ApiRequestError` class for error handling. All API errors are automatically caught and transformed into this format:

```typescript
interface ApiRequestErrorType {
  code: number;       // HTTP status code
  message: string;    // Error message
  errors?: {          // Field-specific errors (optional)
    [key: string]: string
  } | null;
}
```

**Example:**
```typescript
try {
  const data = await get('/users');
} catch (error) {
  if (error instanceof ApiRequestError) {
    console.error(`Error ${error.code}: ${error.message}`);
    
    // Field-specific errors
    if (error.errors) {
      Object.entries(error.errors).forEach(([field, message]) => {
        console.error(`${field}: ${message}`);
      });
    }
  }
}
```

## Authorization

The HTTP client supports different authorization strategies using a strategy pattern. For detailed information about authentication and authorization, please refer to the [Authentication documentation](/src/api/auth/README.md).

Basic usage:

```typescript
// JWT authentication is configured by default
import { authorizationContext } from '@src/api/auth/AuthorizationStrategy';

// You can switch to a different strategy if needed
authorizationContext.setStrategy(new JwtAuthStrategy());
```

## HTTP Methods

The following HTTP methods are available as helper functions. While these are useful for direct API calls, we recommend using the React hooks for most use cases.

### GET

```typescript
get<T>(url: string, params?: object, options?: AxiosRequestConfig, onUpdate?: (freshData: T) => void): Promise<T>
```

Makes a GET request to the specified URL.

**Parameters:**
- `url`: The endpoint URL
- `params`: Query parameters (optional)
- `options`: Additional Axios request options (optional)
- `onUpdate`: Callback function that receives fresh data when using eager cache mode (optional)

**Returns:**
- Promise resolving to the response data

**Example:**
```typescript
// Basic GET request
const data = await get('/users', { limit: 10 });

// With onUpdate callback for eager cache mode
const data = await get('/users', 
  { limit: 10, cache: 'eager' }, 
  {}, 
  (freshData) => {
    // Update UI with fresh data
    setUsers(freshData);
  }
);
```

### POST

```typescript
post<T>(url: string, data?: object, options?: AxiosRequestConfig): Promise<T>
```

Makes a POST request to the specified URL.

**Parameters:**
- `url`: The endpoint URL
- `data`: Request body (optional)
- `options`: Additional Axios request options (optional)

**Returns:**
- Promise resolving to the response data

**Example:**
```typescript
const response = await post('/users', { name: 'John', email: 'john@example.com' });
```

### PUT

```typescript
put<T>(url: string, data: object, options?: AxiosRequestConfig): Promise<T>
```

Makes a PUT request to the specified URL.

**Parameters:**
- `url`: The endpoint URL
- `data`: Request body
- `options`: Additional Axios request options (optional)

**Returns:**
- Promise resolving to the response data

**Example:**
```typescript
const response = await put('/users/1', { name: 'Updated Name' });
```

### DELETE

```typescript
del<T>(url: string, params?: object, options?: AxiosRequestConfig): Promise<T>
```

Makes a DELETE request to the specified URL.

**Parameters:**
- `url`: The endpoint URL
- `params`: Query parameters (optional)
- `options`: Additional Axios request options (optional)

**Returns:**
- Promise resolving to the response data

**Example:**
```typescript
const response = await del('/users/1');
```