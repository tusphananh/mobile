import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import env from '../../config/env';

MapboxGL.setAccessToken(env.MAPBOX_TOKEN);

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const Map: React.FC<{}> = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
};

export default Map;
