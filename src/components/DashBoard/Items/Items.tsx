/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import styles from './ItemsStyles';

const Items: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
};

export default Items;
