export const validateCrime = (crime) => {
  const errors = {};

  if (!crime.title || !crime.title.trim()) {
    errors.title = 'Title is required';
  } else if (crime.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  } else if (crime.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (crime.details && crime.details.length > 1000) {
    errors.details = 'Details must be less than 1000 characters';
  }

  if (!crime.date) {
    errors.date = 'Date is required';
  } else {
    const date = new Date(crime.date);
    if (isNaN(date.getTime())) {
      errors.date = 'Invalid date format';
    } else if (date > new Date()) {
      errors.date = 'Date cannot be in the future';
    }
  }

  if (crime.photo && !isValidUri(crime.photo)) {
    errors.photo = 'Invalid photo URI';
  }

  return errors;
};

const isValidUri = (uri) => {
  try {
    return uri.startsWith('file://') || 
           uri.startsWith('http://') || 
           uri.startsWith('https://') ||
           uri.startsWith('content://'); 
  } catch (error) {
    return false;
  }
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input.trim()
    .replace(/\s+/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
};

export const isValidTheme = (themeKey, availableThemes) => {
  return availableThemes.includes(themeKey);
};

export const getFirstErrorMessage = (errors) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) {
    return null;
  }
  
  const priorityOrder = ['title', 'date', 'details', 'photo'];
  
  for (const key of priorityOrder) {
    if (errors[key]) {
      return errors[key];
    }
  }
  
  return errors[errorKeys[0]];
};

export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0;
};