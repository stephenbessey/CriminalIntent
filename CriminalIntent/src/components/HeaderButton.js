import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

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
        size={24}
        color={disabled ? currentTheme.colors.textSecondary : currentTheme.colors.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
