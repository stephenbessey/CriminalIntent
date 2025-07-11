import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { CustomHeader } from './src/components/CustomHeader';
import IndexScreen from './src/screens/IndexScreen';
import DetailScreen from './src/screens/DetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { SCREENS, HEADER_TITLES } from './src/constants';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { currentTheme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: currentTheme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name={SCREENS.INDEX}
          component={IndexScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <CustomHeader
                title={HEADER_TITLES.INDEX}
                icons={[
                  {
                    name: 'add',
                    onPress: () => navigation.navigate(SCREENS.DETAIL, { crimeId: null }),
                  },
                  {
                    name: 'settings',
                    onPress: () => navigation.navigate(SCREENS.SETTINGS),
                  },
                ]}
              />
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.DETAIL}
          component={DetailScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <CustomHeader
                title={HEADER_TITLES.DETAIL}
                icons={[
                  {
                    name: 'settings',
                    onPress: () => navigation.navigate(SCREENS.SETTINGS),
                  },
                ]}
              />
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.SETTINGS}
          component={SettingsScreen}
          options={{
            title: HEADER_TITLES.SETTINGS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </ErrorBoundary>
  );
}