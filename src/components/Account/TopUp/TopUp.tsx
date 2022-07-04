import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../../contexts/authContext';
import {checkFloat} from '../../../utils/check';
import Background from '../../Background/Background';
import globalStyles, {txtColor} from '../../globalStyles';
import styles from './TopUpStyles';

const TopUp: React.FC<{navigation: any}> = ({navigation}) => {
  const [ammount, setAmmount] = React.useState('');
  const [error, setError] = React.useState<string>('');
  const {topUp} = useContext(AuthContext);
  const add = () => {
    if (checkFloat(ammount)) {
      setError('');
      topUp(parseFloat(ammount));
      navigation.goBack();
    } else {
      setError('Please enter a valid number');
    }
  };
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
          <View style={styles.inputContainer}>
            <Text style={[globalStyles.h4, globalStyles.bold]}>Top Up Now</Text>
            <TextInput
              style={[globalStyles.textInput, globalStyles.fullWidth]}
              placeholder="Ammount"
              placeholderTextColor={txtColor}
              onChangeText={text => setAmmount(text)}
              value={ammount}
            />
            {error != '' && <Text style={globalStyles.error}>{error}</Text>}
            <TouchableOpacity style={globalStyles.confirmBtn} onPress={add}>
              <Text style={[globalStyles.primaryColor, globalStyles.bold]}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default TopUp;
