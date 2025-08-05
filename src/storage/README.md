# Storage System

This directory contains a flexible storage system for React Native applications using the Adapter Pattern. The system allows you to easily switch between different storage providers without changing your application code.

## Architecture

The storage system is built using the Adapter Pattern, which consists of:

1. **StorageAdapter Interface** - Defines the contract that all storage adapters must implement
2. **Storage Class** - The main class that uses the adapter to perform storage operations
3. **Concrete Adapters** - Implementations of the StorageAdapter interface for different storage providers

## Available Storage Adapters

The project currently includes two storage adapters:

### 1. MMKVStorageAdapter

Uses [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) for high-performance, synchronous storage operations.

**Features:**
- Synchronous API
- High performance (uses C++ MMKV under the hood)
- Encrypted storage
- Smaller memory footprint

### 2. AsyncStorageAdapter

Uses [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) for asynchronous storage operations.

**Features:**
- Asynchronous API (Promise-based)
- Widely used in React Native applications
- Good compatibility across platforms

## How to Use

### Default Usage

The storage system is pre-configured with the MMKVStorageAdapter:

```typescript
import { storage } from '@src/storage/Storage';

// Store data
storage.setItem('MY_KEY', { data: 'example' });

// Retrieve data
const data = storage.getItem('MY_KEY');

// Remove data
storage.removeItem('MY_KEY');

// Clear all data
storage.clear();
```

### Using a Different Storage Adapter

To use a different storage adapter, you can create a new instance of the Storage class:

```typescript
import { Storage } from '@src/storage/Storage';
import { AsyncStorageAdapter } from '@src/storage/adapters/AsyncStorageAdapter';

// Create a new storage instance with AsyncStorageAdapter
const asyncStorage = new Storage(new AsyncStorageAdapter());

// Using async/await with AsyncStorageAdapter
async function saveData() {
  await asyncStorage.setItem('MY_KEY', { data: 'example' });
  const data = await asyncStorage.getItem('MY_KEY');
  console.log(data);
}
```

### Creating a Custom Storage Adapter

You can create your own storage adapter by implementing the StorageAdapter interface:

```typescript
import { StorageAdapter } from '@src/storage/Storage';

export class CustomStorageAdapter implements StorageAdapter {
  setItem<T>(key: string, value: T): void {
    // Implementation for storing data
  }

  getItem<T>(key: string): T | null {
    // Implementation for retrieving data
  }

  removeItem(key: string): void {
    // Implementation for removing data
  }

  clear(): void {
    // Implementation for clearing all data
  }
}

// Then use it with the Storage class
import { Storage } from '@src/storage/Storage';
const customStorage = new Storage(new CustomStorageAdapter());
```

## Type Safety

The Storage class is designed to maintain type safety between synchronous and asynchronous adapters:

- When using a synchronous adapter (like MMKVStorageAdapter), methods return values directly
- When using an asynchronous adapter (like AsyncStorageAdapter), methods return Promises

TypeScript will infer the correct return types based on the adapter you're using.

## Best Practices

1. **Choose the right adapter for your needs:**
   - Use MMKVStorageAdapter for performance-critical storage operations
   - Use AsyncStorageAdapter for compatibility or when you prefer Promise-based API

2. **Handle errors appropriately:**
   - All adapter methods include error handling, but you should add your own error handling in your application code

3. **Consider data serialization:**
   - All adapters automatically handle JSON serialization/deserialization
   - Be aware of limitations when storing complex objects

4. **Avoid storing sensitive information:**
   - For sensitive data, consider using a secure storage solution like react-native-encrypted-storage

## Example: Switching Storage Providers

To switch from the default MMKVStorageAdapter to AsyncStorageAdapter application-wide:

```typescript
// In src/storage/Storage.ts
// Change this line:
export const storage = new Storage(new MMKVStorageAdapter());

// To:
export const storage = new Storage(new AsyncStorageAdapter());
```

This change will affect all imports of the storage instance throughout your application.