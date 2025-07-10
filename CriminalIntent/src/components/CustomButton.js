import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { 
  SPACING, 
  FONT_SIZES, 
  FONT_WEIGHTS,
  BORDER_RADIUS,
  COMPONENT_HEIGHTS,
  OPACITY 
} from '../constants';

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
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </Pressable>
  );
};

const createStyles = (theme) => StyleSheet.create({
  button: {
    paddingVertical: SPACING.SM + SPACING.XS / 2,
    paddingHorizontal: SPACING.LG,
    borderRadius: BORDER_RADIUS.MEDIUM,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: COMPONENT_HEIGHTS.BUTTON,
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
    opacity: OPACITY.PRESSED + 0.1,
  },
  disabled: {
    opacity: OPACITY.DISABLED,
  },
  text: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
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