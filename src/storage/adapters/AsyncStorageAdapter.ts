import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAdapter } from '../Storage.ts';

// Helper function to safely parse JSON
function safeJsonParse<T>(value: string | null): T | null {
    if (value === null) return null;
    try {
        return JSON.parse(value) as T;
    } catch (error) {
        console.error('StorageAdapter: Error parsing JSON string', error);
        return null;
    }
}

export class AsyncStorageAdapter implements StorageAdapter {
    async setItem<T>(key: string, value: T): Promise<void> {
        try {
            const serializedValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, serializedValue);
            console.log(`${this.constructor.name}: Successfully saved data for key ${key}`);
        } catch (error) {
            console.error(`${this.constructor.name}: Error saving data for key ${key}:`, error);
        }
    }

    async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return safeJsonParse<T>(value);
        } catch (error) {
            console.error(`${this.constructor.name}: Error getting data for key ${key}:`, error);
            return null;
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`${this.constructor.name}: Successfully removed data for key ${key}`);
        } catch (error) {
            console.error(`${this.constructor.name}: Error removing data for key ${key}:`, error);
        }
    }

    async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
            console.log(`${this.constructor.name}: Successfully cleared AsyncStorage`);
        } catch (error) {
            console.error(`${this.constructor.name}: Error clearing ${this.constructor.name}:`, error);
        }
    }
}
