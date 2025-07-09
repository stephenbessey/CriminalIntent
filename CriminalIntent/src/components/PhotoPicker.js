import React from 'react';
import { View, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';

export const PhotoPicker = ({ photo, onPhotoSelect }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to use this feature.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onPhotoSelect(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={pickImage}
    >
      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="camera"
            size={40}
            color={currentTheme.colors.textSecondary}
          />
        </View>
      )}
    </Pressable>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
});
