/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {StyleProp, TextInput, TextStyle} from 'react-native';
import {InputListItem} from '../../constants/InputListConstants';
import globalStyles, {placeHolderColor} from '../globalStyles';

const InputList: React.FC<{
  items: InputListItem[];
  style?: StyleProp<TextStyle>[] | StyleProp<TextStyle>;
}> = ({items, style}) => {
  return (
    <Fragment>
      {items.map(item => {
        return (
          <TextInput
            // If style is an array, we need to spread it out
            style={[
              globalStyles.textInput,
              Array.isArray(style) ? [...style] : style,
            ]}
            placeholder={item.placeholder}
            placeholderTextColor={item.placeholderTextColor || placeHolderColor}
            value={item.value}
            onChangeText={item.onChangeText}
            key={item.placeholder + '-input'}
          />
        );
      })}
    </Fragment>
  );
};

export default InputList;
