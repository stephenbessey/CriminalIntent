import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { SPACING, ICON_SIZES, OPACITY } from '../constants';

export const HeaderIcons = ({ icons = [] }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  if (icons.length === 0) return null;

  return (
    <View style={styles.headerExtension}>
      <View style={styles.iconsRow}>
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
              size={ICON_SIZES.LARGE}
              color={icon.disabled ? 'rgba(255, 255, 255, 0.5)' : '#FFFFFF'}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  headerExtension: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: SPACING.MD,
    paddingBottom: SPACING.SM,
    paddingTop: SPACING.XS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  iconButton: {
    padding: SPACING.SM,
    borderRadius: SPACING.SM,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPressed: {
    opacity: OPACITY.PRESSED,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});