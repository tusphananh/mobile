/* eslint-disable react-native/no-inline-styles */

import React, {FC, useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LogoIcon from '../../assets/icons/logo.svg';
import NextIcon from '../../assets/icons/next-btn.svg';
import {useAuthContext} from '../../contexts/authContext';
import {
  isFirstNameValid,
  isLastNameValid,
  isPasswordValid,
} from '../../utils/inputValidator';
import globalStyles from '../globalStyles';
import styles from './RegisterStyles';

interface error {
  isError: boolean;
  message: string;
}
const initialError: error = {
  isError: false,
  message: '',
};
const Register: FC<{navigation: any}> = ({navigation}) => {
  const {authState, authRegsiter} = useAuthContext();
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [error, setError] = React.useState<error>(initialError);
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const register = async () => {
    if (!isLastNameValid(lastName) || !isFirstNameValid(firstName)) {
      setError({
        isError: true,
        message: 'Name must be at least 2 character except number',
      });
    } else if (!isPasswordValid(password)) {
      setError({
        isError: true,
        message:
          'Password must be at least 8 character, 1 number, 1 uppercase and 1 lowercase',
      });
    } else if (password !== rePassword) {
      setError({
        isError: true,
        message: 'Password and re-password must be same',
      });
    } else {
      setError(initialError);
      authRegsiter(phoneNumber, firstName, lastName, password);
    }
  };

  useEffect(() => {
    if (
      !authState.isAuthenticated &&
      authState.errors &&
      authState.errors.length > 0
    ) {
      setError({
        isError: true,
        message: authState.errors![0].message,
      });
    } else if (authState.isAuthenticated) {
      setError(initialError);
      // route.push('/');
    }
  }, [authState]);

  return (
    <View style={styles.container}>
      <LogoIcon width={80} height={80} />
      <Text style={[globalStyles.title, globalStyles.bold]}>Welcome !</Text>
      <Text style={globalStyles.subtitle}>
        Sign in to start <Text style={globalStyles.bold}>RentEverything</Text>
      </Text>
      <View
        style={[
          globalStyles.divider,
          {
            width: '30%',
          },
        ]}
      />
      <View style={styles.nameContainer}>
        <TextInput
          value={firstName}
          onChangeText={text => setFirstName(text)}
          placeholder="First Name"
          placeholderTextColor="#9E9E9E"
          style={[
            globalStyles.textInput,
            {textAlign: 'center', width: '45%', margin: 0},
          ]}
        />
        <TextInput
          value={lastName}
          onChangeText={text => setLastName(text)}
          placeholder="Last Name"
          placeholderTextColor="#9E9E9E"
          style={[
            globalStyles.textInput,
            {textAlign: 'center', width: '45%', margin: 0},
          ]}
        />
      </View>
      <TextInput
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        placeholder="Phone"
        keyboardType="phone-pad"
        placeholderTextColor="#9E9E9E"
        style={[globalStyles.textInput, {textAlign: 'center'}]}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#9E9E9E"
        style={[globalStyles.textInput, {textAlign: 'center'}]}
        secureTextEntry={true}
      />
      <TextInput
        value={rePassword}
        onChangeText={text => setRePassword(text)}
        placeholder="Re-Password"
        placeholderTextColor="#9E9E9E"
        style={[globalStyles.textInput, {textAlign: 'center'}]}
        secureTextEntry={true}
      />
      {error.isError && <Text style={globalStyles.error}>{error.message}</Text>}
      <Text
        onPress={() => {
          navigation.navigate('SignIn');
        }}
        style={globalStyles.subtitle}>
        Already have an account ? <Text style={globalStyles.bold}>Sign In</Text>
      </Text>

      <TouchableOpacity
        onPress={() => {
          register();
        }}>
        <NextIcon style={{marginTop: 20}} width={116} />
      </TouchableOpacity>
    </View>
  );
};

export default Register;
