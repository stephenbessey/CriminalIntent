import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { 
  SPACING, 
  FONT_SIZES, 
  BORDER_RADIUS, 
  COMPONENT_HEIGHTS 
} from '../constants';

export const CustomTextInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false,
  style,
  maxLength,
  ...otherProps 
}) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  return (
    <TextInput
      style={[
        styles.input,
        multiline && styles.multiline,
        style
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={currentTheme.colors.textSecondary}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      maxLength={maxLength}
      accessibilityLabel={placeholder}
      {...otherProps}
    />
  );
};

const createStyles = (theme) => StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: BORDER_RADIUS.MEDIUM,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM + SPACING.XS / 2,
    fontSize: FONT_SIZES.MEDIUM,
    color: theme.colors.text,
    minHeight: COMPONENT_HEIGHTS.INPUT,
  },
  multiline: {
    minHeight: COMPONENT_HEIGHTS.MULTILINE_INPUT,
    paddingTop: SPACING.SM + SPACING.XS / 2,
  },
});