import {MMKVStorageAdapter} from '@src/storage/adapters/MMKVStorageAdapter';

export interface StorageAdapter {
    setItem<T>(key: string, value: T): Promise<void> | void;
    getItem<T>(key: string): Promise<T | null> | T | null;
    removeItem(key: string): Promise<void> | void;
    clear(): Promise<void> | void;
}

class Storage<T extends StorageAdapter> {
    private adapter: T;

    constructor(adapter: T) {
        this.adapter = adapter;
    }

    // If the adapter method is async, we return a Promise, otherwise we return the sync value directly
    setItem<K>(key: string, value: K): T extends { setItem: (...args: any[]) => Promise<void> } ? Promise<void> : void {
        const result = this.adapter.setItem(key, value);
        return result as any; // TypeScript should infer the correct return type
    }

    getItem<K>(key: string): T extends { getItem: (...args: any[]) => Promise<K | null> } ? Promise<K | null> : K | null {
        const result = this.adapter.getItem<K>(key);
        return result as any; // TypeScript should infer the correct return type
    }

    removeItem(key: string): T extends { removeItem: (...args: any[]) => Promise<void> } ? Promise<void> : void {
        const result = this.adapter.removeItem(key);
        return result as any; // TypeScript should infer the correct return type
    }

    clear(): T extends { clear: (...args: any[]) => Promise<void> } ? Promise<void> : void {
        const result = this.adapter.clear();
        return result as any; // TypeScript should infer the correct return type
    }
}

export const storage = new Storage(new MMKVStorageAdapter());
