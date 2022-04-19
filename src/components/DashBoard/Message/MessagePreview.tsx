/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ActivityMaybe, ChatMaybe} from '../../../constants/ActivitiesConstants';
import {formatTime} from '../../../utils/formatter';
import ChatBox from './ChatBox';
import styles from './MessageStyles';

const Stack = createStackNavigator();
const MessagePreview: React.FC<{activity: ActivityMaybe[]}> = ({activity}) => {
  const [chat, setChat] = React.useState<ChatMaybe>();
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
            <MessagePreviewContainer
              navigation={navigation}
              activity={activity}
              setChat={setChat}
            />
          )}
        />
        <Stack.Screen
          name="ChatBox"
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          children={({navigation}) => (
            <ChatBox navigation={navigation} chat={chat!} />
          )}
        />
      </Stack.Navigator>
    </View>
  );
};
const MessagePreviewContainer: React.FC<{
  activity: ActivityMaybe[];
  navigation: any;
  setChat: React.Dispatch<React.SetStateAction<ChatMaybe | undefined>>;
}> = ({activity, navigation, setChat}) => {
  return (
    <ScrollView>
      {activity.map(item => {
        return (
          <MessagePreviewItem
            setChat={setChat}
            navigation={navigation}
            key={item.id}
            chat={item.chat}
          />
        );
      })}
    </ScrollView>
  );
};
const MessagePreviewItem: React.FC<{
  chat: ChatMaybe;
  navigation: any;
  setChat: React.Dispatch<React.SetStateAction<ChatMaybe | undefined>>;
}> = ({chat, navigation, setChat}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setChat(chat);
        navigation.push('ChatBox');
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
