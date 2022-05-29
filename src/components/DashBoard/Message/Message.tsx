import {faBoxesPacking, faHandshake} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import Background from '../../Background/Background';
import globalStyles, {primaryColor} from '../../globalStyles';
import Header from '../../Header/Header';
import MessagePreview from './MessagePreview';
const Tab = createBottomTabNavigator();

const Message: React.FC<{navigation: any}> = ({navigation}) => {
  const {activitiesState} = useActivitiesContext();
  return (
    <Background>
      <SafeAreaView style={globalStyles.fullWidthHeight}>
        <Header navigation={navigation} />
        <Tab.Navigator
          // Hide title
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 82,
              top: 10,
              borderTopWidth: 0,
            },
            headerShown: false,
            tabBarActiveTintColor: primaryColor,
            tabBarAllowFontScaling: true,
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesomeIcon size={size} color={color} icon={faHandshake} />
              ),
            }}
            name="Rent Chats"
            children={() => (
              <MessagePreview activity={activitiesState.rentActivities} />
            )}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesomeIcon
                  size={size}
                  color={color}
                  icon={faBoxesPacking}
                />
              ),
            }}
            name="Provide Chats"
            children={() => (
              <MessagePreview activity={activitiesState.provideActivities} />
            )}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </Background>
  );
};

export default Message;
