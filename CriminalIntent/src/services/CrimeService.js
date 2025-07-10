import { v4 as uuidv4 } from 'react-native-uuid';
import { StorageService } from './StorageService';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../constants';
import { validateCrime, hasValidationErrors, getFirstErrorMessage } from '../utils/validation';
import { sortByDateDescending } from '../utils/dateUtils';

export class CrimeService {

  static async getAllCrimes() {
    try {
      const crimes = await StorageService.get(STORAGE_KEYS.CRIMES_DATA) || [];
      return sortByDateDescending(crimes);
    } catch (error) {
      console.error('Error loading crimes:', error);
      throw new Error(ERROR_MESSAGES.LOAD_CRIMES_FAILED);
    }
  }

  static async getCrimeById(id) {
    if (!id) {
      return null;
    }

    try {
      const crimes = await this.getAllCrimes();
      return crimes.find(crime => crime.id === id) || null;
    } catch (error) {
      console.error(`Error loading crime with ID ${id}:`, error);
      throw new Error(ERROR_MESSAGES.LOAD_CRIME_DETAILS_FAILED);
    }
  }

  static async saveCrime(crimeData) {
    try {
      const crimeId = crimeData.id || uuidv4();
      const now = new Date().toISOString();
      
      const crime = {
        id: crimeId,
        title: crimeData.title || '',
        details: crimeData.details || '',
        date: crimeData.date || now,
        solved: crimeData.solved || false,
        photo: crimeData.photo || null,
        createdAt: crimeData.createdAt || now,
        updatedAt: now,
      };

      const errors = validateCrime(crime);
      if (hasValidationErrors(errors)) {
        const errorMessage = getFirstErrorMessage(errors);
        throw new Error(errorMessage);
      }

      const crimes = await StorageService.get(STORAGE_KEYS.CRIMES_DATA) || [];
      
      const existingIndex = crimes.findIndex(c => c.id === crimeId);
      
      if (existingIndex >= 0) {
        crimes[existingIndex] = crime;
      } else {
        crimes.push(crime);
      }

      await StorageService.set(STORAGE_KEYS.CRIMES_DATA, crimes);
      
      return crime;
    } catch (error) {
      console.error('Error saving crime:', error);
      
      if (error.message && !error.message.includes('Failed')) {
        throw error;
      }
      
      throw new Error(ERROR_MESSAGES.SAVE_CRIME_FAILED);
    }
  }

  static async deleteCrime(id) {
    if (!id) {
      throw new Error('Crime ID is required');
    }

    try {
      const crimes = await StorageService.get(STORAGE_KEYS.CRIMES_DATA) || [];
      const filteredCrimes = crimes.filter(crime => crime.id !== id);
      
      if (crimes.length === filteredCrimes.length) {
        throw new Error('Crime not found');
      }
      
      await StorageService.set(STORAGE_KEYS.CRIMES_DATA, filteredCrimes);
      return true;
    } catch (error) {
      console.error(`Error deleting crime with ID ${id}:`, error);
      throw new Error(ERROR_MESSAGES.DELETE_CRIME_FAILED);
    }
  }

  static async getFilteredCrimes(filter = {}) {
    try {
      let crimes = await this.getAllCrimes();
      
      if (filter.solved !== undefined) {
        crimes = crimes.filter(crime => crime.solved === filter.solved);
      }
      
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        crimes = crimes.filter(crime => 
          crime.title.toLowerCase().includes(searchLower) ||
          crime.details.toLowerCase().includes(searchLower)
        );
      }
      
      if (filter.startDate) {
        const startDate = new Date(filter.startDate);
        crimes = crimes.filter(crime => new Date(crime.date) >= startDate);
      }
      
      if (filter.endDate) {
        const endDate = new Date(filter.endDate);
        crimes = crimes.filter(crime => new Date(crime.date) <= endDate);
      }
      
      return crimes;
    } catch (error) {
      console.error('Error filtering crimes:', error);
      throw new Error(ERROR_MESSAGES.LOAD_CRIMES_FAILED);
    }
  }

  static async getCrimeStats() {
    try {
      const crimes = await this.getAllCrimes();
      
      const stats = {
        total: crimes.length,
        solved: crimes.filter(c => c.solved).length,
        unsolved: crimes.filter(c => !c.solved).length,
        withPhotos: crimes.filter(c => c.photo).length,
        lastUpdated: crimes.length > 0 
          ? crimes.reduce((latest, crime) => 
              new Date(crime.updatedAt) > new Date(latest) ? crime.updatedAt : latest, 
              crimes[0].updatedAt
            )
          : null,
      };
      
      return stats;
    } catch (error) {
      console.error('Error calculating crime statistics:', error);
      throw new Error('Failed to calculate statistics');
    }
  }

  static async clearAllCrimes() {
    try {
      await StorageService.remove(STORAGE_KEYS.CRIMES_DATA);
    } catch (error) {
      console.error('Error clearing all crimes:', error);
      throw new Error('Failed to clear crimes');
    }
  }
}