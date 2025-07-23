import { MMKV } from 'react-native-mmkv';
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

const mmkv = new MMKV();
// mmkv.clearAll();
export class MMKVStorageAdapter implements StorageAdapter {
    setItem<T>(key: string, value: T): void {

        try{
            mmkv.delete(key); // MMKV v2 storage leak fix # https://github.com/mrousavy/react-native-mmkv/issues/440 | TODO: Remove when we moved to the new architecture and can update to newer version of this package
        }catch (e) {}

        try {
            const serializedValue = JSON.stringify(value);
            mmkv.set(key, serializedValue);
            // console.log(`${this.constructor.name}: Successfully saved data for key ${key}`);
        } catch (error) {
            console.error(`${this.constructor.name}: Error saving data for key ${key}:`, error);
        }
    }

    getItem<T>(key: string): T | null {
        try {
            const value = mmkv.getString(key) || null;
            return safeJsonParse<T>(value);
        } catch (error) {
            console.error(`${this.constructor.name}: Error getting data for key ${key}:`, error);
            return null;
        }
    }

    removeItem(key: string): void {
        try {
            mmkv.delete(key);
            console.log(`${this.constructor.name}: Successfully removed data for key ${key}`);
        } catch (error) {
            console.error(`${this.constructor.name}: Error removing data for key ${key}:`, error);
        }
    }

    clear(): void {
        try {
            mmkv.clearAll();
            console.log(`${this.constructor.name}: Successfully cleared all data`);
        } catch (error) {
            console.error(`${this.constructor.name}: Error clearing all data:`, error);
        }
    }
}
