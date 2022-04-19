import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddItem from './AddItem';
import ItemResults from './ItemResults';

const Stack = createStackNavigator();

const Items: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ItemResults"
        component={ItemResults}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
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
  );
};

export default Items;
