/* eslint-disable react-native/no-inline-styles */
import {faBoxesPacking, faHandshake} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ActivitiesStatus,
  ActivityMaybe,
} from '../../../constants/ActivitiesConstants';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {getReverseActivityStatus} from '../../../utils/formatter';
import globalStyles, {primaryColor} from '../../globalStyles';
import styles from './ActivitiesStyles';
const Tab = createBottomTabNavigator();

const Activities: React.FC<{}> = ({}) => {
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
        name="Rent Activities"
        children={() => (
          <ActivitiesTab activity={activitiesState.rentActivities} />
        )}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon size={size} color={color} icon={faBoxesPacking} />
          ),
        }}
        name="Provide Activities"
        children={() => (
          <ActivitiesTab activity={activitiesState.provideActivities} />
        )}
      />
    </Tab.Navigator>
  );
};
const ActivitiesTab: React.FC<{
  activity: ActivityMaybe[];
}> = ({activity}) => {
  return (
    <View style={[styles.container]}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        {activity.map(item => {
          return <ActivityCollapsible key={item.id} activity={item} />;
        })}
      </ScrollView>
    </View>
  );
};

const ActivityCollapsible: React.FC<{
  activity: ActivityMaybe;
}> = ({activity}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [colorStyle, setColorStyle] = React.useState(styles.txtPendingColor);

  useEffect(() => {
    if (activity.status === ActivitiesStatus.PENDING) {
      setColorStyle(styles.txtPendingColor);
    } else if (activity.status === ActivitiesStatus.SUCCESS) {
      setColorStyle(styles.txtSuccessColor);
    } else if (activity.status === ActivitiesStatus.FAILED) {
      setColorStyle(styles.txtFailedColor);
    }
  }, [activity]);
  return (
    <TouchableOpacity
      style={[globalStyles.flexColumn, styles.collapsContainer]}
      key={activity.id}
      onPress={() => setIsCollapsed(!isCollapsed)}>
      <View style={[globalStyles.collapsItem]}>
        <Text style={[colorStyle, styles.title]}>Name</Text>
        <Text style={[colorStyle, styles.text]}>
          {activity?.itemName || 'No Name'}
        </Text>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Description</Text>
          <Text style={[colorStyle, styles.text]}>
            {activity?.itemDescription || 'No Description'}
          </Text>
        </View>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Duration</Text>
          <Text style={[colorStyle, styles.text]}>
            {activity?.duration + ' h' || 0}
          </Text>
        </View>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Distance</Text>
          <Text style={[colorStyle, styles.text]}>
            {activity?.distance + ' km' || 0}
          </Text>
        </View>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Total Price</Text>
          <Text style={[colorStyle, styles.text]}>
            {activity?.totalPrice + ' $' || 0}
          </Text>
        </View>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Item Price</Text>
          <Text style={[colorStyle, styles.text]}>
            {activity?.itemPrice + ' $/h' || 0}
          </Text>
        </View>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Item Real Value</Text>
          <Text style={[colorStyle, styles.text]}>
            {activity?.itemRealValue + ' $' || 0}
          </Text>
        </View>
        <View style={[globalStyles.collapsItem]}>
          <Text style={[colorStyle, styles.title]}>Status</Text>
          <Text style={[colorStyle, styles.text]}>
            {getReverseActivityStatus(activity?.status)}
          </Text>
        </View>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
      </Collapsible>
    </TouchableOpacity>
  );
};

export default Activities;
