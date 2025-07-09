import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderButton } from '../components/HeaderButton';
import { CrimeListItem } from '../components/CrimeListItem';
import { CrimeService } from '../services/CrimeService';
import { useTheme } from '../context/ThemeContext';

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
            onPress={() => navigation.navigate('Detail', { crimeId: null })}
          />
          <HeaderButton
            icon="settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      ),
    });
  }, [navigation, currentTheme]);

  const loadCrimes = async () => {
    try {
      setLoading(true);
      const crimesData = await CrimeService.getAllCrimes();
      setCrimes(crimesData.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      Alert.alert('Error', 'Failed to load crimes');
    } finally {
      setLoading(false);
    }
  };

  const handleCrimePress = (crime) => {
    navigation.navigate('Detail', { crimeId: crime.id });
  };

  const renderCrimeItem = ({ item }) => (
    <CrimeListItem
      crime={item}
      onPress={() => handleCrimePress(item)}
    />
  );

  const styles = createStyles(currentTheme);

  return (
    <View style={styles.container}>
      <FlatList
        data={crimes}
        renderItem={renderCrimeItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={loadCrimes}
        style={styles.list}
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
  headerButtons: {
    flexDirection: 'row',
  },
});
