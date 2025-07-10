import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { CrimeService } from '../services/CrimeService';
import { ERROR_MESSAGES } from '../constants';

export const useCrimesLoader = () => {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCrimes = useCallback(async () => {
    try {
      setLoading(true);
      const crimesData = await CrimeService.getAllCrimes();
      setCrimes(crimesData);
    } catch (error) {
      Alert.alert('Error', error.message || ERROR_MESSAGES.LOAD_CRIMES_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  return { crimes, loading, loadCrimes };
};
