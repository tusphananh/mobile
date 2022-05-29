import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Background from '../../Background/Background';
import globalStyles from '../../globalStyles';
import Header from '../../Header/Header';
import AddItem from './AddItem';
import ItemResults from './ItemResults';

const Stack = createStackNavigator();

const Items: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <Background>
      <SafeAreaView style={globalStyles.fullWidthHeight}>
        <Header navigation={navigation} />
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
      </SafeAreaView>
    </Background>
  );
};

export default Items;
