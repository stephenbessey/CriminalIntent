import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const CrimeListItem = ({ crime, onPress }) => {
  const { currentTheme } = useTheme();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const styles = createStyles(currentTheme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {crime.title}
        </Text>
        <Text style={styles.date}>
          {formatDate(crime.date)}
        </Text>
        {crime.details && (
          <Text style={styles.details} numberOfLines={2}>
            {crime.details}
          </Text>
        )}
      </View>
      {crime.solved && (
        <View style={styles.iconContainer}>
          <Ionicons
            name="hand-left"
            size={24}
            color={currentTheme.colors.success}
          />
        </View>
      )}
    </Pressable>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  iconContainer: {
    padding: 4,
  },
});
