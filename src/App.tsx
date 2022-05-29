/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ApolloProvider} from '@apollo/client';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Auth from './components/Auth/Auth';
import Background from './components/Background/Background';
import {ActivitiesProvider} from './contexts/activitiesContext';
import {AuthProvider} from './contexts/authContext';
import {SearchProvider} from './contexts/searchContext';
import {useApollo} from './libs/apolloClient';

const App: React.FC<{props: any}> = ({props}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const apolloClient = useApollo(props);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        width: '100%',
        height: '100%',
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <SearchProvider>
            <ActivitiesProvider>
              <Background>
                <NavigationContainer theme={navTheme}>
                  <Auth />
                </NavigationContainer>
              </Background>
            </ActivitiesProvider>
          </SearchProvider>
        </AuthProvider>
      </ApolloProvider>
    </View>
  );
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
export default App;
