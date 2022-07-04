/* eslint-disable react-native/no-inline-styles */
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FilterType,
  ItemMaybe,
  SortType,
} from '../../../constants/ItemsConstants';
import {PickerItems} from '../../../constants/PickerConstant';
import {useAuthContext} from '../../../contexts/authContext';
import {filterItem} from '../../../utils/filter';
import CollapsibleCard from '../../CollapsibleCard/CollapsibleCard';
import globalStyles, {failedColor, placeHolderColor} from '../../globalStyles';
import PickerSelect from '../../Picker/PickerSelect';
import styles from './ItemsStyles';

const ItemResults: React.FC<{
  navigation: any;
  onConfirmPress?: (item: ItemMaybe) => void;
  confirmText?: string;
  confirmColor?: string;
}> = ({navigation, onConfirmPress, confirmText, confirmColor}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const {authState} = useAuthContext();
  const [filteredItems, setFilteredItems] = React.useState<ItemMaybe[]>(
    authState.user!.items,
  );
  const [filterType, setFilterType] = React.useState<FilterType>(
    FilterType.NAME,
  );
  const [sortType, setSortType] = React.useState<SortType>(SortType.ASC);

  useEffect(() => {
    if (searchValue.trim() === '') {
      const filteredByInput = authState.user!.items;
      setFilteredItems(filterItem(filteredByInput, filterType, sortType));
    } else {
      const result = authState.user!.items.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredItems(filterItem(result, filterType, sortType));
    }
  }, [authState.user, searchValue, filterType, sortType]);

  return (
    <View style={styles.container}>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <View style={[globalStyles.flexRowSpaceBetween, {width: '90%'}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('AddItem');
          }}>
          <Text style={styles.addItemTxt}>Add</Text>
        </TouchableOpacity>
        <ItemFilter setFilterType={setFilterType} setSortType={setSortType} />
      </View>
      <ItemResultContainer
        onConfirmPress={onConfirmPress}
        confirmText={confirmText}
        confirmColor={confirmColor}
        items={filteredItems}
      />
    </View>
  );
};

export const SearchBar: React.FC<{
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({searchValue, setSearchValue}) => {
  return (
    <View style={[globalStyles.textInput, styles.searchContainer]}>
      <FontAwesomeIcon
        style={[styles.searchIcon]}
        color={placeHolderColor}
        icon={faMagnifyingGlass}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor={placeHolderColor}
        style={[styles.searchBar]}
        value={searchValue}
        onChangeText={text => {
          setSearchValue(text);
        }}
      />
    </View>
  );
};

export const ItemFilter: React.FC<{
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
}> = ({setFilterType, setSortType}) => {
  const [items] = useState<PickerItems[]>([
    {label: 'Price', value: FilterType.PRICE},
    {label: 'Real Value', value: FilterType.REAL_VALUE},
  ]);
  const [sortItem] = useState<PickerItems[]>([
    {label: 'Desc', value: SortType.DESC},
  ]);
  const [defaultFilterItem] = useState<PickerItems>({
    label: 'Name',
    value: FilterType.NAME,
  });
  const [defaultSortItem] = useState<PickerItems>({
    label: 'Asc',
    value: SortType.ASC,
  });

  return (
    <View style={[globalStyles.flexRowCenter]}>
      <PickerSelect
        defaultValue={defaultFilterItem}
        onDonePress={setFilterType}
        items={items}
      />
      <PickerSelect
        defaultValue={defaultSortItem}
        onDonePress={setSortType}
        items={sortItem}
      />
    </View>
  );
};

export const ItemResultContainer: React.FC<{
  items: ItemMaybe[];
  onConfirmPress?: (item: ItemMaybe) => void;
  confirmText?: string;
  confirmColor?: string;
}> = ({items, onConfirmPress, confirmText, confirmColor}) => {
  const {deleteItem} = useAuthContext();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.itemResultContainer}>
      {items.map(item => {
        const header = [{title: 'Name', content: item.name}];
        const content = [
          {title: 'Description', content: item.description},
          {title: 'Price', content: item.price + ' $/h'},
          {title: 'Real Value', content: item.realValue + ' $'},
        ];
        return (
          <CollapsibleCard key={item.id} header={header} content={content}>
            <TouchableOpacity
              style={globalStyles.confirmBtn}
              onPress={() => {
                onConfirmPress
                  ? onConfirmPress(item)
                  : deleteItem(parseInt(item.id, 10));
              }}>
              <Text
                style={[
                  globalStyles.cancelTxt,
                  {color: confirmColor || failedColor},
                ]}>
                {confirmText || 'Delete'}
              </Text>
            </TouchableOpacity>
          </CollapsibleCard>
        );
      })}
    </ScrollView>
  );
};

export default ItemResults;
