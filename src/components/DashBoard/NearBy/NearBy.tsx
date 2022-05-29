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
import {NearByItem} from '../../../constants/SearchConstants';
import {useSearchContext} from '../../../contexts/searchContext';
import Background from '../../Background/Background';
import CollapsibleCard from '../../CollapsibleCard/CollapsibleCard';
import globalStyles from '../../globalStyles';
import Header from '../../Header/Header';
import styles from './NearByStyles';

const Stack = createStackNavigator();

const NearByConfirm: React.FC<{
  item?: NearByItem;
}> = ({item}) => {
  return (
    <Background>
      <SafeAreaView style={globalStyles.fullWidthHeight}>
        <Text>{item?.name}</Text>
      </SafeAreaView>
    </Background>
  );
};
const NearByResults: React.FC<{
  items?: NearByItem[];
  setSelectedItem: (item: NearByItem) => void;
  navigation: any;
}> = ({items, setSelectedItem, navigation}) => {
  const {searchDispatch} = useSearchContext();
  return (
    <Background>
      <SafeAreaView style={globalStyles.fullWidthHeight}>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={globalStyles.fullWidth}>
          {items?.map((item: NearByItem) => (
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
                    setSelectedItem(item);
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
  const {searchState} = useSearchContext();
  const [selectedItem, setSelectedItem] = React.useState<
    NearByItem | undefined
  >(undefined);

  return (
    <Stack.Navigator>
      {!selectedItem ? (
        <Stack.Screen
          name="NearByResults"
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          children={() => (
            <NearByResults
              navigation={navigation}
              setSelectedItem={setSelectedItem}
              items={searchState.nearByItems}
            />
          )}
        />
      ) : (
        <Stack.Screen
          name="NearByConfirm"
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          children={() => <NearByConfirm item={selectedItem} />}
        />
      )}
    </Stack.Navigator>
  );
};

export default NearBy;
