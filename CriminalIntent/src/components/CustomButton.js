import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style 
}) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
};

const createStyles = (theme) => StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: theme.colors.text,
  },
  successText: {
    color: '#FFFFFF',
  },
});
