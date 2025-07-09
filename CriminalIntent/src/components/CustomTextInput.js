import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const CustomTextInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false,
  style,
  ...props 
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
      {...props}
    />
  );
};

const createStyles = (theme) => StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 48,
  },
  multiline: {
    minHeight: 100,
    paddingTop: 12,
  },
});
