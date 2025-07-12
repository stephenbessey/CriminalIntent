import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants';

export const CustomCheckbox = ({ 
  value, 
  onValueChange, 
  label, 
  disabled = false,
  accessibilityLabel 
}) => {
  const { currentTheme } = useTheme();
  
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const styles = createStyles(currentTheme, disabled);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel || label}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && (
          <Ionicons 
            name="checkmark" 
            size={18} 
            color="#FFFFFF" 
          />
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const createStyles = (theme, disabled) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.SM,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  label: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: theme.colors.text,
  },
});