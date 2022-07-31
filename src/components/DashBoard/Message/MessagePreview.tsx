/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ActivityMaybe, ChatMaybe} from '../../../constants/ActivitiesConstants';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {formatTime} from '../../../utils/formatter';
import ChatBox from './ChatBox';
import styles from './MessageStyles';

const Stack = createStackNavigator();
const MessagePreview: React.FC<{type: string}> = ({type}) => {
  return (
    <View style={[styles.container]}>
      <Stack.Navigator>
        <Stack.Screen
          name="MessagePreviewContainer"
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          children={({navigation}) => (
            <MessagePreviewContainer navigation={navigation} type={type} />
          )}
        />
        <Stack.Screen
          name="ChatBox"
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          children={({navigation, route}) => (
            <ChatBox route={route} navigation={navigation} />
          )}
        />
      </Stack.Navigator>
    </View>
  );
};
const MessagePreviewContainer: React.FC<{
  navigation: any;
  type: string;
}> = ({type, navigation}) => {
  const {activitiesState} = useActivitiesContext();
  const [activity, setActivity] = React.useState<ActivityMaybe[]>([]);
  useEffect(() => {
    if (type === 'rent') {
      setActivity(activitiesState.rentActivities);
    } else {
      setActivity(activitiesState.provideActivities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activitiesState]);
  return (
    <ScrollView>
      {activity.map(item => {
        return (
          <MessagePreviewItem
            navigation={navigation}
            key={item.id}
            chat={item.chat}
            type={type}
          />
        );
      })}
    </ScrollView>
  );
};
const MessagePreviewItem: React.FC<{
  chat: ChatMaybe;
  navigation: any;
  type: string;
}> = ({chat, navigation, type}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ChatBox', {chat, type});
      }}
      style={styles.messagePreview}>
      <View style={styles.messagePreviewLeft}>
        <Text numberOfLines={1} style={styles.messagePreviewTitle}>
          {chat.title}
        </Text>
        <Text numberOfLines={1} style={styles.messagePreviewText}>
          {/* Get Lastest Message */}
          {chat.messages[chat.messages.length - 1]?.text}
        </Text>
      </View>
      <View style={styles.messagePreviewRight}>
        <Text style={styles.messagePreviewDate}>
          {/* Get Lastest Message Date */}
          {formatTime(chat.messages[chat.messages.length - 1]?.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessagePreview;
