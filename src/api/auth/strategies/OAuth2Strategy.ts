import { InternalAxiosRequestConfig } from 'axios';
import { AuthorizationStrategy } from '../AuthorizationStrategy';
import { storage } from '@src/storage/Storage';

export interface OAuth2Tokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
}

/**
 * Configuration options for OAuth2 Authorization Strategy
 */
export interface OAuth2Options {
  /**
   * The key used to store OAuth2 tokens in storage
   */
  storageKey?: string;
  
  /**
   * The URL to use for refreshing tokens
   */
  refreshTokenUrl?: string;
  
  /**
   * Optional array of URL patterns to exclude from OAuth2 authentication
   */
  excludedUrls?: string[];
  
  /**
   * Optional callback function called after token refresh
   */
  onTokenRefresh?: (tokens: OAuth2Tokens) => Promise<void>;
}

/**
 * OAuth2 Authorization Strategy
 * Implements the AuthorizationStrategy interface for OAuth2 authentication
 */
export class OAuth2Strategy implements AuthorizationStrategy {
  private storageKey: string;
  private excludedUrls: string[];
  private refreshTokenUrl: string;
  private onTokenRefresh?: (tokens: OAuth2Tokens) => Promise<void>;

  /**
   * Constructor
   * @param options Configuration options for the OAuth2 strategy
   */
  constructor(options: OAuth2Options = {}) {
    this.storageKey = options.storageKey || 'auth.oauth2';
    this.refreshTokenUrl = options.refreshTokenUrl || '/oauth/token';
    this.excludedUrls = options.excludedUrls || [];
    this.onTokenRefresh = options.onTokenRefresh;
  }

  /**
   * Apply OAuth2 authorization to the request config
   * @param config The axios request configuration
   * @returns Promise<InternalAxiosRequestConfig> The modified config with OAuth2 authorization
   */
  async applyAuthorization(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const tokens = this.getTokens();
    
    if (!tokens) {
      return config;
    }
    
    // Check if token is expired and needs refresh
    if (this.isTokenExpired(tokens) && tokens.refreshToken) {
      // Skip token refresh if we're already trying to refresh
      if (config.url === this.refreshTokenUrl) {
        return config;
      }
      
      try {
        await this.refreshTokens(tokens);
      } catch (error) {
        // If refresh fails, continue with the request (it will likely fail with 401)
        console.error('Failed to refresh OAuth2 token:', error);
      }
    }
    
    // Get the latest tokens (might have been refreshed)
    const currentTokens = this.getTokens();
    
    if (currentTokens?.accessToken) {
      const tokenType = currentTokens.tokenType || 'Bearer';
      // Create a new headers object to avoid mutating the original
      config.headers.Authorization = `${tokenType} ${currentTokens.accessToken}`;
    }
    
    return config;
  }

  /**
   * Check if OAuth2 strategy is applicable for the given request
   * @param config The axios request configuration
   * @returns boolean True if the strategy should be applied to this request
   */
  isApplicable(config: InternalAxiosRequestConfig): boolean {
    // Skip authentication for excluded URLs
    if (config.url && this.excludedUrls.some(pattern => config.url!.includes(pattern))) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Set OAuth2 tokens in storage
   * @param tokens The OAuth2 tokens to store
   */
  setTokens(tokens: OAuth2Tokens): void {
    storage.setItem(this.storageKey, tokens);
  }
  
  /**
   * Get the current OAuth2 tokens from storage
   * @returns OAuth2Tokens | null The OAuth2 tokens or null if not set
   */
  getTokens(): OAuth2Tokens | null {
    return storage.getItem(this.storageKey);
  }
  
  /**
   * Clear the OAuth2 tokens from storage
   */
  clearTokens(): void {
    storage.removeItem(this.storageKey);
  }
  
  /**
   * Check if the access token is expired
   * @param tokens The OAuth2 tokens
   * @returns boolean True if the token is expired
   */
  private isTokenExpired(tokens: OAuth2Tokens): boolean {
    if (!tokens.expiresAt) {
      return false;
    }
    
    // Add a 30-second buffer to account for network latency
    return Date.now() > tokens.expiresAt - 30000;
  }
  
  /**
   * Refresh the OAuth2 tokens
   * @param tokens The current OAuth2 tokens
   * @returns Promise<void>
   */
  private async refreshTokens(tokens: OAuth2Tokens): Promise<void> {
    if (!tokens.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    // This is a placeholder for the actual token refresh logic
    // In a real implementation, you would make an API call to refresh the token
    // For example:
    // const response = await axios.post(this.refreshTokenUrl, {
    //   grant_type: 'refresh_token',
    //   refresh_token: tokens.refreshToken
    // });
    // const newTokens = {
    //   accessToken: response.data.access_token,
    //   refreshToken: response.data.refresh_token || tokens.refreshToken,
    //   expiresAt: Date.now() + (response.data.expires_in * 1000),
    //   tokenType: response.data.token_type || 'Bearer'
    // };
    
    // For this example, we'll just simulate a token refresh
    const newTokens: OAuth2Tokens = {
      accessToken: 'new-access-token',
      refreshToken: tokens.refreshToken,
      expiresAt: Date.now() + 3600000, // 1 hour from now
      tokenType: tokens.tokenType || 'Bearer'
    };
    
    this.setTokens(newTokens);
    
    if (this.onTokenRefresh) {
      await this.onTokenRefresh(newTokens);
    }
  }
}
