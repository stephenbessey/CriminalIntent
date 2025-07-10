export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 32,
  XLARGE: 40,
};

export const ASPECT_RATIOS = {
  PHOTO: [4, 3],
};

export const STORAGE_KEYS = {
  CRIMES_DATA: 'crimes_data',
  SELECTED_THEME: 'selectedTheme',
};

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

export const OPACITY = {
  PRESSED: 0.7,
  DISABLED: 0.5,
  OVERLAY: 0.5,
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
};

export const BORDER_RADIUS = {
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
};

export const FONT_SIZES = {
  SMALL: 14,
  MEDIUM: 16,
  LARGE: 18,
  XLARGE: 24,
};

export const FONT_WEIGHTS = {
  NORMAL: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
};

export const COMPONENT_HEIGHTS = {
  INPUT: 48,
  BUTTON: 48,
  MULTILINE_INPUT: 100,
  PHOTO_PICKER: 120,
};

export const SHADOWS = {
  SMALL: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  MEDIUM: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  LARGE: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 16,
  },
};

export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_OUT: 'ease-out',
    EASE_IN: 'ease-in',
    EASE_IN_OUT: 'ease-in-out',
  },
};

export const ERROR_MESSAGES = {
  LOAD_CRIMES_FAILED: 'Unable to load crimes. Please try again.',
  SAVE_CRIME_FAILED: 'Unable to save crime. Please check your input and try again.',
  DELETE_CRIME_FAILED: 'Unable to delete crime. Please try again.',
  LOAD_CRIME_DETAILS_FAILED: 'Unable to load crime details. Please try again.',
  PERMISSION_REQUIRED: 'Permission Required',
  CAMERA_PERMISSION_MESSAGE: 'Please grant camera roll permissions to use this feature.',
  TITLE_REQUIRED: 'Please enter a title for the crime',
  THEME_SAVE_FAILED: 'Unable to save theme preference',
  THEME_LOAD_FAILED: 'Unable to load theme preference',
  VALIDATION_ERROR: 'Please correct the errors and try again',
  NETWORK_ERROR: 'Network connection error. Please check your connection.',
  STORAGE_ERROR: 'Storage error. Please try again.',
};

export const SUCCESS_MESSAGES = {
  CRIME_CREATED: 'Crime created successfully',
  CRIME_UPDATED: 'Crime updated successfully',
  CRIME_DELETED: 'Crime deleted successfully',
  THEME_CHANGED: 'Theme changed successfully',
  DATA_EXPORTED: 'Data exported successfully',
  DATA_IMPORTED: 'Data imported successfully',
};

export const PLACEHOLDERS = {
  CRIME_TITLE: 'Enter crime title',
  CRIME_DETAILS: 'What happened?',
  SEARCH_CRIMES: 'Search crimes...',
};

export const SCREENS = {
  INDEX: 'Index',
  DETAIL: 'Detail',
  SETTINGS: 'Settings',
};

export const HEADER_TITLES = {
  INDEX: 'Criminal Intent',
  DETAIL: 'Crime Details',
  SETTINGS: 'Settings',
};

export const VALIDATION_LIMITS = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DETAILS_MAX_LENGTH: 1000,
  PHOTO_MAX_SIZE_MB: 10,
};

export const LAYOUT = {
  HEADER_HEIGHT: 56,
  TAB_BAR_HEIGHT: 49,
  SAFE_AREA_PADDING: 20,
  MODAL_BORDER_RADIUS: 20,
};
