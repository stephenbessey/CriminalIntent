import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const useThemedHeader = (navigation, title, headerRight = null) => {
  const { currentTheme } = useTheme();
  
  useEffect(() => {
    navigation.setOptions({
      title,
      headerStyle: {
        backgroundColor: currentTheme.colors.primary,
      },
      headerTintColor: '#FFFFFF',
      headerRight,
    });
  }, [navigation, currentTheme, title, headerRight]);
};
