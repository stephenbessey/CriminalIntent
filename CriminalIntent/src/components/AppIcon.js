import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandcuffsIcon } from './HandcuffsIcon';
import { useTheme } from '../context/ThemeContext';
import { ICON_SIZES, BORDER_RADIUS } from '../constants';

export const AppIcon = ({ 
  size = ICON_SIZES.XLARGE * 2, 
  showBackground = true,
  backgroundColor = null,
  iconColor = null,
  style = {},
  borderRadius = BORDER_RADIUS.LARGE,
  accessibilityLabel = 'Criminal Intent app icon'
}) => {
  const { currentTheme } = useTheme();
  
  const iconSize = size * 0.6;
  
  const bgColor = backgroundColor || currentTheme.colors.primary;
  const iconTintColor = iconColor || (showBackground ? '#FFFFFF' : currentTheme.colors.primary);
  
  const styles = createStyles(size, bgColor, borderRadius, showBackground);

  return (
    <View 
      style={[styles.container, style]}
      accessibilityLabel={accessibilityLabel}
      accessible={true}
    >
      <HandcuffsIcon
        size={iconSize}
        color={iconTintColor}
        accessibilityLabel=""
      />
    </View>
  );
};


const createStyles = (size, backgroundColor, borderRadius, showBackground) => StyleSheet.create({
  container: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: showBackground ? backgroundColor : 'transparent',
    borderRadius: borderRadius,
    ...(showBackground && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }),
  },
});


export const AppIconPresets = {

  splash: {
    size: ICON_SIZES.XLARGE * 3,
    showBackground: true,
    borderRadius: BORDER_RADIUS.LARGE * 2,
  },
  
  header: {
    size: ICON_SIZES.XLARGE,
    showBackground: true,
    borderRadius: BORDER_RADIUS.MEDIUM,
  },
  
  inline: {
    size: ICON_SIZES.LARGE,
    showBackground: false,
  },
  
  appStore: {
    size: 512, 
    showBackground: true,
    borderRadius: BORDER_RADIUS.LARGE * 3,
  },
};

export const SplashIcon = (props) => (
  <AppIcon {...AppIconPresets.splash} {...props} />
);

export const HeaderIcon = (props) => (
  <AppIcon {...AppIconPresets.header} {...props} />
);

export const InlineIcon = (props) => (
  <AppIcon {...AppIconPresets.inline} {...props} />
);

export const AppStoreIcon = (props) => (
  <AppIcon {...AppIconPresets.appStore} {...props} />
);

export default AppIcon;