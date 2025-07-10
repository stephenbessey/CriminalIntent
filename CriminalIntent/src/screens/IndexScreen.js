import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderButton } from '../components/HeaderButton';
import { CrimeListItem } from '../components/CrimeListItem';
import { CrimeService } from '../services/CrimeService';
import { useTheme } from '../context/ThemeContext';
import { SCREENS, ERROR_MESSAGES } from '../constants';

export default function IndexScreen({ navigation }) {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      loadCrimes();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.colors.primary,
      },
      headerTintColor: '#FFFFFF',
      headerRight: () => (
        <View style={styles.headerButtons}>
          <HeaderButton
            icon="add"
            onPress={() => navigation.navigate(SCREENS.DETAIL, { crimeId: null })}
          />
          <HeaderButton
            icon="settings"
            onPress={() => navigation.navigate(SCREENS.SETTINGS)}
          />
        </View>
      ),
    });
  }, [navigation, currentTheme]);

  const loadCrimes = async () => {
    try {
      setLoading(true);
      const crimesData = await CrimeService.getAllCrimes();
      setCrimes(crimesData);
    } catch (error) {
      Alert.alert('Error', error.message || ERROR_MESSAGES.LOAD_CRIMES_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const handleCrimePress = (crime) => {
    navigation.navigate(SCREENS.DETAIL, { crimeId: crime.id });
  };

  const renderCrimeItem = ({ item }) => (
    <CrimeListItem
      crime={item}
      onPress={() => handleCrimePress(item)}
    />
  );

  const keyExtractor = (item) => item.id;

  const styles = createStyles(currentTheme);

  return (
    <View style={styles.container}>
      <FlatList
        data={crimes}
        renderItem={renderCrimeItem}
        keyExtractor={keyExtractor}
        refreshing={loading}
        onRefresh={loadCrimes}
        style={styles.list}
        contentContainerStyle={crimes.length === 0 ? styles.emptyList : null}
      />
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
  },
});