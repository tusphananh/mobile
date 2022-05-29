import {BlurView} from '@react-native-community/blur';
import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import styles from './CustomTabBarStyles';
const CustomTabBar: React.FC<{props: BottomTabBarProps}> = ({props}) => {
  return (
    <BlurView
      style={styles.container}
      blurType="dark"
      blurAmount={10}
      blurRadius={10}
      overlayColor="transparent">
      <BottomTabBar {...props} />
    </BlurView>
  );
};

export default CustomTabBar;
