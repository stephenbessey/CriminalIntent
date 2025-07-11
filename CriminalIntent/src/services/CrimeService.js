import { StorageService } from './StorageService';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../constants';
import { validateCrime, hasValidationErrors, getFirstErrorMessage } from '../utils/validation';
import { sortByDateDescending } from '../utils/dateUtils';

const generateId = () => {
  return 'crime_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export class CrimeNotFoundError extends Error {
  constructor(id) {
    super(`Crime with ID ${id} not found`);
    this.name = 'CrimeNotFoundError';
  }
}

export class CrimeValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CrimeValidationError';
  }
}

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
      throw new Error('Crime ID is required');
    }

    try {
      const crimes = await this.getAllCrimes();
      const crime = crimes.find(crime => crime.id === id);

      if (!crime) {
        throw new CrimeNotFoundError(id);
      }

      return crime;
    } catch (error) {
      if (error instanceof CrimeNotFoundError) {
        throw error;
      }
      console.error(`Error loading crime with ID ${id}:`, error);
      throw new Error(ERROR_MESSAGES.LOAD_CRIME_DETAILS_FAILED);
    }
  }

  static async saveCrime(crimeData) {
    const crimeId = crimeData.id || generateId();
    const now = new Date().toISOString();

    const crime = this._prepareCrimeData(crimeData, crimeId, now);
    this._validateCrimeData(crime);

    try {
      const crimes = await StorageService.get(STORAGE_KEYS.CRIMES_DATA) || [];
      const updatedCrimes = this._upsertCrime(crimes, crime);

      await StorageService.set(STORAGE_KEYS.CRIMES_DATA, updatedCrimes);
      return crime;
    } catch (error) {
      if (error instanceof CrimeValidationError) {
        throw error;
      }
      console.error('Error saving crime:', error);
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
        throw new CrimeNotFoundError(id);
      }

      await StorageService.set(STORAGE_KEYS.CRIMES_DATA, filteredCrimes);
      return true;
    } catch (error) {
      if (error instanceof CrimeNotFoundError) {
        throw error;
      }
      console.error(`Error deleting crime with ID ${id}:`, error);
      throw new Error(ERROR_MESSAGES.DELETE_CRIME_FAILED);
    }
  }

  static async getFilteredCrimes(filter = {}) {
    try {
      let crimes = await this.getAllCrimes();

      crimes = this._applyFilters(crimes, filter);

      return crimes;
    } catch (error) {
      console.error('Error filtering crimes:', error);
      throw new Error(ERROR_MESSAGES.LOAD_CRIMES_FAILED);
    }
  }

  static async getCrimeStats() {
    try {
      const crimes = await this.getAllCrimes();

      return this._calculateStats(crimes);
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

  static _prepareCrimeData(crimeData, crimeId, now) {
    return {
      id: crimeId,
      title: crimeData.title?.trim() || '',
      details: crimeData.details?.trim() || '',
      date: crimeData.date || now,
      solved: Boolean(crimeData.solved),
      photo: crimeData.photo || null,
      createdAt: crimeData.createdAt || now,
      updatedAt: now,
    };
  }

  static _validateCrimeData(crime) {
    const errors = validateCrime(crime);
    if (hasValidationErrors(errors)) {
      const errorMessage = getFirstErrorMessage(errors);
      throw new CrimeValidationError(errorMessage);
    }
  }

  static _upsertCrime(crimes, crime) {
    const existingIndex = crimes.findIndex(c => c.id === crime.id);

    if (existingIndex >= 0) {
      crimes[existingIndex] = crime;
    } else {
      crimes.push(crime);
    }

    return crimes;
  }

  static _applyFilters(crimes, filter) {
    let filteredCrimes = crimes;

    if (filter.solved !== undefined) {
      filteredCrimes = filteredCrimes.filter(crime => crime.solved === filter.solved);
    }

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filteredCrimes = filteredCrimes.filter(crime =>
        crime.title.toLowerCase().includes(searchLower) ||
        crime.details.toLowerCase().includes(searchLower)
      );
    }

    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      filteredCrimes = filteredCrimes.filter(crime => new Date(crime.date) >= startDate);
    }

    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      filteredCrimes = filteredCrimes.filter(crime => new Date(crime.date) <= endDate);
    }

    return filteredCrimes;
  }

  static _calculateStats(crimes) {
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
  }
}