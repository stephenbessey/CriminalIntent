import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderButton } from '../components/HeaderButton';
import { CrimeListItem } from '../components/CrimeListItem';
import { useThemedHeader } from '../hooks/useThemedHeader';
import { useCrimesLoader } from '../hooks/useCrimesLoader';
import { useTheme } from '../context/ThemeContext';
import { SCREENS } from '../constants';

export default function IndexScreen({ navigation }) {
  const { currentTheme } = useTheme();
  const { crimes, loading, loadCrimes } = useCrimesLoader();

  useFocusEffect(
    React.useCallback(() => {
      loadCrimes();
    }, [loadCrimes])
  );

  useThemedHeader(
    navigation,
    'Criminal Intent',
    () => (
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
    )
  );

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
