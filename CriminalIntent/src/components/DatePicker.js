import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from './CustomButton';
import { formatDateLong } from '../utils/dateUtils';
import { 
  OPACITY, 
  SPACING, 
  BORDER_RADIUS, 
  FONT_SIZES,
  COMPONENT_HEIGHTS,
  SHADOWS 
} from '../constants';

export const DatePicker = ({ date, onDateChange, maxDate = new Date(), disabled = false }) => {
  const { currentTheme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const styles = createStyles(currentTheme);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      onDateChange(selectedDate.toISOString());
    }
    setShowPicker(false);
  };

  const openPicker = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.dateButton,
          pressed && !disabled && styles.pressed,
          disabled && styles.disabled
        ]}
        onPress={openPicker}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`Select date, current: ${formatDateLong(date)}`}
        accessibilityState={{ disabled }}
      >
        <Text style={[styles.dateText, disabled && styles.disabledText]}>
          {formatDateLong(date)}
        </Text>
      </Pressable>

      {showPicker && (
        <DatePickerModal
          date={date}
          maxDate={maxDate}
          onDateChange={handleDateChange}
          onCancel={() => setShowPicker(false)}
          theme={currentTheme}
        />
      )}
    </View>
  );
};

const DatePickerModal = ({ date, maxDate, onDateChange, onCancel, theme }) => {
  const styles = createStyles(theme);
  
  return (
    <Modal
      transparent
      visible={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Date</Text>
          
          <DateTimePicker
            value={new Date(date)}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={maxDate}
          />
          
          <View style={styles.modalButtons}>
            <CustomButton
              title="Cancel"
              onPress={onCancel}
              variant="secondary"
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme) => StyleSheet.create({
  dateButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: BORDER_RADIUS.MEDIUM,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM + SPACING.XS / 2,
    minHeight: COMPONENT_HEIGHTS.INPUT,
    justifyContent: 'center',
  },
  pressed: {
    opacity: OPACITY.PRESSED,
  },
  disabled: {
    opacity: OPACITY.DISABLED,
    backgroundColor: theme.colors.background,
  },
  dateText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: theme.colors.text,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0, 0, 0, ${OPACITY.OVERLAY})`,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: BORDER_RADIUS.LARGE,
    padding: SPACING.LG,
    alignItems: 'center',
    minWidth: 280,
    ...SHADOWS.MEDIUM,
  },
  modalTitle: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: SPACING.MD,
  },
  modalButtons: {
    marginTop: SPACING.MD,
    width: '100%',
  },
  modalButton: {
    marginHorizontal: SPACING.SM,
  },
});
