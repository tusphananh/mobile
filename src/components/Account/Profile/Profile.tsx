import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useAuthContext} from '../../../contexts/authContext';
import {formatDate} from '../../../utils/formatter';
import Background from '../../Background/Background';
import globalStyles from '../../globalStyles';
import styles from './ProfileStyles';

const InfoItem: React.FC<{
  titleLeft: string;
  valueLeft: string;
  titleRight: string;
  valueRight: string;
}> = ({titleLeft, valueLeft, titleRight, valueRight}) => {
  return (
    <View style={[globalStyles.flexRowSpaceBetween]}>
      <View style={[globalStyles.flex1]}>
        <Text style={[globalStyles.bold, globalStyles.h8, globalStyles.m0]}>
          {titleLeft}
        </Text>
        <Text
          style={[globalStyles.subtitle, globalStyles.m0, globalStyles.mt5]}>
          {valueLeft}
        </Text>
      </View>
      <View style={[globalStyles.flex1]}>
        <Text style={[globalStyles.bold, globalStyles.h8, globalStyles.m0]}>
          {titleRight}
        </Text>
        <Text
          style={[globalStyles.subtitle, globalStyles.m0, globalStyles.mt5]}>
          {valueRight}
        </Text>
      </View>
    </View>
  );
};
const Profile: React.FC<{navigation: any}> = ({navigation}) => {
  const {authState} = useAuthContext();
  const {user} = authState;
  const [infoItems] = React.useState([
    {
      titleLeft: 'First Name',
      valueLeft: user!.firstName,
      titleRight: 'Last Name',
      valueRight: user!.lastName,
    },
    {
      titleLeft: 'Phone',
      valueLeft: user!.phone,
      titleRight: 'Balance',
      valueRight: user!.balance + ' $',
    },
    {
      titleLeft: 'Created At',
      valueLeft: formatDate(user?.createdAt),
      titleRight: 'Updated At',
      valueRight: formatDate(user?.updatedAt),
    },
  ]);
  return (
    <Background>
      <SafeAreaView style={[globalStyles.flex1]}>
        <View style={[globalStyles.flex1]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[globalStyles.backBtn]}>back</Text>
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <SvgUri
              uri={`https://avatars.dicebear.com/api/avataaars/${
                authState.user &&
                authState.user.firstName + authState.user.lastName
              }.svg`}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            {infoItems.map(item => (
              <>
                <InfoItem
                  {...item}
                  key={(item.titleLeft + item.titleRight).toLowerCase().trim()}
                />
                <View
                  key={
                    (item.titleLeft + item.titleRight).toLowerCase().trim() +
                    '-divider'
                  }
                  style={[globalStyles.divider, globalStyles.fullWidth]}
                />
              </>
            ))}
            <TouchableOpacity
              style={[globalStyles.confirmBtn, globalStyles.fullWidth]}>
              <Text style={globalStyles.confirmTxt}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Profile;
