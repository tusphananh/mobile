import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Background from '../../Background/Background';
import globalStyles from '../../globalStyles';

const TopUp: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <Background>
      <SafeAreaView style={[globalStyles.fullWidthHeight]}>
        <View style={[globalStyles.flex1, globalStyles.pd20]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[globalStyles.backBtn]}>back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default TopUp;
