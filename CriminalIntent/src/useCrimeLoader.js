import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { CrimeService } from '../services/CrimeService';
import { ERROR_MESSAGES } from '../constants';

export const useCrimeLoader = (crimeId, setCrime, navigation) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (crimeId) {
      loadCrime();
    }
  }, [crimeId]);

  const loadCrime = async () => {
    try {
      setLoading(true);
      const crimeData = await CrimeService.getCrimeById(crimeId);
      if (crimeData) {
        setCrime(crimeData);
      }
    } catch (error) {
      Alert.alert('Error', error.message || ERROR_MESSAGES.LOAD_CRIME_DETAILS_FAILED);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return { loading };
};
