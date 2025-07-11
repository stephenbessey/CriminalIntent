import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { SPACING, ICON_SIZES, FONT_SIZES, FONT_WEIGHTS, OPACITY } from '../constants';

export const CustomHeader = ({ title, icons = [] }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {icons.length > 0 && (
        <View style={styles.iconsContainer}>
          {icons.map((icon, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.iconPressed
              ]}
              onPress={icon.onPress}
              disabled={icon.disabled}
            >
              <Ionicons
                name={icon.name}
                size={ICON_SIZES.MEDIUM}
                color={icon.disabled ? 'rgba(255, 255, 255, 0.5)' : '#FFFFFF'}
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SPACING.SM,
  },
  headerTitle: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: '#FFFFFF',
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  iconButton: {
    padding: SPACING.SM,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  iconPressed: {
    opacity: OPACITY.PRESSED,
  },
});