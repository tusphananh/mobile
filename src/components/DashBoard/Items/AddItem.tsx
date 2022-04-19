/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {InputListItem} from '../../../constants/InputListConstants';
import {useAuthContext} from '../../../contexts/authContext';
import {checkFloat} from '../../../utils/check';
import globalStyles from '../../globalStyles';
import InputList from '../../InputList/InputList';
import styles from './AddItemStyles';

const AddItem: React.FC<{navigation: any}> = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [realValue, setRealValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [inputListItems, setInputItems] = React.useState<InputListItem[]>([]);
  const [error, setError] = React.useState('');
  const {addItem} = useAuthContext();
  const add = () => {
    if (!name || !price || !realValue || !description) {
      setError('Please fill all fields');
    } else if (!checkFloat(price) || !checkFloat(realValue)) {
      setError('Price and Real Value must be number');
    } else {
      addItem(name, parseFloat(price), parseFloat(realValue), description);
      navigation.goBack();
    }
  };

  useEffect(() => {
    setInputItems([
      {
        placeholder: 'Name',
        value: name,
        onChangeText: text => setName(text),
      },
      {
        placeholder: 'Price',
        value: price,
        onChangeText: text => setPrice(text),
      },
      {
        placeholder: 'Real Value',
        value: realValue,
        onChangeText: text => setRealValue(text),
      },
      {
        placeholder: 'Description',
        value: description,
        onChangeText: text => setDescription(text),
      },
    ]);
  }, [name, price, realValue, description]);
  return (
    <View style={styles.container}>
      <View style={styles.backBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[globalStyles.subtitle, globalStyles.primaryColor]}>
            back
          </Text>
        </TouchableOpacity>
      </View>
      <InputList style={styles.input} items={inputListItems} />
      {error !== '' && <Text style={globalStyles.error}>{error}</Text>}
      <TouchableOpacity
        onPress={() => {
          add();
        }}
        style={[globalStyles.confirmBtn]}>
        <Text style={[globalStyles.confirmTxt]}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddItem;
