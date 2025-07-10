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
  COMPONENT_HEIGHTS 
} from '../constants';

export const DatePicker = ({ date, onDateChange }) => {
  const { currentTheme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const styles = createStyles(currentTheme);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      onDateChange(selectedDate.toISOString());
    }
    setShowPicker(false);
  };

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.dateButton,
          pressed && styles.pressed
        ]}
        onPress={() => setShowPicker(true)}
        accessibilityRole="button"
        accessibilityLabel={`Select date, current: ${formatDateLong(date)}`}
      >
        <Text style={styles.dateText}>
          {formatDateLong(date)}
        </Text>
      </Pressable>

      {showPicker && (
        <Modal
          transparent
          visible={showPicker}
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={new Date(date)}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
              <CustomButton
                title="Cancel"
                onPress={() => setShowPicker(false)}
                variant="secondary"
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
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
  dateText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: theme.colors.text,
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});