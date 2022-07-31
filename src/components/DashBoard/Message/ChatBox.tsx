/* eslint-disable react-native/no-inline-styles */
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {toNumber, toString} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {useAuthContext} from '../../../contexts/authContext';
import {formatTime} from '../../../utils/formatter';
import globalStyles, {placeHolderColor, primaryColor} from '../../globalStyles';
import styles from './ChatBoxStyles';

const ChatBox: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {chat, type} = route.params;
  const [liveChat, setLiveChat] = useState(chat);
  const {activitiesState} = useActivitiesContext();
  const {authState} = useAuthContext();
  const [text, setText] = React.useState('');
  const {sendMessage} = useActivitiesContext();
  const send = () => {
    if (text !== '') {
      sendMessage(toString(uuid.v4()), toNumber(liveChat.id), text);
      setText('');
    }
  };
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [keyboardProgress] = useState(new Animated.Value(0));
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    if (type === 'rent') {
      setLiveChat(
        activitiesState.rentActivities.find(item => item.chat.id === chat.id)
          ?.chat,
      );
    } else {
      setLiveChat(
        activitiesState.provideActivities.find(item => item.chat.id === chat.id)
          ?.chat,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activitiesState]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (keyboardStatus) {
      Animated.timing(keyboardProgress, {
        toValue: keyboardHeight - 90,
        useNativeDriver: false,
        duration: 300,
      }).start();
    } else {
      Animated.timing(keyboardProgress, {
        toValue: keyboardHeight,
        useNativeDriver: false,
        duration: 300,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardStatus, keyboardHeight]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[globalStyles.primaryColor, styles.backBtn]}>
              back
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>{liveChat.title}</Text>
        </View>
        <View style={styles.chatBox}>
          <ScrollView
            ref={ref => (scrollViewRef.current = ref)}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }>
            {liveChat.messages.map(
              (message: {
                id: string;
                user: {id: string; name: string};
                createdAt: string;
                text: {} | null | undefined;
              }) => {
                if (message?.user.id === authState.user?.id) {
                  return (
                    <View
                      key={message!.id}
                      style={styles.messageContainer__owner}>
                      <Text style={styles.time}>
                        {formatTime(message?.createdAt)}
                      </Text>
                      <View style={styles.message}>
                        <Text style={globalStyles.subtitle}>
                          {message?.text}
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View key={message!.id} style={styles.messageContainer}>
                      <View style={styles.message}>
                        <Text style={globalStyles.subtitle}>
                          {message?.text}
                        </Text>
                      </View>
                      <Text style={styles.time}>
                        {formatTime(message?.createdAt)}
                      </Text>
                    </View>
                  );
                }
              },
            )}
          </ScrollView>
        </View>
        <Animated.View
          style={[
            {
              bottom: keyboardProgress,
            },
            globalStyles.fullWidthHeight,
          ]}>
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
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatBox;
