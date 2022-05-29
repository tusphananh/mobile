import {createStackNavigator} from '@react-navigation/stack';
import React, {Fragment} from 'react';
import {useAuthContext} from '../../contexts/authContext';
import Account from '../Account/Account';
import DashBoard from '../DashBoard/DashBoard';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Stack = createStackNavigator();

const Auth: React.FC<{}> = () => {
  const {authState} = useAuthContext();

  return (
    <Stack.Navigator>
      {!authState.isAuthenticated ? (
        // No token found, user isn't signed in
        <Fragment>
          <Stack.Screen
            name="SignIn"
            component={Login}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
            }}
          />
        </Fragment>
      ) : (
        // User is signed in
        <Fragment>
          <Stack.Screen
            name="DashBoard"
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
            }}
            component={DashBoard}
          />
          <Stack.Screen
            name="Account"
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
            }}
            component={Account}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
};

export default Auth;
