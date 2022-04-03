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
import Auth from './components/Auth/Auth';
import {ActivitiesProvider} from './contexts/activitiesContext';
import {SearchProvider} from './contexts/searchContext';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AuthProvider} from './contexts/authContext';
import {useApollo} from './libs/apolloClient';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const apolloClient = useApollo();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <SearchProvider>
            <ActivitiesProvider>
              <Auth />
            </ActivitiesProvider>
          </SearchProvider>
        </AuthProvider>
      </ApolloProvider>
    </SafeAreaView>
  );
};

export default App;
