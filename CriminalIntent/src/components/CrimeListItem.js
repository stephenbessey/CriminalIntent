import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../context/ThemeContext';
import { formatDateShort } from '../utils/dateUtils';
import { ICON_SIZES, OPACITY, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';

export const CrimeListItem = ({ crime, onPress }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Crime: ${crime.title}, ${crime.solved ? 'solved' : 'unsolved'}`}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {crime.title}
        </Text>
        <Text style={styles.date}>
          {formatDateShort(crime.date)}
        </Text>
        {crime.details && (
          <Text style={styles.details} numberOfLines={2}>
            {crime.details}
          </Text>
        )}
      </View>
      {crime.solved && (
        <View style={styles.iconContainer}>
          <FontAwesome6 name="handcuffs" size={24} color={currentTheme.colors.text} />
        </View>
      )}
    </Pressable>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    opacity: OPACITY.PRESSED,
  },
  content: {
    flex: 1,
    marginRight: SPACING.MD,
  },
  title: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: theme.colors.text,
    marginBottom: SPACING.XS / 2,
  },
  date: {
    fontSize: FONT_SIZES.SMALL,
    color: theme.colors.textSecondary,
    marginBottom: SPACING.XS / 2,
  },
  details: {
    fontSize: FONT_SIZES.SMALL,
    color: theme.colors.textSecondary,
    lineHeight: FONT_SIZES.SMALL * 1.4,
  },
  iconContainer: {
    padding: SPACING.XS,
  },
});