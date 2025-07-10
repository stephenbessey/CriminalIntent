import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ICON_SIZES, OPACITY, SPACING } from '../constants';

export const HeaderButton = ({ icon, onPress, disabled = false }) => {
  const { currentTheme } = useTheme();
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons
        name={icon}
        size={ICON_SIZES.MEDIUM}
        color={disabled ? currentTheme.colors.textSecondary : currentTheme.colors.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: SPACING.SM,
    marginHorizontal: SPACING.XS,
    borderRadius: SPACING.SM,
  },
  pressed: {
    opacity: OPACITY.PRESSED,
  },
  disabled: {
    opacity: OPACITY.DISABLED,
  },
});