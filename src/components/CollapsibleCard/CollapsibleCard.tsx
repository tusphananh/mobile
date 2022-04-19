/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {CollapsibleCardContent} from '../../constants/CollapsibleCard';
import globalStyles, {txtColor} from '../globalStyles';
import styles from './CollapsibleCardStyles';

const CollapsibleCard: React.FC<{
  children?: React.ReactNode;
  color?: string;
  header: CollapsibleCardContent[];
  content: CollapsibleCardContent[];
}> = ({children, color, header, content}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [colorStyle] = React.useState(
    color ? {color: color} : {color: txtColor},
  );
  return (
    <TouchableOpacity
      style={[globalStyles.flexColumn, styles.collapsContainer]}
      onPress={() => setIsCollapsed(!isCollapsed)}>
      {header.map((item, index) => (
        <View key={item.title + index} style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>{item.title}</Text>
          <Text style={[colorStyle, styles.text]}>{item.content}</Text>
        </View>
      ))}
      <Collapsible collapsed={isCollapsed}>
        {content.map((item, index) => (
          <View key={item.title + index} style={[globalStyles.collapsItem]}>
            <Text style={[colorStyle, styles.title]}>{item.title}</Text>
            <Text style={[colorStyle, styles.text]}>{item.content}</Text>
          </View>
        ))}
        {children}
      </Collapsible>
    </TouchableOpacity>
  );
};

export default CollapsibleCard;
