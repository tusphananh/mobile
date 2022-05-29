/* eslint-disable react-native/no-inline-styles */
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useAuthContext} from '../../contexts/authContext';
import globalStyles, {primaryColor} from '../globalStyles';
import styles from './HeaderStyles';

const Header: React.FC<{navigation: any}> = ({navigation}) => {
  const {authState} = useAuthContext();
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Account');
          }}>
          <SvgUri
            uri={`https://avatars.dicebear.com/api/avataaars/${
              authState.user &&
              authState.user.firstName + authState.user.lastName
            }.svg`}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text
            style={[globalStyles.subtitle, globalStyles.bold, styles.textInfo]}>
            {`${authState.user?.lastName} ${authState.user?.firstName}`}
          </Text>
          <Text
            style={[globalStyles.subtitle, globalStyles.bold, styles.textInfo]}>
            {`${authState.user?.balance.toFixed(2)} $`}
          </Text>
        </View>
      </View>
      <FontAwesomeIcon icon={faBell} size={28} color={primaryColor} />
    </View>
  );
};

export default Header;
