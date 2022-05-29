/* eslint-disable react-native/no-inline-styles */
import {faBoxesPacking, faHandshake} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivitiesStatus,
  ActivityMaybe,
} from '../../../constants/ActivitiesConstants';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {getReverseActivityStatus} from '../../../utils/formatter';
import Background from '../../Background/Background';
import CollapsibleCard from '../../CollapsibleCard/CollapsibleCard';
import globalStyles, {
  failedColor,
  pendingColor,
  primaryColor,
  successColor,
  txtColor,
} from '../../globalStyles';
import Header from '../../Header/Header';
import styles from './ActivitiesStyles';
const Tab = createBottomTabNavigator();

const Activities: React.FC<{navigation: any}> = ({navigation}) => {
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
            name="Rent Activities"
            children={() => (
              <ActivitiesTab activity={activitiesState.rentActivities} />
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
            name="Provide Activities"
            children={() => (
              <ActivitiesTab activity={activitiesState.provideActivities} />
            )}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </Background>
  );
};
const ActivitiesTab: React.FC<{
  activity: ActivityMaybe[];
}> = ({activity}) => {
  return (
    <View style={[styles.container]}>
      <ScrollView style={{width: '90%'}}>
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
  const getTxtColor = () => {
    if (activity.status === ActivitiesStatus.PENDING) {
      return pendingColor;
    } else if (activity.status === ActivitiesStatus.SUCCESS) {
      return successColor;
    } else if (activity.status === ActivitiesStatus.FAILED) {
      return failedColor;
    } else {
      return txtColor;
    }
  };
  const [colorStyle] = React.useState(getTxtColor());
  const [header] = React.useState([{title: 'Name', content: activity.name}]);
  const [content] = React.useState([
    {title: 'Description', content: activity.itemDescription},
    {title: 'Duration', content: activity.duration + ' h'},
    {title: 'Distance', content: activity.distance + ' km'},
    {title: 'Total Price', content: activity.totalPrice + '$'},
    {title: 'Price', content: activity.itemPrice + ' $/h'},
    {title: 'Item Real Value', content: activity.itemRealValue + ' $'},
    {title: 'Status', content: getReverseActivityStatus(activity.status)},
  ]);

  return (
    <CollapsibleCard color={colorStyle} header={header} content={content}>
      <TouchableOpacity style={globalStyles.confirmBtn}>
        <Text style={globalStyles.cancelTxt}>Cancel</Text>
      </TouchableOpacity>
    </CollapsibleCard>
  );
};

export default Activities;
