import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {

  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading from storage (key: ${key}):`, error);
      throw new Error(`Failed to read data from storage`);
    }
  }

  static async set(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error writing to storage (key: ${key}):`, error);
      throw new Error(`Failed to save data to storage`);
    }
  }

  static async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage (key: ${key}):`, error);
      throw new Error(`Failed to remove data from storage`);
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }

  static async getMultiple(keys) {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result = {};
      
      pairs.forEach(([key, value]) => {
        result[key] = value ? JSON.parse(value) : null;
      });
      
      return result;
    } catch (error) {
      console.error('Error reading multiple items from storage:', error);
      throw new Error('Failed to read multiple items from storage');
    }
  }

  static async setMultiple(keyValuePairs) {
    try {
      const pairs = Object.entries(keyValuePairs).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      
      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.error('Error writing multiple items to storage:', error);
      throw new Error('Failed to save multiple items to storage');
    }
  }

  static async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all storage keys:', error);
      throw new Error('Failed to retrieve storage keys');
    }
  }

  static async hasKey(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Error checking if key exists (key: ${key}):`, error);
      return false;
    }
  }
}