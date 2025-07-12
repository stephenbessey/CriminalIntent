import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  Text 
} from 'react-native';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { DatePicker } from '../components/DatePicker';
import { PhotoPicker } from '../components/PhotoPicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { CrimeService } from '../services/CrimeService';
import { useTheme } from '../context/ThemeContext';
import { validateCrime, hasValidationErrors, getFirstErrorMessage } from '../utils/validation';
import { 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES, 
  PLACEHOLDERS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS
} from '../constants';

export default function DetailScreen({ route, navigation }) {
  const { crimeId } = route.params || {};
  const { currentTheme } = useTheme();
  const [crime, setCrime] = useState({
    title: '',
    details: '',
    date: new Date().toISOString(),
    solved: false,
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (crimeId) {
      loadCrime();
    }
  }, [crimeId]);

  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

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

  const handleSave = async () => {
    const errors = validateCrime(crime);
    if (hasValidationErrors(errors)) {
      Alert.alert('Validation Error', getFirstErrorMessage(errors));
      return;
    }

    try {
      setSaving(true);
      const savedCrime = await CrimeService.saveCrime({
        ...crime,
        id: crimeId,
      });
      
      setCrime(savedCrime);
      
      setSaveSuccess(true);
      
      Alert.alert(
        'Success',
        crimeId ? SUCCESS_MESSAGES.CRIME_UPDATED : SUCCESS_MESSAGES.CRIME_CREATED,
        [{ text: 'OK' }]
      );

      if (!crimeId && savedCrime.id) {
        navigation.setParams({ crimeId: savedCrime.id });
      }
      
    } catch (error) {
      Alert.alert('Error', error.message || ERROR_MESSAGES.SAVE_CRIME_FAILED);
    } finally {
      setSaving(false);
    }
  };

  const updateCrime = (field, value) => {
    setCrime(prev => ({
      ...prev,
      [field]: value,
    }));
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };

  const styles = createStyles(currentTheme);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {saveSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>
            ✓ {crimeId ? 'Crime updated successfully!' : 'Crime created successfully!'}
          </Text>
        </View>
      )}

      <View style={styles.photoSection}>
        <PhotoPicker
          photo={crime.photo}
          onPhotoSelect={(uri) => updateCrime('photo', uri)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <CustomTextInput
          value={crime.title}
          onChangeText={(text) => updateCrime('title', text)}
          placeholder={PLACEHOLDERS.CRIME_TITLE}
          maxLength={100}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Details</Text>
        <CustomTextInput
          value={crime.details}
          onChangeText={(text) => updateCrime('details', text)}
          placeholder={PLACEHOLDERS.CRIME_DETAILS}
          multiline
          maxLength={1000}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <DatePicker
          date={crime.date}
          onDateChange={(date) => updateCrime('date', date)}
        />
      </View>

      <View style={styles.checkboxSection}>
        <Text style={styles.label}>Solved</Text>
        <CustomCheckbox
          value={crime.solved}
          onValueChange={(value) => updateCrime('solved', value)}
          accessibilityLabel="Crime solved status"
        />
      </View>

      <View style={styles.buttonSection}>
        <CustomButton
          title={saving ? 'Saving...' : 'Save Crime'}
          onPress={handleSave}
          disabled={saving}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: SPACING.MD,
  },
  successBanner: {
    backgroundColor: theme.colors.success,
    padding: SPACING.SM,
    borderRadius: 8,
    marginBottom: SPACING.MD,
    alignItems: 'center',
  },
  successText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  section: {
    marginBottom: SPACING.LG,
  },
  checkboxSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  buttonSection: {
    marginTop: SPACING.LG,
  },
  label: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: theme.colors.text,
    marginBottom: SPACING.SM,
  },
});