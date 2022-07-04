/* eslint-disable react-native/no-inline-styles */
import {faBoxesPacking, faHandshake} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
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
import {CollapsibleCardContent} from '../../../constants/CollapsibleCard';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {useAuthContext} from '../../../contexts/authContext';
import {getReverseActivityStatus} from '../../../utils/formatter';
import Background from '../../Background/Background';
import CollapsibleCard from '../../CollapsibleCard/CollapsibleCard';
import globalStyles, {
  failedColor,
  inProgressColor,
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
  const getTxtColor = (item: ActivityMaybe) => {
    console.log(item.status);

    switch (item.status) {
      case ActivitiesStatus.PENDING:
        return pendingColor;
      case ActivitiesStatus.IN_PROGRESS:
        return inProgressColor;
      case ActivitiesStatus.SUCCESS:
        return successColor;
      case ActivitiesStatus.FAILED:
        return failedColor;
      default:
        return txtColor;
    }
  };
  return (
    <View style={[styles.container]}>
      <ScrollView style={{width: '90%'}}>
        {activity.map(item => {
          return (
            <ActivityCollapsible
              colorStyle={getTxtColor(item)}
              key={item.id}
              activity={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const ActivityCollapsible: React.FC<{
  activity: ActivityMaybe;
  colorStyle?: string;
}> = ({activity, colorStyle}) => {
  const {authState} = useAuthContext();
  const {cancel, inProgress, success} = useActivitiesContext();

  const [header, setHeader] = useState<CollapsibleCardContent[]>([]);
  const [content, setContent] = useState<CollapsibleCardContent[]>([]);

  useEffect(() => {
    setHeader([{title: 'Name', content: activity.name}]);
    setContent([
      {title: 'Description', content: activity.itemDescription},
      {title: 'Duration', content: activity.duration + ' h'},
      {title: 'Distance', content: activity.distance + ' km'},
      {title: 'Total Price', content: activity.totalPrice + '$'},
      {title: 'Price', content: activity.itemPrice + ' $/h'},
      {title: 'Item Real Value', content: activity.itemRealValue + ' $'},
      {title: 'Status', content: getReverseActivityStatus(activity.status)},
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  return (
    <CollapsibleCard color={colorStyle} header={header} content={content}>
      <View style={[globalStyles.fullWidth, globalStyles.flexRowCenter]}>
        {(activity.provider.id === authState.user!.id &&
          activity.status === ActivitiesStatus.IN_PROGRESS) ||
          (activity.status === ActivitiesStatus.PENDING && (
            <TouchableOpacity
              style={globalStyles.confirmBtn}
              onPress={() => {
                cancel(activity.id);
              }}>
              <Text style={globalStyles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
          ))}
        {(activity.status === ActivitiesStatus.PENDING ||
          activity.status === ActivitiesStatus.IN_PROGRESS) &&
          activity.provider.id === authState.user!.id && (
            <TouchableOpacity
              style={globalStyles.confirmBtn}
              onPress={() => {
                activity.status === ActivitiesStatus.PENDING &&
                  inProgress(activity.id);
                activity.status === ActivitiesStatus.IN_PROGRESS &&
                  success(activity.id);
              }}>
              <Text style={globalStyles.confirmTxt}>
                {activity.status === ActivitiesStatus.PENDING
                  ? 'In Progress'
                  : 'Success'}
              </Text>
            </TouchableOpacity>
          )}
      </View>
    </CollapsibleCard>
  );
};

export default Activities;
