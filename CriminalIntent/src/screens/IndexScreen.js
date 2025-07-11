import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CustomButton } from '../components/CustomButton';
import { CrimeListItem } from '../components/CrimeListItem';
import { CrimeService } from '../services/CrimeService';
import { useTheme } from '../context/ThemeContext';
import { SCREENS, ERROR_MESSAGES, SPACING } from '../constants';

export default function IndexScreen({ navigation }) {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      loadCrimes();
    }, [])
  );

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

  const handleAddCrime = () => {
    navigation.navigate(SCREENS.DETAIL, { crimeId: null });
  };

  const handleSettings = () => {
    navigation.navigate(SCREENS.SETTINGS);
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
      <View style={styles.actionButtons}>
        <CustomButton
          title="Add Crime"
          onPress={handleAddCrime}
          variant="primary"
          style={styles.actionButton}
        />
        <CustomButton
          title="Settings"
          onPress={handleSettings}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>

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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.MD,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionButton: {
    flex: 0.48, 
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});