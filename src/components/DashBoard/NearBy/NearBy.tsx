/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {removeNearByItem} from '../../../actions/searchActions';
import {ItemMaybe} from '../../../constants/ItemsConstants';
import {NearByItem} from '../../../constants/SearchConstants';
import {useSearchContext} from '../../../contexts/searchContext';
import Background from '../../Background/Background';
import CollapsibleCard from '../../CollapsibleCard/CollapsibleCard';
import globalStyles from '../../globalStyles';
import Header from '../../Header/Header';
import {NearByConfirm, ItemPicker} from './NearByConfirm';
import styles from './NearByStyles';

const Stack = createStackNavigator();

const NearByResults: React.FC<{
  setNearByItem: (item: NearByItem) => void;
  navigation: any;
}> = ({setNearByItem, navigation}) => {
  const {searchDispatch, searchState} = useSearchContext();
  return (
    <Background>
      <SafeAreaView style={globalStyles.fullWidthHeight}>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={globalStyles.fullWidth}>
          {searchState.nearByItems?.map((item: NearByItem) => (
            <CollapsibleCard
              style={styles.card}
              key={item.id}
              header={[{title: 'Name', content: item.name}]}
              content={[
                {title: 'Distance', content: item.distance.toString() + ' km'},
                {
                  title: 'Route Duration',
                  content: item.route_duration + ' sec',
                },
                {
                  title: 'Rent Duration',
                  content: item.duration.toString() + ' h',
                },
              ]}>
              <View style={globalStyles.flexRowSpaceBetween}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    searchDispatch(removeNearByItem(item.id));
                  }}>
                  <Text style={[globalStyles.cancelTxt]}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={(globalStyles.confirmBtn, styles.btn)}
                  onPress={() => {
                    setNearByItem(item);
                    navigation.navigate('NearByConfirm');
                  }}>
                  <Text style={[globalStyles.confirmTxt]}>Approve</Text>
                </TouchableOpacity>
              </View>
            </CollapsibleCard>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};
const NearBy: React.FC<{navigation: any}> = ({navigation}) => {
  const [nearByItem, setNearByItem] = React.useState<NearByItem>();
  const [pickedItem, setPickedItem] = React.useState<ItemMaybe>();
  const pickItem = (item: ItemMaybe) => {
    setPickedItem(item);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NearByResults"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        children={() => (
          <NearByResults
            navigation={navigation}
            setNearByItem={setNearByItem}
          />
        )}
      />
      <Stack.Screen
        name="NearByConfirm"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        children={() => (
          <NearByConfirm
            pickedItem={pickedItem}
            navigation={navigation}
            nearbyItem={nearByItem}
          />
        )}
      />
      <Stack.Screen
        name="ItemPicker"
        children={() => (
          <ItemPicker pickItem={pickItem} navigation={navigation} />
        )}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
};

export default NearBy;
