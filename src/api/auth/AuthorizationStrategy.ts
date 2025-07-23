import { InternalAxiosRequestConfig } from 'axios';
import {JwtAuthStrategy} from '@src/api/auth/strategies/JwtAuthStrategy.ts';
import {OAuth2Strategy} from '@src/api/auth/strategies/OAuth2Strategy.ts';

/**
 * Interface for authorization strategies
 * This interface defines the contract that all authorization strategies must implement
 */
export interface AuthorizationStrategy {
  /**
   * Apply authorization to the request config
   * @param config The axios request configuration
   * @returns Promise<InternalAxiosRequestConfig> The modified config with authorization
   */
  applyAuthorization(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>;
  
  /**
   * Check if the strategy is applicable for the given request
   * This allows strategies to be selectively applied to certain requests
   * @param config The axios request configuration
   * @returns boolean True if the strategy should be applied to this request
   */
  isApplicable(config: InternalAxiosRequestConfig): boolean;
}

/**
 * Authorization context that manages and applies authorization strategies
 */
export class AuthorizationContext<T extends AuthorizationStrategy = AuthorizationStrategy> {
  private strategy: T | undefined;

  constructor(strategy: T) {
    this.setStrategy(strategy)
  }
  
  /**
   * Add a strategy to the context
   * @param strategy The strategy to add
   */
  setStrategy(strategy: T): void {
    this.strategy = strategy;
  }

  /**
   * Get the strategy of the context
   */
  getStrategy(): T | undefined {
    return this.strategy;
  }

  /**
   * Apply all applicable strategies to the request config
   * @param config The axios request configuration
   * @returns Promise<InternalAxiosRequestConfig> The modified config with authorization
   */
  async applyStrategies(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    let currentConfig = { ...config };

    if (this.strategy?.isApplicable(currentConfig)) {
      currentConfig = await this.strategy.applyAuthorization(currentConfig);
    }
    
    return currentConfig;
  }
}

// Initiate the selected Strategy as a singleton
export const authorizationContext = new AuthorizationContext(new JwtAuthStrategy());
