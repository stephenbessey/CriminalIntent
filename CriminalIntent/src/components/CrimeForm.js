import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { CustomTextInput } from './CustomTextInput';
import { DatePicker } from './DatePicker';
import { PhotoPicker } from './PhotoPicker';
import { useTheme } from '../context/ThemeContext';
import { PLACEHOLDERS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';

export const CrimeForm = ({ crime, onCrimeUpdate }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  const updateField = (field, value) => {
    onCrimeUpdate({ ...crime, [field]: value });
  };

  return (
    <>
      <View style={styles.photoSection}>
        <PhotoPicker
          photo={crime.photo}
          onPhotoSelect={(uri) => updateField('photo', uri)}
        />
      </View>

      <FormSection label="Title">
        <CustomTextInput
          value={crime.title}
          onChangeText={(text) => updateField('title', text)}
          placeholder={PLACEHOLDERS.CRIME_TITLE}
          maxLength={100}
        />
      </FormSection>

      <FormSection label="Details">
        <CustomTextInput
          value={crime.details}
          onChangeText={(text) => updateField('details', text)}
          placeholder={PLACEHOLDERS.CRIME_DETAILS}
          multiline
          maxLength={1000}
        />
      </FormSection>

      <FormSection label="Date">
        <DatePicker
          date={crime.date}
          onDateChange={(date) => updateField('date', date)}
        />
      </FormSection>

      <View style={styles.switchSection}>
        <Text style={styles.label}>Solved</Text>
        <Switch
          value={crime.solved}
          onValueChange={(value) => updateField('solved', value)}
          trackColor={{
            false: currentTheme.colors.border,
            true: currentTheme.colors.success
          }}
          thumbColor="#FFFFFF"
          accessibilityLabel="Crime solved status"
        />
      </View>
    </>
  );
};

const FormSection = ({ label, children, style }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  return (
    <View style={[styles.section, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  photoSection: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  section: {
    marginBottom: SPACING.LG,
  },
  switchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  label: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: theme.colors.text,
    marginBottom: SPACING.SM,
  },
});