import React from 'react';
import { View, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';
import { 
  ICON_SIZES, 
  OPACITY, 
  ASPECT_RATIOS, 
  ERROR_MESSAGES,
  COMPONENT_HEIGHTS,
  BORDER_RADIUS 
} from '../constants';

export const PhotoPicker = ({ photo, onPhotoSelect }) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  const requestPermission = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          ERROR_MESSAGES.PERMISSION_REQUIRED,
          ERROR_MESSAGES.CAMERA_PERMISSION_MESSAGE,
          [{ text: 'OK' }]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting camera roll permission:', error);
      Alert.alert(
        'Error',
        'Unable to request permissions. Please check your settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: ASPECT_RATIOS.PHOTO,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        onPhotoSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(
        'Error',
        'Unable to select image. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={pickImage}
      accessibilityRole="button"
      accessibilityLabel={photo ? 'Change photo' : 'Add photo'}
    >
      {photo ? (
        <Image 
          source={{ uri: photo }} 
          style={styles.image}
          accessibilityLabel="Crime scene photo"
        />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="camera"
            size={ICON_SIZES.XLARGE}
            color={currentTheme.colors.textSecondary}
          />
        </View>
      )}
    </Pressable>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    width: COMPONENT_HEIGHTS.PHOTO_PICKER,
    height: COMPONENT_HEIGHTS.PHOTO_PICKER,
    borderRadius: BORDER_RADIUS.MEDIUM,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  pressed: {
    opacity: OPACITY.PRESSED,
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