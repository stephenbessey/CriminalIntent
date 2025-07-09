import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';

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
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  themeList: {
    gap: 16,
  },
  themeButton: {
    marginBottom: 8,
  },
});
