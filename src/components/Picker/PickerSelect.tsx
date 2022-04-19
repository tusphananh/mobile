/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {PickerItems} from '../../constants/PickerConstant';
import {primaryColor} from '../globalStyles';
import styles from './PickerSelectStyles';

const PickerSelect: React.FC<{
  items: PickerItems[];
  onDonePress: React.Dispatch<React.SetStateAction<any>>;
  defaultValue: PickerItems;
}> = ({items, onDonePress, defaultValue}) => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        value={value}
        onValueChange={e => {
          setValue(e);
        }}
        onDonePress={() => {
          onDonePress(value);
        }}
        items={items}
        placeholder={defaultValue}
        style={{
          inputAndroid: {
            color: primaryColor,
            fontWeight: 'normal',
          },
          inputIOS: {
            color: primaryColor,
            fontWeight: 'normal',
          },
          placeholder: {
            color: primaryColor,
            fontWeight: 'normal',
          },
        }}
      />
    </View>
  );
};

export default PickerSelect;
