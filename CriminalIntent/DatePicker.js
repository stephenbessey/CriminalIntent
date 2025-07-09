import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from './CustomButton';

export const DatePicker = ({ date, onDateChange }) => {
  const { currentTheme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const styles = createStyles(currentTheme);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
      >
        <Text style={styles.dateText}>
          {formatDate(date)}
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
