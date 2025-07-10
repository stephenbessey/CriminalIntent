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
  BORDER_RADIUS,
  VALIDATION_LIMITS 
} from '../constants';

export const PhotoPicker = ({ photo, onPhotoSelect, disabled = false }) => {
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

  const validateImageSize = (asset) => {
    if (asset.fileSize) {
      const sizeInMB = asset.fileSize / (1024 * 1024);
      if (sizeInMB > VALIDATION_LIMITS.PHOTO_MAX_SIZE_MB) {
        Alert.alert(
          'File Too Large',
          `Please select an image smaller than ${VALIDATION_LIMITS.PHOTO_MAX_SIZE_MB}MB`,
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    if (disabled) return;
    
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: ASPECT_RATIOS.PHOTO,
        quality: 0.8, // Reduce quality to manage file size
        exif: false, // Remove EXIF data for privacy
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        
        if (validateImageSize(asset)) {
          onPhotoSelect(asset.uri);
        }
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

  const takePhoto = async () => {
    if (disabled) return;
    
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          ERROR_MESSAGES.PERMISSION_REQUIRED,
          'Please grant camera permissions to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: ASPECT_RATIOS.PHOTO,
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        
        if (validateImageSize(asset)) {
          onPhotoSelect(asset.uri);
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        'Error',
        'Unable to take photo. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const showImageOptions = () => {
    if (disabled) return;
    
    Alert.alert(
      'Select Photo',
      'Choose how you would like to add a photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled
      ]}
      onPress={showImageOptions}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={photo ? 'Change photo' : 'Add photo'}
      accessibilityState={{ disabled }}
    >
      {photo ? (
        <PhotoDisplay photo={photo} />
      ) : (
        <PhotoPlaceholder currentTheme={currentTheme} disabled={disabled} />
      )}
    </Pressable>
  );
};

const PhotoDisplay = ({ photo }) => {
  return (
    <Image 
      source={{ uri: photo }} 
      style={styles.image}
      accessibilityLabel="Crime scene photo"
      resizeMode="cover"
    />
  );
};

const PhotoPlaceholder = ({ currentTheme, disabled }) => {
  const styles = createStyles(currentTheme);
  
  return (
    <View style={styles.placeholder}>
      <Ionicons
        name="camera"
        size={ICON_SIZES.XLARGE}
        color={disabled ? currentTheme.colors.border : currentTheme.colors.textSecondary}
      />
    </View>
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
  disabled: {
    opacity: OPACITY.DISABLED,
    borderColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
});
