import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { CrimeService } from '../services/CrimeService';
import { validateCrime, hasValidationErrors, getFirstErrorMessage } from '../utils/validation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

export const useCrimeSave = (crimeId, onSaveSuccess) => {
  const [saving, setSaving] = useState(false);
  
  const handleSave = useCallback(async (crime) => {
    const errors = validateCrime(crime);
    if (hasValidationErrors(errors)) {
      Alert.alert('Validation Error', getFirstErrorMessage(errors));
      return { success: false };
    }

    try {
      setSaving(true);
      const savedCrime = await CrimeService.saveCrime({ ...crime, id: crimeId });
      
      Alert.alert(
        'Success',
        crimeId ? SUCCESS_MESSAGES.CRIME_UPDATED : SUCCESS_MESSAGES.CRIME_CREATED,
        [{ text: 'OK' }]
      );

      if (onSaveSuccess) {
        onSaveSuccess(savedCrime);
      }

      return { success: true, crime: savedCrime };
    } catch (error) {
      Alert.alert('Error', error.message || ERROR_MESSAGES.SAVE_CRIME_FAILED);
      return { success: false, error };
    } finally {
      setSaving(false);
    }
  }, [crimeId, onSaveSuccess]);
  
  return { saving, handleSave };
};