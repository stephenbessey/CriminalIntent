import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'react-native-uuid';

const STORAGE_KEY = 'crimes_data';

export class CrimeService {
  static async getAllCrimes() {
    try {
      const crimesData = await AsyncStorage.getItem(STORAGE_KEY);
      return crimesData ? JSON.parse(crimesData) : [];
    } catch (error) {
      console.error('Error loading crimes:', error);
      return [];
    }
  }

  static async getCrimeById(id) {
    try {
      const crimes = await this.getAllCrimes();
      return crimes.find(crime => crime.id === id) || null;
    } catch (error) {
      console.error('Error loading crime:', error);
      return null;
    }
  }

  static async saveCrime(crimeData) {
    try {
      const crimes = await this.getAllCrimes();
      const crimeId = crimeData.id || uuidv4();
      
      const crime = {
        id: crimeId,
        title: crimeData.title || 'Untitled Crime',
        details: crimeData.details || '',
        date: crimeData.date || new Date().toISOString(),
        solved: crimeData.solved || false,
        photo: crimeData.photo || null,
        createdAt: crimeData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingIndex = crimes.findIndex(c => c.id === crimeId);
      
      if (existingIndex >= 0) {
        crimes[existingIndex] = crime;
      } else {
        crimes.push(crime);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(crimes));
      return crime;
    } catch (error) {
      console.error('Error saving crime:', error);
      throw error;
    }
  }

  static async deleteCrime(id) {
    try {
      const crimes = await this.getAllCrimes();
      const filteredCrimes = crimes.filter(crime => crime.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCrimes));
      return true;
    } catch (error) {
      console.error('Error deleting crime:', error);
      return false;
    }
  }
}
