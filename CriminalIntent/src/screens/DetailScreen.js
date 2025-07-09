import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  Text,
  Switch 
} from 'react-native';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { DatePicker } from '../components/DatePicker';
import { PhotoPicker } from '../components/PhotoPicker';
import { CrimeService } from '../services/CrimeService';
import { useTheme } from '../context/ThemeContext';

export default function DetailScreen({ route, navigation }) {
  const { crimeId } = route.params || {};
  const { currentTheme } = useTheme();
  const [crime, setCrime] = useState({
    title: '',
    details: '',
    date: new Date().toISOString(),
    solved: false,
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.colors.primary,
      },
      headerTintColor: '#FFFFFF',
      headerRight: () => (
        <HeaderButton
          icon="settings"
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    });

    if (crimeId) {
      loadCrime();
    }
  }, [navigation, currentTheme, crimeId]);

  const loadCrime = async () => {
    try {
      setLoading(true);
      const crimeData = await CrimeService.getCrimeById(crimeId);
      if (crimeData) {
        setCrime(crimeData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load crime details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!crime.title.trim()) {
      Alert.alert('Error', 'Please enter a title for the crime');
      return;
    }

    try {
      setSaving(true);
      const savedCrime = await CrimeService.saveCrime({
        ...crime,
        id: crimeId,
      });
      
      Alert.alert(
        'Success',
        crimeId ? 'Crime updated successfully' : 'Crime created successfully',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save crime');
    } finally {
      setSaving(false);
    }
  };

  const updateCrime = (field, value) => {
    setCrime(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const styles = createStyles(currentTheme);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.photoSection}>
        <PhotoPicker
          photo={crime.photo}
          onPhotoSelect={(uri) => updateCrime('photo', uri)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <CustomTextInput
          value={crime.title}
          onChangeText={(text) => updateCrime('title', text)}
          placeholder="Enter crime title"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Details</Text>
        <CustomTextInput
          value={crime.details}
          onChangeText={(text) => updateCrime('details', text)}
          placeholder="What happened?"
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <DatePicker
          date={crime.date}
          onDateChange={(date) => updateCrime('date', date)}
        />
      </View>

      <View style={styles.switchSection}>
        <Text style={styles.label}>Solved</Text>
        <Switch
          value={crime.solved}
          onValueChange={(value) => updateCrime('solved', value)}
          trackColor={{ 
            false: currentTheme.colors.border, 
            true: currentTheme.colors.success 
          }}
          thumbColor={crime.solved ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <View style={styles.buttonSection}>
        <CustomButton
          title={saving ? 'Saving...' : 'Save'}
          onPress={handleSave}
          disabled={saving}
          variant="success"
        />
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
  photoSection: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  switchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  buttonSection: {
    marginTop: 20,
    marginBottom: 40,
  },
});
