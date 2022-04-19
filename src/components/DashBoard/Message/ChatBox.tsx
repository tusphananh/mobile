/* eslint-disable react-native/no-inline-styles */
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {toNumber, toString} from 'lodash';
import React, {useRef} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {ChatMaybe} from '../../../constants/ActivitiesConstants';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {useAuthContext} from '../../../contexts/authContext';
import {formatTime} from '../../../utils/formatter';
import globalStyles, {placeHolderColor, primaryColor} from '../../globalStyles';
import styles from './ChatBoxStyles';

const ChatBox: React.FC<{navigation: any; chat: ChatMaybe}> = ({
  navigation,
  chat,
}) => {
  const {authState} = useAuthContext();
  const [text, setText] = React.useState('');
  const {sendMessage} = useActivitiesContext();
  const send = () => {
    if (text !== '') {
      sendMessage(toString(uuid.v4()), toNumber(chat.id), text);
      setText('');
    }
  };
  const scrollViewRef = useRef<ScrollView | null>(null);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[globalStyles.primaryColor, styles.backBtn]}>back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{chat.title}</Text>
      </View>
      <View style={styles.chatBox}>
        <ScrollView
          ref={ref => (scrollViewRef.current = ref)}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }>
          {chat.messages.map(message => {
            if (message?.user.id === authState.user?.id) {
              return (
                <View key={message!.id} style={styles.messageContainer__owner}>
                  <Text style={styles.time}>
                    {formatTime(message?.createdAt)}
                  </Text>
                  <View style={styles.message}>
                    <Text style={globalStyles.subtitle}>{message?.text}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={message!.id} style={styles.messageContainer}>
                  <View style={styles.message}>
                    <Text style={globalStyles.subtitle}>{message?.text}</Text>
                  </View>
                  <Text style={styles.time}>
                    {formatTime(message?.createdAt)}
                  </Text>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={[globalStyles.textInput, styles.input]}
          placeholder="Message here"
          placeholderTextColor={placeHolderColor}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            send();
          }}>
          <FontAwesomeIcon color={primaryColor} icon={faPaperPlane} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBox;
