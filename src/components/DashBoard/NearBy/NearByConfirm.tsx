import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {InputListItem} from '../../../constants/InputListConstants';
import {ItemMaybe} from '../../../constants/ItemsConstants';
import {NearByItem, SearchResult} from '../../../constants/SearchConstants';
import {useSearchContext} from '../../../contexts/searchContext';
import Background from '../../Background/Background';
import globalStyles, {primaryColor} from '../../globalStyles';
import InputList from '../../InputList/InputList';
import uuid from 'react-native-uuid';
import {checkFloat} from '../../../utils/check';
import {useAuthContext} from '../../../contexts/authContext';
import {removeNearByItem} from '../../../actions/searchActions';
import Items from '../Items/Items';

export const NearByConfirm: React.FC<{
  navigation: any;
  nearbyItem?: NearByItem;
  pickedItem?: ItemMaybe;
}> = ({pickedItem, navigation, nearbyItem}) => {
  const [itemName, setItemName] = React.useState('');
  const [itemDescription, setItemDescription] = React.useState('');
  const [itemRealValue, setItemRealValue] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const {sendResult, searchState, searchDispatch} = useSearchContext();
  const {authState} = useAuthContext();

  useEffect(() => {
    if (pickedItem) {
      setItemName(pickedItem.name);
      setItemDescription(pickedItem.description);
      setItemRealValue(pickedItem.realValue.toString());
      setItemPrice(pickedItem.price.toString());
    }
  }, [pickedItem]);

  const inputList: InputListItem[] = [
    {
      placeholder: 'Name',
      value: itemName,
      onChangeText: (text: string) => setItemName(text),
    },
    {
      placeholder: 'Description',
      value: itemDescription,
      onChangeText: (text: string) => setItemDescription(text),
    },
    {
      placeholder: 'Real Value',
      value: itemRealValue,
      onChangeText: (text: string) => setItemRealValue(text),
    },
    {
      placeholder: 'Price',
      value: itemPrice,
      onChangeText: (text: string) => setItemPrice(text),
    },
  ];

  const confirm = () => {
    if (
      itemDescription &&
      itemName &&
      checkFloat(itemPrice) &&
      checkFloat(itemRealValue)
    ) {
      const item: ItemMaybe = {
        id: uuid.v4().toString(),
        name: itemName,
        price: parseFloat(itemPrice),
        description: itemDescription,
        realValue: parseFloat(itemRealValue),
      };

      const result: SearchResult = {
        id: uuid.v4().toString(),
        searchId: nearbyItem!.id,
        name: nearbyItem!.name,
        distance: nearbyItem!.distance,
        duration: nearbyItem!.duration,
        itemName: item.name,
        itemPrice: item.price,
        itemRealValue: item.realValue,
        itemDescription: item.description,
        totalPrice: nearbyItem!.duration * item.price,
        provider: authState.user!,
        providerPosition: searchState.curPos!,
      };

      sendResult(result);
      searchDispatch(removeNearByItem(nearbyItem!.id));
      navigation.goBack();
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[globalStyles.backBtn]}>back</Text>
        </TouchableOpacity>
        <Text
          style={[
            globalStyles.centerHorizontal,
            globalStyles.mt20,
            globalStyles.h4,
            globalStyles.bold,
          ]}>
          Confirm
        </Text>
        <View
          style={[
            globalStyles.mt20,
            globalStyles.fullWidthHeight,
            globalStyles.flexColCenterHorizontal,
          ]}>
          <InputList items={inputList} />
          <TouchableOpacity
            style={[globalStyles.mt20]}
            onPress={() => {
              navigation.navigate('ItemPicker');
            }}>
            <Text style={[globalStyles.primaryColor]}>Choose item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.confirmBtn, globalStyles.mt20]}
            onPress={() => {
              confirm();
            }}>
            <Text style={[globalStyles.primaryColor, globalStyles.bold]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export const ItemPicker: React.FC<{
  pickItem: (item: ItemMaybe) => void;
  navigation: any;
}> = ({navigation, pickItem}) => {
  const confirm = (item: ItemMaybe) => {
    pickItem(item);
    navigation.goBack();
  };
  return (
    <Background>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[globalStyles.backBtn]}>back</Text>
        </TouchableOpacity>
        <Text
          style={[
            globalStyles.centerHorizontal,
            globalStyles.mt20,
            globalStyles.h4,
            globalStyles.bold,
          ]}>
          Choose your item
        </Text>
        <Items
          navigation={navigation}
          showHeader={false}
          onConfirmPress={confirm}
          confirmText="Confirm"
          confirmColor={primaryColor}
        />
      </SafeAreaView>
    </Background>
  );
};
