import {faBoxesPacking, faHandshake} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {primaryColor} from '../../globalStyles';
import MessagePreview from './MessagePreview';
const Tab = createBottomTabNavigator();

const Message: React.FC<{}> = ({}) => {
  const {activitiesState} = useActivitiesContext();
  return (
    <Tab.Navigator
      // Hide title
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          height: 42,
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
            <FontAwesomeIcon size={size} color={color} icon={faBoxesPacking} />
          ),
        }}
        name="Provide Chats"
        children={() => (
          <MessagePreview activity={activitiesState.provideActivities} />
        )}
      />
    </Tab.Navigator>
  );
};

export default Message;
