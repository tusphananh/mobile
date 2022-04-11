/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import Activities from './Activities/Activities';
import {primaryColor} from '../globalStyles';
import Items from './Items/Items';
import Message from './Message/Message';
import NearBy from './NearBy/NearBy';
import Search from './Search/Search';
import styles from './DashBoardStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocationDot,
  faClockRotateLeft,
  faSatelliteDish,
  faMessage,
  faBoxesStacked,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const DashBoard: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        // Hide title
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'rgba(10, 10, 10, 0.3)',
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 20,
            borderTopWidth: 0,
            borderRadius: 20,
            paddingBottom: 15,
            paddingTop: 5,
            height: 72,
          },
          headerShown: false,
          tabBarActiveTintColor: primaryColor,
          tabBarAllowFontScaling: true,
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon size={size} color={color} icon={faLocationDot} />
            ),
          }}
          name="NearBy"
          component={NearBy}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                size={size}
                color={color}
                icon={faClockRotateLeft}
              />
            ),
          }}
          name="Activities"
          component={Activities}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                size={size}
                color={color}
                icon={faSatelliteDish}
              />
            ),
          }}
          name="Search"
          component={Search}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon size={size} color={color} icon={faMessage} />
            ),
          }}
          name="Message"
          component={Message}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                size={size}
                color={color}
                icon={faBoxesStacked}
              />
            ),
          }}
          name="Items"
          component={Items}
        />
      </Tab.Navigator>
    </View>
  );
};

export default DashBoard;
