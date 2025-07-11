import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { ICON_SIZES } from '../constants';

export const HandcuffsIcon = ({ 
  size = ICON_SIZES.MEDIUM, 
  color = null,
  style = {},
  accessibilityLabel = 'Handcuffs icon'
}) => {
  const { currentTheme } = useTheme();
  
  const iconColor = color || currentTheme.colors.primary;
  
  const styles = createStyles(size);

  return (
    <View 
      style={[styles.container, style]}
      accessibilityLabel={accessibilityLabel}
      accessible={true}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
      >
        <Circle
          cx="25"
          cy="35"
          r="18"
          stroke={iconColor}
          strokeWidth="4"
          fill="none"
        />
        
        <Circle
          cx="75"
          cy="35"
          r="18"
          stroke={iconColor}
          strokeWidth="4"
          fill="none"
        />
        
        <Path
          d="M 43 35 L 47 35 Q 50 32 50 35 Q 50 38 47 35 Z"
          stroke={iconColor}
          strokeWidth="2.5"
          fill="none"
        />
        
        <Path
          d="M 53 35 L 57 35 Q 60 32 60 35 Q 60 38 57 35 Z"
          stroke={iconColor}
          strokeWidth="2.5"
          fill="none"
        />
        
        <Path
          d="M 20 50 L 30 50 L 32 55 L 28 60 L 22 60 L 18 55 Z"
          stroke={iconColor}
          strokeWidth="2"
          fill={iconColor}
          fillOpacity="0.2"
        />
        
        <Path
          d="M 70 50 L 80 50 L 82 55 L 78 60 L 72 60 L 68 55 Z"
          stroke={iconColor}
          strokeWidth="2"
          fill={iconColor}
          fillOpacity="0.2"
        />
        
        <Circle
          cx="25"
          cy="55"
          r="1.5"
          fill={iconColor}
        />
        
        <Circle
          cx="75"
          cy="55"
          r="1.5"
          fill={iconColor}
        />
        
        <Circle
          cx="50"
          cy="33"
          r="1"
          fill={iconColor}
        />
        
        <Circle
          cx="50"
          cy="37"
          r="1"
          fill={iconColor}
        />
      </Svg>
    </View>
  );
};

const createStyles = (size) => StyleSheet.create({
  container: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HandcuffsIcon;