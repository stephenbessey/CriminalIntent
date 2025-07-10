import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { HeaderButton } from '../components/HeaderButton';
import { CustomButton } from '../components/CustomButton';
import { CrimeForm } from '../components/CrimeForm';
import { CrimeService } from '../services/CrimeService';
import { useThemedHeader } from '../hooks/useThemedHeader';
import { useCrimeSave } from '../hooks/useCrimeSave';
import { useCrimeLoader } from '../hooks/useCrimeLoader';
import { SCREENS, SPACING } from '../constants';

export default function DetailScreen({ route, navigation }) {
  const { crimeId } = route.params || {};
  const [crime, setCrime] = useState({
    title: '',
    details: '',
    date: new Date().toISOString(),
    solved: false,
    photo: null,
  });

  const { saving, handleSave } = useCrimeSave(crimeId, navigation);
  const { loading } = useCrimeLoader(crimeId, setCrime, navigation);

  useThemedHeader(
    navigation,
    'Crime Details',
    () => (
      <HeaderButton
        icon="settings"
        onPress={() => navigation.navigate(SCREENS.SETTINGS)}
      />
    )
  );

  const handleCrimeUpdate = (updatedCrime) => {
    setCrime(updatedCrime);
  };

  const onSave = () => {
    handleSave(crime);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CrimeForm crime={crime} onCrimeUpdate={handleCrimeUpdate} />
      
      <CustomButton
        title={saving ? 'Saving...' : 'Save Crime'}
        onPress={onSave}
        disabled={saving}
        style={styles.saveButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.MD,
  },
  saveButton: {
    marginTop: SPACING.LG,
  },
});
