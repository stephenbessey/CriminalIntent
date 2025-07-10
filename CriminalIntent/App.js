import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { HeaderButton } from './src/components/HeaderButton';
import IndexScreen from './src/screens/IndexScreen';
import DetailScreen from './src/screens/DetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { SCREENS, HEADER_TITLES } from './src/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={SCREENS.INDEX}
              component={IndexScreen}
              options={({ navigation }) => ({
                title: HEADER_TITLES.INDEX,
                headerRight: () => (
                  <HeaderButton
                    icon="plus"
                    onPress={() => navigation.navigate(SCREENS.DETAIL, { crimeId: null })}
                  />
                ),
              })}
            />
            <Stack.Screen
              name={SCREENS.DETAIL}
              component={DetailScreen}
              options={{
                title: HEADER_TITLES.DETAIL,
              }}
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}