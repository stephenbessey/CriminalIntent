import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';

export default function SettingsScreen({ navigation }) {
  const { currentTheme, changeTheme, themes } = useTheme();

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.colors.primary,
      },
      headerTintColor: '#FFFFFF',
    });
  }, [navigation, currentTheme]);

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
  };

  const styles = createStyles(currentTheme);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pick a Theme</Text>
      
      <View style={styles.themeList}>
        {Object.entries(themes).map(([key, theme]) => (
          <CustomButton
            key={key}
            title={theme.name}
            onPress={() => handleThemeSelect(key)}
            variant={currentTheme.name === theme.name ? 'primary' : 'secondary'}
            style={styles.themeButton}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionText}>
          Criminal Intent helps you track and manage crime records with photos, dates, and status tracking.
        </Text>
      </View>
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: SPACING.MD,
  },
  title: {
    fontSize: FONT_SIZES.XLARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  themeList: {
    gap: SPACING.MD,
  },
  themeButton: {
    marginBottom: SPACING.SM,
  },
  section: {
    marginTop: SPACING.XL,
    padding: SPACING.MD,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: theme.colors.text,
    marginBottom: SPACING.SM,
  },
  sectionText: {
    fontSize: FONT_SIZES.SMALL,
    color: theme.colors.textSecondary,
    lineHeight: FONT_SIZES.SMALL * 1.5,
  },
});