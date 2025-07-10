import { VALIDATION_LIMITS } from '../constants';

export const validateCrime = (crime) => {
  const errors = {};

  const titleErrors = validateTitle(crime.title);
  if (titleErrors.length > 0) {
    errors.title = titleErrors[0];
  }

  const detailsErrors = validateDetails(crime.details);
  if (detailsErrors.length > 0) {
    errors.details = detailsErrors[0];
  }

  const dateErrors = validateDate(crime.date);
  if (dateErrors.length > 0) {
    errors.date = dateErrors[0];
  }

  const photoErrors = validatePhoto(crime.photo);
  if (photoErrors.length > 0) {
    errors.photo = photoErrors[0];
  }

  return errors;
};

const validateTitle = (title) => {
  const errors = [];
  
  if (!title || !title.trim()) {
    errors.push('Title is required');
  } else {
    const trimmedTitle = title.trim();
    
    if (trimmedTitle.length < VALIDATION_LIMITS.TITLE_MIN_LENGTH) {
      errors.push(`Title must be at least ${VALIDATION_LIMITS.TITLE_MIN_LENGTH} characters long`);
    }
    
    if (trimmedTitle.length > VALIDATION_LIMITS.TITLE_MAX_LENGTH) {
      errors.push(`Title must be less than ${VALIDATION_LIMITS.TITLE_MAX_LENGTH} characters`);
    }
    
    if (!/^[a-zA-Z0-9\s\-_.,!?'"]+$/.test(trimmedTitle)) {
      errors.push('Title contains invalid characters');
    }
  }
  
  return errors;
};

const validateDetails = (details) => {
  const errors = [];
  
  if (details && details.length > VALIDATION_LIMITS.DETAILS_MAX_LENGTH) {
    errors.push(`Details must be less than ${VALIDATION_LIMITS.DETAILS_MAX_LENGTH} characters`);
  }
  
  return errors;
};

const validateDate = (date) => {
  const errors = [];
  
  if (!date) {
    errors.push('Date is required');
    return errors;
  }
  
  const dateObj = new Date(date);
  const now = new Date();
  
  if (isNaN(dateObj.getTime())) {
    errors.push('Invalid date format');
  } else if (dateObj > now) {
    errors.push('Date cannot be in the future');
  } else if (dateObj < new Date('1900-01-01')) {
    errors.push('Date cannot be before 1900');
  }
  
  return errors;
};

const validatePhoto = (photo) => {
  const errors = [];
  
  if (photo && !isValidUri(photo)) {
    errors.push('Invalid photo URI');
  }
  
  return errors;
};

const isValidUri = (uri) => {
  try {
    const validPrefixes = [
      'file://',
      'http://',
      'https://',
      'content://',
      'data:image/',
    ];
    
    return validPrefixes.some(prefix => uri.startsWith(prefix));
  } catch (error) {
    console.error('Error validating URI:', error);
    return false;
  }
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[^\x20-\x7E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F]/g, '');
};

export const sanitizeTitle = (title) => {
  const sanitized = sanitizeInput(title);
  
  return sanitized
    .replace(/[<>]/g, '') 
    .slice(0, VALIDATION_LIMITS.TITLE_MAX_LENGTH);
};

export const sanitizeDetails = (details) => {
  const sanitized = sanitizeInput(details);
  
  return sanitized.slice(0, VALIDATION_LIMITS.DETAILS_MAX_LENGTH);
};

export const isValidTheme = (themeKey, availableThemes) => {
  return Array.isArray(availableThemes) && availableThemes.includes(themeKey);
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

export const getAllErrorMessages = (errors) => {
  return Object.values(errors);
};

export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value, minLength, maxLength, fieldName) => {
  if (typeof value !== 'string') {
    return `${fieldName} must be a string`;
  }
  
  const trimmedValue = value.trim();
  
  if (minLength && trimmedValue.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  
  if (maxLength && trimmedValue.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  
  return null;
};
