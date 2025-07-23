# Authorization Strategy for API Client

This document explains the flexible authorization strategy implemented for the API client in this React Native boilerplate project.

## Architecture Overview

The authorization system uses the Strategy pattern to allow different authorization methods to be implemented and used interchangeably without modifying the core API client code.

### Key Components

1. **AuthorizationStrategy Interface**: Defines the contract that all authorization strategies must implement.
2. **AuthorizationContext**: Manages multiple authorization strategies and applies them to API requests.
3. **Concrete Strategy Implementations**: Specific implementations for different authorization methods (JWT, OAuth2, etc.).

## How It Works

1. The API client uses an axios interceptor to apply authorization to requests.
2. The interceptor delegates to the `authorizationContext` to apply the selected strategy.
3. Using `authorizationContext` can get access to the selected strategy's functions.

## Usage

In `AuthorizationStrategy.ts` you can set what authentication strategy you would like to use. 
For example, if you would like JWT Authorization logic, you need to set it this way:

```typescript
export const authorizationContext = new AuthorizationContext(new JwtAuthStrategy());
```

Now you can use the JWT specific methods with `authorizationContext`.

For example, when the user logs in, we want to store the JWT token to use during HTTP requests.
```typescript
authorizationContext.getStrategy()?.setToken('JWT.auth.token');
```

## Creating Custom Authorization Strategies

To create a custom authorization strategy, implement the `AuthorizationStrategy` interface:

```typescript
import { InternalAxiosRequestConfig } from 'axios';
import { AuthorizationStrategy } from '@src/api/auth/AuthorizationStrategy';

export class CustomAuthStrategy implements AuthorizationStrategy {
  async applyAuthorization(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    // Modify the request config to add your custom authorization
    config.headers = {
      ...config.headers,
      'X-Custom-Auth': 'your-custom-auth-value'
    };
    
    return config;
  }
  
  isApplicable(config: InternalAxiosRequestConfig): boolean {
    // Determine if this strategy should be applied to this request
    return !config.url?.includes('/secret');
  }
}
```
## More info
For more info and better understanding, you can always study `client.ts`.
I'd recommend checking this part:

```typescript
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
```
