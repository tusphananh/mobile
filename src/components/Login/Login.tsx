/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LogoIcon from '../../assets/icons/logo.svg';
import NextIcon from '../../assets/icons/next-btn.svg';
import {useAuthContext} from '../../contexts/authContext';
import {isPasswordValid} from '../../utils/inputValidator';
import globalStyles from '../globalStyles';
import styles from './LoginStyles';

interface error {
  isError: boolean;
  message: string;
}

const initialErrors: error = {
  isError: false,
  message: '',
};

const Login: FC<{
  navigation: any;
}> = ({navigation}) => {
  const {authState, authLogin} = useAuthContext();
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<error>(initialErrors);
  const [phoneNumber, setPhoneNumber] = React.useState('');

  useEffect(() => {
    if (authState.isAuthenticated) {
      console.log('authState.isAuthenticated');
    }
  }, [authState.isAuthenticated]);
  const login = async () => {
    if (isPasswordValid(password)) {
      if (authState.errors && authState.errors.length > 0) {
        console.log(authState.errors);
        setError({
          isError: true,
          message: authState.errors![0].message,
        });
      } else {
        setError(initialErrors);
      }

      await authLogin(phoneNumber, password);
    } else {
      setError({
        isError: true,
        message:
          'Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
      });
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      setError(initialErrors);
      /**
       * TODO: redirect to home page
       */
      // route.push('/');
    }

    if (
      !authState.isAuthenticated &&
      authState.errors &&
      authState.errors.length > 0
    ) {
      setError({
        isError: true,
        message: authState.errors![0].message,
      });
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
      {error.isError && <Text style={globalStyles.error}>{error.message}</Text>}
      <Text
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={globalStyles.subtitle}>
        Don't have an account{' '}
        <Text style={globalStyles.bold}>Register now</Text>
      </Text>

      <TouchableOpacity
        onPress={() => {
          login();
        }}>
        <NextIcon style={{marginTop: 20}} width={116} />
      </TouchableOpacity>
    </View>
  );
};

export default Login;
