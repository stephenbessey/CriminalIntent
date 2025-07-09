import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const themes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#2196F3',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      textSecondary: '#666666',
      border: '#E0E0E0',
      accent: '#FF9800',
      success: '#4CAF50',
      error: '#F44336',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#1976D2',
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#BBBBBB',
      border: '#333333',
      accent: '#FF9800',
      success: '#4CAF50',
      error: '#F44336',
    },
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#00BCD4',
      background: '#E0F2F1',
      surface: '#FFFFFF',
      text: '#004D40',
      textSecondary: '#00695C',
      border: '#B2DFDB',
      accent: '#FF5722',
      success: '#4CAF50',
      error: '#F44336',
    },
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#FF5722',
      background: '#FFF3E0',
      surface: '#FFFFFF',
      text: '#BF360C',
      textSecondary: '#E64A19',
      border: '#FFCCBC',
      accent: '#FF9800',
      success: '#4CAF50',
      error: '#F44336',
    },
  },
  forest: {
    name: 'Forest',
    colors: {
      primary: '#4CAF50',
      background: '#E8F5E8',
      surface: '#FFFFFF',
      text: '#1B5E20',
      textSecondary: '#2E7D32',
      border: '#C8E6C9',
      accent: '#FF9800',
      success: '#4CAF50',
      error: '#F44336',
    },
  },
  midnight: {
    name: 'Midnight',
    colors: {
      primary: '#9C27B0',
      background: '#0D0D0D',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      border: '#333333',
      accent: '#E91E63',
      success: '#4CAF50',
      error: '#F44336',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(themes[savedTheme]);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const changeTheme = async (themeKey) => {
    try {
      await AsyncStorage.setItem('selectedTheme', themeKey);
      setCurrentTheme(themes[themeKey]);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
