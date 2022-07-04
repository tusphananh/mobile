import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {ItemMaybe} from '../../../constants/ItemsConstants';
import globalStyles from '../../globalStyles';
import Header from '../../Header/Header';
import AddItem from './AddItem';
import ItemResults from './ItemResults';

const Stack = createStackNavigator();

const Items: React.FC<{
  navigation: any;
  onConfirmPress?: (item: ItemMaybe) => void;
  showHeader?: boolean;
  confirmText?: string;
  confirmColor?: string;
}> = ({
  navigation,
  onConfirmPress,
  showHeader = true,
  confirmText,
  confirmColor,
}) => {
  return (
    <SafeAreaView style={globalStyles.fullWidthHeight}>
      {showHeader && <Header navigation={navigation} />}
      <Stack.Navigator>
        <Stack.Screen
          name="ItemResults"
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          children={() => (
            <ItemResults
              navigation={navigation}
              onConfirmPress={onConfirmPress}
              confirmText={confirmText}
              confirmColor={confirmColor}
            />
          )}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default Items;
