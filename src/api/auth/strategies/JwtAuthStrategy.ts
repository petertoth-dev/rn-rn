import { InternalAxiosRequestConfig } from 'axios';
import { AuthorizationStrategy } from '../AuthorizationStrategy';
import { storage } from '@src/storage/Storage';

/**
 * Configuration options for JWT Authorization Strategy
 */
export interface JwtAuthOptions {
  /**
   * The key used to store the JWT token in storage
   */
  tokenKey?: string;
  
  /**
   * Optional array of URL patterns to exclude from JWT authentication
   */
  excludedUrls?: string[];
}

/**
 * JWT Authorization Strategy
 * Implements the AuthorizationStrategy interface for JWT token-based authentication
 */
export class JwtAuthStrategy implements AuthorizationStrategy {
  private tokenKey: string;
  private excludedUrls: string[];

  /**
   * Constructor
   * @param options Configuration options for the JWT strategy
   */
  constructor(options: JwtAuthOptions = {}) {
    this.tokenKey = options.tokenKey || 'auth.token';
    this.excludedUrls = options.excludedUrls || [];
  }

  /**
   * Apply JWT authorization to the request config
   * @param config The axios request configuration
   * @returns Promise<InternalAxiosRequestConfig> The modified config with JWT authorization
   */
  async applyAuthorization(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const token = storage.getItem(this.tokenKey);
    
    if (token) {
      config.headers.Authorization =  `Bearer ${token}`;
    }

    return config;
  }

  /**
   * Check if JWT strategy is applicable for the given request
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
   * Set the JWT token in storage
   * @param token The JWT token to store
   */
  setToken(token: string): void {
    storage.setItem(this.tokenKey, token);
  }
  
  /**
   * Clear the JWT token from storage
   */
  clearToken(): void {
    storage.removeItem(this.tokenKey);
  }
  
  /**
   * Get the current JWT token from storage
   * @returns string | null The JWT token or null if not set
   */
  getToken(): string | null {
    return storage.getItem(this.tokenKey);
  }
}
