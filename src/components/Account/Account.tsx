import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuthContext} from '../../contexts/authContext';
import Background from '../Background/Background';
import globalStyles, {
  failedColor,
  primaryColor,
  txtColor,
} from '../globalStyles';
import styles from './AccountStyles';
import Profile from './Profile/Profile';
import TopUp from './TopUp/TopUp';

const TouchableCard: React.FC<{
  title: string;
  onPress: () => void;
  color?: string;
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}> = ({title, onPress, color = txtColor, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // eslint-disable-next-line no-sparse-arrays
      style={[
        Array.isArray(style) ? [...style] : style,
        globalStyles.touchableCard,
        globalStyles.fullWidth,
      ]}>
      <Text style={[globalStyles.bold, globalStyles.subtitle, {color: color}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const MainAccountPage: React.FC<{navigation: any}> = ({navigation}) => {
  const {logout} = useAuthContext();
  return (
    <Background>
      <SafeAreaView style={[globalStyles.flex1]}>
        <View style={[globalStyles.flex1, globalStyles.pd20]}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text
                style={[
                  globalStyles.primaryColor,
                  globalStyles.bold,
                  styles.backBtn,
                ]}>
                back
              </Text>
            </TouchableOpacity>
            <Text style={[globalStyles.h4, globalStyles.bold, styles.title]}>
              Account
            </Text>
          </View>
          <TouchableCard
            style={globalStyles.mt20}
            color={primaryColor}
            title="Profile"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
          <TouchableCard
            color={primaryColor}
            title="TopUp"
            onPress={() => {
              navigation.navigate('TopUp');
            }}
          />
          <TouchableCard
            style={globalStyles.mtat}
            title="Logout"
            onPress={() => {
              logout();
            }}
            color={failedColor}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

const Stack = createStackNavigator();

const Account: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainAccountPage"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        component={MainAccountPage}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        component={Profile}
      />
      <Stack.Screen
        name="TopUp"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        component={TopUp}
      />
    </Stack.Navigator>
  );
};

export default Account;
